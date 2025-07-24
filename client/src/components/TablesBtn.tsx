type TablesBtnProps ={
    icon: React.ReactNode;
    ariaLabel?: string;
}
const TablesBtn: React.FC<TablesBtnProps> = ({ icon, ariaLabel }) => (
    <div className="relative group">
        <button 
            className="flex justify-center items-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100 cursor-pointer"
            type="button"
            aria-label={ariaLabel}
        >
            {icon}
        </button>

        {ariaLabel && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-white text-black font-semibold border border-gray-300 text-md px-2 py-1 whitespace-nowrap z-10">
                {ariaLabel}
            </div>
        )}
    </div>
    
);

export default TablesBtn;