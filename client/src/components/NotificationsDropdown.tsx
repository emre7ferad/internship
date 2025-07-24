import { useEffect, useRef, useState } from "react";

interface DropdownProps {
    label: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    unreadCount?: number;
}

const NotificationsDropdown: React.FC<DropdownProps> = ({ label, icon, children, unreadCount = 0 }) => {
    const [clickOpen, setClickOpen] = useState(false);
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

    const displayCount = unreadCount > 9 ? '9+' : unreadCount;

    return (
        <li ref={itemRef} className="relative list-none">
            <div className="relative flex items-center space-x-1 cursor-pointer hover:text-blue-800" onClick={() => setClickOpen((prev) => !prev)}>
                <div className="relative">
                    {icon && <span className="text-lg">{icon}</span>}
                    {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {displayCount}
                        </span>
                    )}
                </div>
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

export default NotificationsDropdown;