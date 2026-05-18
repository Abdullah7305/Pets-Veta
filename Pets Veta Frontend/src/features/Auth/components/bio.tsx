type BioFieldProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const BioField = ({
    label = "Professional Bio",
    placeholder = "Tell pet owners about your experience, specialization, and care approach...",
    value,
    error,
    onChange,
}: BioFieldProps) => {
    
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={5}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none resize-none focus:border-blue-500"
            />

            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
};

export default BioField;