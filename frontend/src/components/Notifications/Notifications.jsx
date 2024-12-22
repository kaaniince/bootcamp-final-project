import { useContext } from "react";
import { WebSocketContext } from "../../contexts/WebSocketContext";

const Notifications = () => {
  const { notifications } = useContext(WebSocketContext);

  return (
    <div className="fixed top-20 right-4 z-50">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-4 mb-2 border-l-4 border-primary animate-slide-in"
        >
          <p className="text-gray-800">{notification.message}</p>
          <span className="text-xs text-gray-500">
            {new Date(notification.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
