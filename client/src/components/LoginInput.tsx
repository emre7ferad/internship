import type { IconType } from "react-icons";

interface InputProps {
    label: string;
    name: string;
    type: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    icon?: IconType;
}

const Input = ({
    label,
    name,
    type,
    required = false,
    value,
    onChange,
    error,
    icon: Icon,
}: InputProps ) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-md font-medium text-gray-700 mb-1">
                {required && <span className="text-red-500">*</span>} {label}
            </label>
            <div className="w-full relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Icon />
                    </div>
                )}
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`${Icon ? 'pl-10' : ''} w-full border border-gray-300 p-2 pr-8 focus:outline-none focus:ring-1 ${error ? 'border-red-500' : 'border-gray-300 focus:ring-blue-800'}`}
                />
            </div>
            <span className="block text-sm mt-1 min-h-5 text-red-500">
                {error || "\u00A0"}
            </span>
        </div>
    );
};

export default Input;