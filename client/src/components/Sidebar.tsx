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
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const itemRef = useRef<HTMLLIElement>(null);

  const isOpen = clickOpen || hovered;

  useEffect(() => {
    const handleSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleSize)
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  useEffect(() => {
    if (!clickOpen || isLargeScreen) return;

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
  }, [clickOpen, isLargeScreen]);

  return (
    <li
    ref={itemRef}
      className="relative"
      onMouseEnter={() => {
        if (isLargeScreen) setHovered(true);
      }}
      onMouseLeave={() => {
        if (isLargeScreen) setHovered(false)
      }}
      
    >
      <div 
      className="custom-li-hover flex items-center justify-between w-full px-2 py-2 text-left cursor-pointer"
      onClick={() => {
        if (!isLargeScreen && children) {
          setClickOpen((prev) => !prev)
        }
      }}>
        <span className="flex ml-5 lg:ml-0 items-center justify-center lg:justify-start w-full">
          <Icon className="inline-block mr-2" />
          {label}
        </span>
        {children && <FiChevronRight className="ml-auto" />}
      </div>

      {isOpen && children && (
        <ul className="bg-white z-10 border border-gray-200 lg:absolute lg:left-full lg:top-0 w-full">
          {children}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
