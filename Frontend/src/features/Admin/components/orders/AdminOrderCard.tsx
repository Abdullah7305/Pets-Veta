import { Calendar, MapPin, Phone, User, Store, Tag } from "lucide-react";
import type { AdminOrder } from "../../apis/adminOrder.api";

interface AdminOrderCardProps {
    order: AdminOrder;
}

const statusStyles = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-250",
    CONFIRMED: "bg-green-50 text-green-700 border-green-250",
    SHIPPED: "bg-blue-50 text-blue-700 border-blue-250",
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-250",
    CANCELLED: "bg-red-50 text-red-700 border-red-250",
};

const AdminOrderCard = ({ order }: AdminOrderCardProps) => {
    const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <div className="h-1.5 bg-[#078b91]" />

            <div className="p-5 sm:p-6">
                {/* Header Row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Order ID</span>
                        <h3 className="text-lg font-black text-slate-800 mt-0.5">{order.orderNumber}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                            <Calendar size={14} />
                            <span>{formattedDate}</span>
                        </div>
                    </div>

                    <span className={`inline-flex items-center rounded-xl border px-3 py-1.5 text-xs font-black uppercase tracking-wider ${statusStyles[order.status] || "bg-slate-50 text-slate-700 border-slate-200"}`}>
                        {order.status}
                    </span>
                </div>

                {/* Customer and Seller Information */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {/* Buyer Information */}
                    <div className="rounded-xl bg-slate-50 p-4 border border-slate-100/50">
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            <User size={14} className="text-[#078b91]" />
                            Buyer Details
                        </span>
                        <h4 className="text-sm font-black text-slate-800">{order.buyer?.fullName || "Guest Customer"}</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1">{order.buyer?.email}</p>
                        {order.phoneNumber && (
                            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-2">
                                <Phone size={12} className="text-slate-400" />
                                {order.phoneNumber}
                            </p>
                        )}
                    </div>

                    {/* Shipping Address and Store Info */}
                    <div className="rounded-xl bg-slate-50 p-4 border border-slate-100/50">
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            <Store size={14} className="text-[#078b91]" />
                            Seller & Shipping
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
                            <span>Store:</span>
                            <span className="text-[#078b91]">{order.seller?.businessName || "Registered Seller"}</span>
                        </div>
                        <p className="flex items-start gap-1.5 text-xs font-semibold text-slate-600 mt-2">
                            <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{order.shippingAddress || "No address configured"}</span>
                        </p>
                    </div>
                </div>

                {/* Order Items Table/List */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">Order Items</span>
                    <div className="space-y-3.5">
                        {order.items?.map((item) => {
                            const productImage = item.product?.images?.[0]?.publicUrl ||
                                "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=150&q=80";
                            return (
                                <div key={item.id} className="flex items-center justify-between gap-4 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <img
                                            src={productImage}
                                            alt={item.product?.title}
                                            className="h-12 w-12 rounded-lg object-cover border border-slate-200 shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-bold text-slate-800 truncate">{item.product?.title}</h4>
                                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mt-0.5">
                                                <span>Qty: {item.quantity}</span>
                                                <span>•</span>
                                                <span>PKR {Number(item.price).toLocaleString()} each</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm font-extrabold text-slate-800 shrink-0">
                                        PKR {(Number(item.price) * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Cost Details */}
                <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm font-black text-slate-700">
                        <Tag size={16} className="text-[#078b91]" />
                        Grand Total
                    </span>
                    <span className="text-lg font-black text-[#078b91]">
                        PKR {Number(order.totalAmount).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderCard;