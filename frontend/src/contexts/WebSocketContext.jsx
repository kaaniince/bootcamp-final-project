import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      const ws = new WebSocket("ws://localhost:3000");

      ws.onopen = () => {
        console.log("Connected to WebSocket");
      };

      ws.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        setNotifications((prev) => [...prev, notification]);
      };

      ws.onclose = () => {
        console.log("Disconnected from WebSocket");
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [isAuthenticated]);

  return (
    <WebSocketContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
