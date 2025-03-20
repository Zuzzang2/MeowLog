"use client";

import { useTimeStore } from "@/store/useTimeStore";
import { useUnitStore } from "@/store/useUnitStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useState } from "react";

export default function ProgressBar() {
  const { categoryList } = useCategoryStore();
  const {
    timePickersByCategory,
    goalByCategory,
    setGoal,
    selectedCategories,
    selectCategory,
    deselectCategory,
  } = useTimeStore();
  const { unitByCategory } = useUnitStore();

  const [addCategory, setAddCategory] = useState(false);

  return (
    <div className="flex-center flex-col gap-4 border rounded-lg p-4 w-full">
      <h2 className="text-lg font-bold">카테고리별 목표량</h2>

      <button
        className="border px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setAddCategory(true)}
      >
        + 카테고리 추가
      </button>

      {/* 카테고리 선택 드롭다운 */}
      {addCategory && (
        <div className="flex items-center gap-4">
          <select
            onChange={(e) => {
              if (e.target.value) {
                selectCategory(e.target.value);
                setAddCategory(false);
              }
            }}
            className="border p-2 rounded"
          >
            <option value="">카테고리 선택</option>
            {categoryList
              .filter((category) => !selectedCategories.includes(category)) // 이미 선택된 카테고리는 제외
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
      )}
      {/* ✅ 선택된 카테고리만 ProgressBar 표시 */}
      {selectedCategories.map((category) => {
        // ✅ 해당 카테고리의 총 입력값 계산 (timePickersByCategory 사용)
        const totalValue =
          timePickersByCategory[category]?.reduce(
            (sum, entry) =>
              sum + (typeof entry.inputText === "number" ? entry.inputText : 0),
            0
          ) || 0;

        // ✅ 목표량 & 단위 설정
        const goal = goalByCategory[category];
        const unit = unitByCategory[category];

        // ✅ 퍼센트 계산 (최대 100%)
        let percentage = Math.min((totalValue / goal) * 100, 100);

        if (isNaN(percentage) || !isFinite(percentage)) {
          percentage = 0;
        }

        return (
          <div key={category} className="w-full">
            {/* ✅ 카테고리 이름 + 목표량 입력 */}
            <div className="flex items-center gap-2">
              <span className="text-md font-semibold">{category}</span>
              <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(category, Number(e.target.value))}
                className="border px-2 py-1 w-20 text-sm"
                placeholder="목표량"
              />
              <span className="text-sm">{unit}</span>
              <span className="text-sm font-bold">
                {percentage.toFixed(0)}%
              </span>
              <button
                onClick={() => deselectCategory(category)}
                className="border px-2 py-1 bg-red-500 text-white rounded"
              >
                삭제
              </button>
            </div>

            {/* ✅ Progress Bar */}
            <div className="relative w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${percentage}%` }}
              ></div>
              <div
                className="absolute top-1/2 transition-all duration-500 ease-in-out"
                style={{
                  left: `${percentage}%`,
                  transform: "translate(-50%, -50%)",
                  width: "24px",
                  height: "24px",
                  backgroundColor: "blue",
                  border: "2px solid black",
                  borderRadius: "50%",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                }}
              ></div>
            </div>

            {/* ✅ 총 목표량 표시 */}
            <p className="text-sm text-gray-600 mt-1">
              총 {totalValue} / {goal} {unit}
            </p>
          </div>
        );
      })}
    </div>
  );
}
