"use client";

import TimePicker from "./TimePicker";
import { useTimeStore } from "@/store/useTimeStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useUnitStore } from "@/store/useUnitStore";

export default function TimePickerList() {
  const { categoryList } = useCategoryStore();
  const { timePickersByCategory, addTimePicker, removeTimePicker } =
    useTimeStore();

  return (
    <>
      {categoryList.map((category) => (
        <div key={category} className="flex flex-col p-4">
          <div className="box-border">
            <span className="bg-blue-500 p-2 text-white rounded inline-block">
              {category}
            </span>
          </div>
          <div>
            {/* 타임피커 목록 렌더링. timePickersByCategory[category] → 해당 카테고리의 모든 타임피커 ID 배열을 가져옴 -> map()을 사용하여 해당 ID를 가진 타임피커 컴포넌트를 동적으로 생성*/}
            {timePickersByCategory[category]?.map((picker) => (
              <TimePicker
                key={picker.id}
                category={category}
                onCancel={() => removeTimePicker(category, picker.id)}
              />
            ))}

            {/* 추가 버튼 */}
            <button
              className="border mt-2 p-2"
              onClick={() => addTimePicker(category)}
            >
              추가
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
