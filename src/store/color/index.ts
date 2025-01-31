import { create } from "zustand";

type ColorStore = {
  colors: Record<string, string>;
  setColors: (key: string, color: string) => void;
};

export const useColorStore = create<ColorStore>()((set) => ({
  colors: {},
  setColors: (key, color) =>
    set((state) => ({
      colors: { ...state.colors, [key]: color },
    })),
}));
