import { createContext } from "react";
import { useSidebar } from "../hooks/useSidebar";

export const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const { isOpen, setIsOpen, handleClose } = useSidebar();

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;
