import { useState } from "react";

interface DropdownProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownProps> = ({ label, icon, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex items-center space-x-1 cursor-pointer hover:text-blue-800">
        {icon && <span className="text-lg">{icon}</span>}
        <span>{label}</span>
      </div>

      {hovered && (
        <ul className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-lg rounded-md text-sm text-gray-700 z-50">
          {children}
        </ul>
      )}
    </div>
  );
};

export default DropdownItem;
