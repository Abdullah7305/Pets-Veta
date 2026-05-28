import { memo } from 'react';
import { Stethoscope } from 'lucide-react';

const DoctorNotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-[350px] px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50">
                    <Stethoscope
                        size={32}
                        className="text-[#06777D]"
                    />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-gray-800">
                    No Doctors Found
                </h2>

                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    We couldn’t find any doctors matching your search or filter.
                    Try changing the filter or search term.
                </p>

            </div>
        </div>
    );
};

export default memo(DoctorNotFound);