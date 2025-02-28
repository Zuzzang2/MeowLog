import { create } from "zustand";

interface UnitStore {
  unitOptions: string[];
  unitByCategory: { [category: string]: string };
  setUnitForCategory: (category: string, unit: string) => void;
}

export const useUnitStore = create<UnitStore>((set) => ({
  unitOptions: ["선택", "mg", "g", "kg", "ml", "l", "oz"],

  unitByCategory: {}, // 선택된 단위 저장 (초기값 없음)

  setUnitForCategory: (category, unit) =>
    set((state) => ({
      unitByCategory: { ...state.unitByCategory, [category]: unit },
    })),
}));
