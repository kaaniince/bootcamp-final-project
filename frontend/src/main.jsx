import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProductProvider from "./contexts/ProductContext.jsx";
import SidebarProvider from "./contexts/SidebarContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import WebSocketProvider from "./contexts/WebSocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
        <AuthProvider>
          <WebSocketProvider>
            <App />
          </WebSocketProvider>
        </AuthProvider>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>
);
