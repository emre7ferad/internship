import { IoIosPaper } from "react-icons/io";
import { FaCheck, FaTrash } from "react-icons/fa";

interface NotificationsListProps {
  notifications: any[]; // Using 'any' to avoid defining the Notification interface twice
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications, onMarkAsRead, onDelete }) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  const latestNotifications = notifications.slice(0, 5);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex text-left p-2 text-md font-semibold">
        <h1>Имате <span className="text-blue-800">{unreadCount} нови</span> известия</h1>
      </div>
      <div className="bg-white">
        {latestNotifications.length > 0 ? (
          latestNotifications.map((notification) => {
            const isRead = notification.read;
            return (
              <li key={notification._id} className={`flex items-center justify-between p-2 border m-2 space-x-2 ${isRead ? 'bg-white' : 'bg-gray-100'}`}>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center justify-center rounded-full w-8 h-8 ${isRead ? 'bg-gray-400' : 'bg-blue-800'}`}>
                    <IoIosPaper className={`w-5 h-5 ${isRead ? 'text-gray-100' : 'text-white'}`} />
                  </span>
                  <div className={`${isRead ? 'text-gray-500' : 'text-black'}`}>
                    <h2 className="font-semibold">{notification.title}</h2>
                    <p>{notification.content}</p>
                  </div>
                </div>
                <div className="flex space-x-2 pr-2">
                  {!isRead && (
                    <button 
                      onClick={() => onMarkAsRead(notification._id)}
                      onMouseDown={handleMouseDown}
                      title="Mark as read" 
                      className="text-gray-400 hover:text-green-500 cursor-pointer"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button 
                    onClick={() => onDelete(notification._id)}
                    onMouseDown={handleMouseDown}
                    title="Delete" 
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <li className=" p-4 text-center">Нямате нови известия.</li>
        )}
      </div>
      <a href="#" className="flex text-left p-1 m-2 text-md text-blue-800">Вижте всички известия &gt;</a>
    </>
  );
};

export default NotificationsList;