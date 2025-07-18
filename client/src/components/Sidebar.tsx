import { useEffect, useRef, useState } from "react";
import type { ReactNode, FC } from "react";
import type { IconType } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  children?: ReactNode;
}

const SidebarItem: FC<SidebarItemProps> = ({ icon: Icon, label, children }) => {
  const [hovered, setHovered] = useState(false);
  const [clickOpen, setClickOpen] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  const isOpen = clickOpen || hovered;

  useEffect(() => {
    if (!clickOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        itemRef.current && !itemRef.current.contains(event.target as Node)
      ) { 
          setClickOpen(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }; 
  }, [clickOpen]);

  return (
    <li
    ref={itemRef}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      
    >
      <div 
      className="custom-li-hover flex items-center justify-between w-full px-2 py-2 text-left cursor-pointer"
      onClick={() => setClickOpen((prev) => !prev)}>
        <span className="flex items-center">
          <Icon className="inline-block mr-2" />
          {label}
        </span>
        {children && <FiChevronRight className="ml-auto" />}
      </div>

      {isOpen && children && (
        <ul className="absolute left-full top-0 w-full bg-white shadow-lg border border-gray-200 z-10">
          {children}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
