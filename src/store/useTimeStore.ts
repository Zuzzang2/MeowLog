import { create } from "zustand";

interface TimeEntry {
  id: number;
  meridian: "AM" | "PM";
  hour: string;
  minute: string;
  inputText: string;
  unit: string;
}

interface TimeStore {
  timePickersByCategory: { [key: string]: TimeEntry[] }; // 카테고리별 타임피커 ID 배열
  addTimePicker: (category: string) => void;
  removeTimePicker: (category: string, id: number) => void;
  updateTimePicker: (
    category: string,
    id: number,
    data: Partial<TimeEntry>
  ) => void;
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
          {
            id: Date.now(),
            meridian: "AM",
            hour: "12",
            minute: "00",
            inputText: "",
            unit: "선택",
          },
        ],
      },
    })),

  // ✅ 특정 카테고리의 타임피커 삭제
  removeTimePicker: (category, id) =>
    set((state) => ({
      timePickersByCategory: {
        ...state.timePickersByCategory,
        [category]: state.timePickersByCategory[category].filter(
          (picker) => picker.id !== id
        ),
      },
    })),

  // ✅ 특정 타임피커 업데이트 (시간 및 유닛 값 저장)
  updateTimePicker: (category, id, data) =>
    set((state) => ({
      timePickersByCategory: {
        ...state.timePickersByCategory,
        [category]: state.timePickersByCategory[category].map((picker) =>
          picker.id === id ? { ...picker, ...data } : picker
        ),
      },
    })),
}));
