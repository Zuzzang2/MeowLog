"use client";

import { useState } from "react";
import TimePicker from "./TimePicker";

interface TimePickerListProps {
  categoryList: string[];
}

export default function TimePickerList({ categoryList }: TimePickerListProps) {
  // ✅ 각 카테고리별 여러 개의 TimePicker를 관리하는 상태
  const [timePickersByCategory, setTimePickersByCategory] = useState<{
    [key: string]: number[]; //key: 카테고리 이름, value: 타임피커의 id 배열
  }>({});

  // ✅ 특정 카테고리의 TimePicker 추가
  const addTimePicker = (category: string) => {
    setTimePickersByCategory((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), Date.now()], // prev[category] || [] → 기존에 추가된 타임피커가 없으면 빈 배열을 사용. Date.now() → 고유한 ID를 생성하여 TimePicker 추가
    }));
  };

  // ✅ 특정 TimePicker 삭제. 특정 타임피커의 취소 버튼 클릭 시 해당 타임피커의 id를 찾아서 제거. filter()를 사용하여 선택한 ID를 제외한 배열을 다시 상태로 설정
  const removeTimePicker = (category: string, id: number) => {
    setTimePickersByCategory((prev) => ({
      ...prev,
      [category]: prev[category].filter((pickerId) => pickerId !== id),
    }));
  };

  return (
    <>
      {categoryList.map((category) => (
        <div key={category} className="flex flex-col p-4">
          <div className="my-2">
            <div className="bg-blue-500 text-white rounded p-4 block">
              {category}
            </div>
          </div>
          <div>
            {/* ✅ 추가 버튼 */}
            <button
              className="border mt-2 p-2"
              onClick={() => addTimePicker(category)}
            >
              추가
            </button>
          </div>

          {/* ✅ 타임피커 목록 렌더링. timePickersByCategory[category] → 해당 카테고리의 모든 타임피커 ID 배열을 가져옴 -> map()을 사용하여 해당 ID를 가진 타임피커 컴포넌트를 동적으로 생성*/}
          {timePickersByCategory[category]?.map((id) => (
            <TimePicker
              key={id}
              onCancel={() => removeTimePicker(category, id)}
            />
          ))}
        </div>
      ))}
    </>
  );
}
