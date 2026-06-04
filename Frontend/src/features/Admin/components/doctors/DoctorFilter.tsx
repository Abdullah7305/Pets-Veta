import { memo, type SetStateAction } from 'react';


const DoctorFilter = ({ doctorStatus, setDoctorStatus }: { doctorStatus: string, setDoctorStatus: React.Dispatch<SetStateAction<string>> }) => {

    // const [status, setStatus] = useState<string>(doctorStatus)
    console.log("Status is ", doctorStatus);
    const setStatusAll = (doctorStatus: string) => {
        if (doctorStatus === 'all') {
            return;
        }
        setDoctorStatus('all');
    }

    const setStatusApproved = (doctorStatus: string) => {
        if (doctorStatus === 'approved') {
            return;
        }
        setDoctorStatus('approved');
    }

    const setStatusPending = (doctorStatus: string) => {
        if (doctorStatus === 'pending') {
            return;
        }
        setDoctorStatus('pending');
    }

    return (
        <div className='mt-3 grid grid-cols-1 gap-2 p-2 sm:grid-cols-3'>

            <button
                onClick={()=>setStatusAll(doctorStatus)}
                className={`
                    w-full font-medium rounded-md p-2 border 
                    border-[#06777D] transition-all duration-300
                    ${doctorStatus === 'all'
                        ? 'bg-[#06777D] text-white'
                        : 'hover:bg-[#06777D] hover:text-white'
                    }
                `}
            >
                All
            </button>
            <button
                 onClick={()=>setStatusApproved(doctorStatus)}
                className={`
                    w-full font-medium rounded-md p-2 border 
                    border-[#06777D] transition-all duration-300
                    ${doctorStatus === 'approved'
                        ? 'bg-[#06777D] text-white'
                        : 'hover:bg-[#06777D] hover:text-white'
                    }
                `}
            >
                Approved
            </button>

            <button
                 onClick={()=>setStatusPending(doctorStatus)}
                className={`
                    w-full font-medium rounded-md p-2 border 
                    border-red-600 transition-all duration-300
                    ${doctorStatus === 'pending'
                        ? 'bg-orange-700 text-white'
                        : 'text-red-500 hover:bg-orange-700 hover:text-white'
                    }
                `}
            >
                Pending
            </button>

        </div>
    );
};

export default memo(DoctorFilter);
