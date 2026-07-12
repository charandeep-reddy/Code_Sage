import { useContext } from "react";
import { SidebarContext } from "../context/sidebarContextValue";

export function useSidebar() {
  return useContext(SidebarContext);
}
