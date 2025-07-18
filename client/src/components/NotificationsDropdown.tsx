import { useEffect, useRef, useState } from "react";

interface DropdownProps {
    label: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const NotificationsDropdown: React.FC<DropdownProps> = ({ label, icon, children}) => {
    const [ clickOpen, setClickOpen ] = useState(false);
    const itemRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (!clickOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
                setClickOpen(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [clickOpen]);

    return(
        <li
        ref={itemRef}
        className="relative list-none">
            <div className="relative flex items-center space-x-1 cursor-pointer hover:text-blue-800"
            onClick={() => setClickOpen((prev) => !prev)}>
                {icon && <span className="text-lg">{icon}</span>}
                <span>{label}</span>
            </div>

            {clickOpen && children && (
                <ul className="absolute top-full left-1/2 -translate-x-1/2 w-110 bg-white border border-gray-200 shadow-lg rounded-md text-gray-700 z-50">
                    {children}
                </ul>
            )}
        </li>
    );
};

export default NotificationsDropdown