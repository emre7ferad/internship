import React from 'react';

interface TextAreaProps {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  required = false,
  value,
  onChange,
  error,
  rows = 3,
  className = '',
  placeholder = '',
  disabled = false,
}) => {
  return (
    <div className="flex items-center mb-4">
      {label && (
        <label className="w-1/3 relative text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
          {required && <span className="absolute -left-3 text-red-500">*</span>}
          {label}
        </label>
      )}
      
      <div className={label ? 'w-2/3' : 'w-full'}>
        <textarea
          id={name}
          name={name}
          required={required}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${
            error ? 'border-red-500' : ''
          } ${className}`}
          value={value}
          onChange={onChange}
        />
        {error && (
          <span className="text-sm mt-1 text-red-500">{error}</span>
        )}
      </div>
    </div>
  );
};

export default TextArea;