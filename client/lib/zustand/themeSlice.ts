import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  setIsDark: () => void;
}

export const useThemeStore = create<ThemeState>((set, state) => ({
  isDark: false,
  setIsDark: () => set((state) => ({ isDark: !state.isDark })),
}));
