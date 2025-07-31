import React from "react";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  tooltip?: (string | React.ReactNode)[];
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  error,
  tooltip,
}) => {
  return (
    <div className="flex items-center mb-4 relative">
      <label htmlFor={name} className="w-1/3 relative text-sm font-medium text-gray-700">
        {required && <span className="absolute -left-3 text-red-500">*</span>}
        {label}
      </label>

      <div className="w-2/3 relative">
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={`w-full border border-gray-300 rounded-md p-2 pr-8 focus:outline-none focus:ring-1 ${
            error ? "border-red-500" : "focus:ring-blue-400"
          }`}
          value={value}
          onChange={onChange}
        />
        {error && <span className="text-sm mt-1 text-red-500">{error}</span>}
        {tooltip && (
          <div className="absolute top-2 right-2 group">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold cursor-default">
              ?
            </span>
            <div className="absolute z-10 hidden group-hover:block bg-gray-100 border border-gray-300 text-xs text-gray-700 p-2 rounded shadow-md w-64 right-0 top-6">
              <ul className="list-disc list-inside space-y-1">
                {tooltip.map((item, index) => (
                  <li key={index} className={index === 0 ? "list-none mb-1" : ""}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;