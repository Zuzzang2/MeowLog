import { create } from "zustand";

interface TimeEntry {
  id: number;
  meridian: "AM" | "PM";
  hour: string;
  minute: string;
  inputText: string;
  unit: string;
  isConfirmed: boolean;
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

  // 특정 카테고리의 타임피커 추가
  addTimePicker: (category) =>
    set((state) => {
      const now = new Date();
      let currentHour = now.getHours();
      let currentMinute = now.getMinutes();

      const ampm = currentHour >= 12 ? "PM" : "AM";
      currentHour = currentHour % 12 || 12; // 0시는 12로 변환

      currentMinute = Math.round(currentMinute / 10) * 10; // 분을 10분 단위로 반올림
      // (50분 → 60분이 될 경우 처리)
      if (currentMinute === 60) {
        currentMinute = 0;
        currentHour += 1; // 시간 증가

        // 12시를 넘으면 AM/PM 변경
        if (currentHour > 12) {
          currentHour = 1; // 12 → 1로 변환
        }
      }

      const formattedHour = String(currentHour).padStart(2, "0");
      const formattedMinute = String(currentMinute).padStart(2, "0");

      return {
        timePickersByCategory: {
          ...state.timePickersByCategory,
          [category]: [
            ...(state.timePickersByCategory[category] || []),
            {
              id: Date.now(),
              meridian: ampm,
              hour: formattedHour,
              minute: formattedMinute,
              inputText: "",
              unit: "선택",
              isConfirmed: false,
            },
          ],
        },
      };
    }),

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
