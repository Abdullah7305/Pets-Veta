import { getUserPets } from "../apis/doctorProfile.api";
import { useEffect, useState } from "react";
import { X, Loader2, AlertCircle, PawPrint } from "lucide-react";
import PetCard from "./PerCard";

// Adjust this interface to match your exact backend response properties if needed
interface PetListItem {
    id: string;
    name: string;
    photoUrl?: string;
}

interface PetListingModalProps {
    onClose: () => void;
    onSelect: (name: string, photoUrl: string | undefined, id: string) => void;
}

const PetListingModal = ({ onClose, onSelect }: PetListingModalProps) => {
    const [pets, setPets] = useState<PetListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserPets = async () => {

            setLoading(true);
            setError(null);
            const response = await getUserPets();
            console.log("Response is ", response)
            await new Promise((resolve) => setTimeout(resolve, 800));
            const mockPetsData: PetListItem[] = [
                { id: "1", name: "Buddy", photoUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150" },
                { id: "2", name: "Luna", photoUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150" },
                { id: "3", name: "Max" }, // Missing profile picture fallback test
            ];
            if (response) {
                setLoading(false);
                setPets(response);
            }

        };

        fetchUserPets();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            {/* Backdrop overlay listener to close out of modal safely */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Main Frame */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl shadow-purple-950/20 text-[#1F1F2E] z-10 animate-scale-up">

                {/* Header Block */}
                <div className="relative border-b border-purple-50 bg-gradient-to-r from-[#F4ECFF] to-white px-6 py-5 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black tracking-tight text-[#4c249f]">
                            Your Pets
                        </h3>
                        <p className="text-xs font-semibold text-[#8B64D7] mt-0.5">
                            Choose the profile for this appointment
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-400 hover:bg-purple-50 hover:text-slate-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Dynamic Inner Body Container */}
                <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3 custom-scrollbar">

                    {/* Loading View State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12 text-[#6D3DD9]">
                            <Loader2 size={36} className="animate-spin opacity-80" />
                            <p className="mt-3 text-sm font-semibold text-slate-500">Loading your pets...</p>
                        </div>
                    )}

                    {/* Error View State */}
                    {error && !loading && (
                        <div className="flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-2xl text-red-700">
                            <AlertCircle size={20} className="shrink-0" />
                            <p className="text-sm font-semibold">{error}</p>
                        </div>
                    )}

                    {/* Empty View State */}
                    {!loading && !error && pets.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 mb-3">
                                <PawPrint size={26} />
                            </div>
                            <p className="text-sm font-black text-slate-700">No pets registered yet</p>
                            <p className="text-xs font-medium text-slate-400 mt-1 max-w-[240px]">
                                Please configure a pet within your dashboard workspace profile first.
                            </p>
                        </div>
                    )}

                    {/* Render Active List Items Grid */}
                    {!loading && !error && pets.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {pets.map((pet) => (
                                <PetCard
                                    key={pet.id}
                                    id={pet.id}
                                    name={pet.name}
                                    photoUrl={pet.photoUrl}
                                    onSelect={onSelect}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PetListingModal;