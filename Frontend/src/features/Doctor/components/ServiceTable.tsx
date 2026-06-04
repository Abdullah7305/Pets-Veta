import { useState, useEffect } from "react";
import { Edit2, Trash2, ShieldAlert, Activity } from "lucide-react";
import { getDoctorServices } from "../api/doctorServices";
import { type ItemType } from "./DoctorSkill";
import DeleteModal from "./DeleteModal";
type Data = {
    id: string,
    userId: string,
    price: string,
    skill: string
}

const DoctorServicesTable = ({ onEdit, onDelete }: {
    onEdit: (item: ItemType) => void | Promise<void>,
    onDelete: (itemId: string) => Promise<void>,

}) => {
    const [services, setServices] = useState<Data[] | undefined>(undefined)
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState('');
    const [isDeleteModal, setDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState<{ id: string; skill: string; price: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const openDeleteModal = (item: Data) => {
        setDeleteItem(item);
        setDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
        setDeleteItem(null);
    }

    const handleConfirmDelete = async (itemId: string) => {
        setIsDeleting(true);
        try {
            await onDelete(itemId);
            closeDeleteModal();
            // Refresh services list after delete
            const response = await getDoctorServices();
            if (response?.success && Array.isArray(response.data)) {
                setServices(response.data);
            }
        } catch (err) {
            console.error("Delete Error:", err);
        } finally {
            setIsDeleting(false);
        }
    }


    useEffect(() => {
        const loadServices = async () => {
            setLoading(true);
            try {
                const response = await getDoctorServices();
                console.log("Initial database payload:", response?.data);

                if (response?.success && Array.isArray(response.data)) {
                    setServices(response.data);
                    setFetchError('');
                } else {
                    setFetchError(response?.message || "Failed to parse service records.");
                }
            } catch (err) {
                setFetchError("Internal network connection error.");
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    if (loading) {
        return (
            <div className="w-full p-8 text-center text-sm text-slate-500 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div className="animate-pulse flex flex-col items-center gap-2">
                    <div className="h-4 w-4 bg-emerald-500 rounded-full animate-ping" />
                    <span>Loading your medical catalog updates...</span>
                </div>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="w-full p-5 text-center text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 justify-center">
                <ShieldAlert className="w-4 h-4" />
                <span>Error: {fetchError}</span>
            </div>
        );
    }

    return (
        <div className="w-full bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">

            {/* Header Meta Info */}
            <div className="bg-emerald-50/50 px-6 py-4 border-b border-emerald-100/60 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <h3 className="text-emerald-900 font-semibold text-base">
                    Offered Services & Custom Pricing
                </h3>
                <span className="ml-auto bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {services?.length} Total
                </span>
            </div>

            {/* Table Core Layout */}
            <div className="overflow-x-auto">
                {services?.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                        No active clinical services found. Choose a skill above to start.
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-medium">
                                <th className="p-4 pl-6">Service</th>
                                <th className="p-4">Price (PKR)</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            {services?.map((item) => (
                                <tr key={item.id} className="hover:bg-emerald-50/20 transition-colors">
                                    {/* Service Name Column */}
                                    <td className="p-4 pl-6 font-medium text-slate-800" >
                                        {item.skill}
                                    </td>

                                    {/* Price Tag Column */}
                                    <td className="p-4 text-emerald-700 font-semibold">
                                        Rs. {Number(item.price).toLocaleString()}
                                    </td>

                                    {/* Edit and Delete Buttons Column */}
                                    <td className="p-4 pr-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-all"
                                                title="Edit Service Price"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(item)}
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                                                title="Delete Service Option"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Delete Modal */}
            {deleteItem && (
                <DeleteModal
                    isOpen={isDeleteModal}
                    serviceName={deleteItem.skill}
                    price={deleteItem.price}
                    itemId={deleteItem.id}
                    onCancel={closeDeleteModal}
                    onConfirmDelete={handleConfirmDelete}
                    isLoading={isDeleting}
                />
            )}
        </div>
    );
};

export default DoctorServicesTable;
