import { create } from "zustand";

interface TimeStore {
  timePickersByCategory: { [key: string]: number[] }; // 카테고리별 타임피커 ID 배열
  addTimePicker: (category: string) => void;
  removeTimePicker: (category: string, id: number) => void;
}

export const useTimeStore = create<TimeStore>((set) => ({
  timePickersByCategory: {},

  // ✅ 특정 카테고리의 타임피커 추가
  addTimePicker: (category) =>
    set((state) => ({
      timePickersByCategory: {
        ...state.timePickersByCategory,
        [category]: [
          ...(state.timePickersByCategory[category] || []),
          Date.now(),
        ],
      },
    })),

  // ✅ 특정 카테고리의 타임피커 삭제
  removeTimePicker: (category, id) =>
    set((state) => ({
      timePickersByCategory: {
        ...state.timePickersByCategory,
        [category]: state.timePickersByCategory[category].filter(
          (pickerId) => pickerId !== id,
        ),
      },
    })),
}));
