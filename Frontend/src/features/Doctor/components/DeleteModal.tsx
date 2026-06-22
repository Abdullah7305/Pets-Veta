import { AlertTriangle } from "lucide-react";
import type { DeleteModalProps } from "../doctor.types";

const DeleteModal = ({
    isOpen,
    serviceName,
    price,
    itemId,
    onCancel,
    onConfirmDelete,
    isLoading = false
}: DeleteModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-red-50 rounded-full">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900">Delete Service</h2>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <p className="text-slate-600 text-sm mb-4">
                        Are you sure you want to delete this service? This action cannot be undone.
                    </p>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Service</p>
                                <p className="font-medium text-slate-900">{serviceName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 mb-1">Price</p>
                                <p className="font-semibold text-red-600">Rs. {Number(price).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirmDelete(itemId)}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
