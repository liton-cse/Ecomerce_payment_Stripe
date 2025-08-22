// store/sidebarSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SidebarState = {
  sidebarOpen: boolean;
  activeTab: "home" | "special";
};

const initialState: SidebarState = {
  sidebarOpen: false,
  activeTab: "home",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setActiveTab(state, action: PayloadAction<"home" | "special">) {
      state.activeTab = action.payload;
      state.sidebarOpen = false; // close sidebar on mobile when tab changes
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setActiveTab } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
