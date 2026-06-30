import { useEffect, useState } from "react";
import { Loader2, AlertCircle, ShoppingBag, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getAdminOrders, type AdminOrder } from "../apis/adminOrder.api";
import AdminOrderCard from "../components/orders/AdminOrderCard";
import { PaginationButton } from "../components/PaginationButton";

type TabType = "ALL" | "PENDING" | "CONFIRMED" | "SHIPPED" | "COMPLETED" | "CANCELLED";

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<TabType>("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const limit = 6;

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAdminOrders(page, limit, activeTab);
            if (response.success) {
                setOrders(response.data.orders);
                setTotalCount(response.data.totalCount);
            } else {
                setError(response.message || "Failed to retrieve order records.");
            }
        } catch (err: any) {
            setError("Failed to communicate with the server. Please try again.");
            console.error("Fetch orders error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, [page, activeTab]);

    // Client-side search optimization
    const filteredOrders = orders.filter((order) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesId = order.orderNumber.toLowerCase().includes(searchLower);
        const matchesBuyer = order.buyer?.fullName?.toLowerCase().includes(searchLower);
        const matchesSeller = order.seller?.businessName?.toLowerCase().includes(searchLower);
        return matchesId || matchesBuyer || matchesSeller;
    });

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <main className="min-h-screen bg-[#f8fbfb] text-[#12213a] p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dff5f3] text-[#078b91]">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 sm:text-3xl">Marketplace Orders</h1>
                        <p className="text-sm text-slate-500 mt-1">Review and coordinate marketplace transactions and deliveries.</p>
                    </div>
                </div>
            </div>

            {/* Filters bar */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Search */}
                    <label className="relative block w-full lg:max-w-md">
                        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by Order ID, Buyer, or Seller..."
                            className="h-11 w-full rounded-xl border border-slate-200 bg-[#f8fbfb] pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#078b91] focus:bg-white focus:ring-4 focus:ring-[#078b91]/10"
                        />
                    </label>

                    {/* Status filter tabs */}
                    <div className="flex flex-wrap gap-1.5">
                        {(["ALL", "PENDING", "CONFIRMED", "SHIPPED", "COMPLETED", "CANCELLED"] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setPage(1);
                                }}
                                className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition ${activeTab === tab
                                        ? "bg-[#078b91] text-white shadow-sm"
                                        : "bg-[#f8fbfb] text-slate-500 border border-slate-200/60 hover:bg-slate-50"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* List and View States */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <Loader2 className="h-10 w-10 animate-spin text-[#078b91]" />
                    <p className="mt-4 text-sm font-semibold text-slate-500">Loading marketplace orders...</p>
                </div>
            ) : error ? (
                <div className="rounded-2xl border border-red-150 bg-red-50 p-5 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-black text-red-800 text-sm">System Error</h4>
                        <p className="text-xs text-red-600 mt-1 font-semibold">{error}</p>
                    </div>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
                    <ShoppingBag className="h-14 w-14 text-slate-300 mb-3" />
                    <h3 className="text-lg font-black text-slate-800">No Orders Found</h3>
                    <p className="text-sm text-slate-400 mt-1">There are no orders listed matching this criteria.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        {filteredOrders.map((order) => (
                            <AdminOrderCard key={order.id} order={order} />
                        ))}
                    </div>

                    {/* Pagination component */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <PaginationButton
                                ariaLabel="Previous page"
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                            >
                                <ChevronLeft size={18} />
                            </PaginationButton>

                            <span className="rounded-xl bg-[#dff5f3] px-4 py-2 text-sm font-black text-[#078b91]">
                                Page {page} of {totalPages}
                            </span>

                            <PaginationButton
                                ariaLabel="Next page"
                                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                disabled={page === totalPages}
                            >
                                <ChevronRight size={18} />
                            </PaginationButton>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
};

export default AdminOrdersPage;