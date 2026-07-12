import { useState } from "react";
import { SidebarContext } from "./sidebarContextValue";

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        open,
        toggleSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
