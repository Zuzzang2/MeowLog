"use client";

import { useState } from "react";
import { useCategoryStore } from "@/store/dataStore";

export default function Category() {
  const {
    categoryList,
    selectedCategories,
    setSelectedCategories,
    addCategory,
  } = useCategoryStore();
  const [isAdding, setIsAdding] = useState(false); // ✅ 카테고리 추가 중인지 여부
  const [newCategory, setNewCategory] = useState(""); // ✅ 새 카테고리 입력값 저장

  // ✅ 새 카테고리 저장 함수
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      addCategory(newCategory); // ✅ Zustand 상태에 추가
      setSelectedCategories(newCategory); // ✅ 자동 선택
      setNewCategory(""); // 입력값 초기화
      setIsAdding(false); // 입력창 닫기
    }
  };
  // ✅ 취소 버튼 클릭 시 입력창 닫기
  const handleCancel = () => {
    setIsAdding(false);
    setNewCategory(""); //입력값 초기화
  };

  return (
    <div className="w-full">
      <p>설명설명설명설명설명</p>
      <div className="border w-full p-4">
        {/* 카테고리 리스트 */}
        {categoryList.map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategories(category)} // ✅ 선택/해제 토글
            className={`flex flex-row items-center h-[60px] border cursor-pointer
             `}
          >
            <span>{category}</span>
          </div>
        ))}

        {/* ✅ 새 카테고리 추가 버튼 (항상 가장 아래) */}
        {isAdding ? (
          <div className="flex justify-between">
            <input
              type="text"
              value={newCategory}
              // required 나중에 구현
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCategory();
              }}
              className="mt-auto w-[300px] h-[50px] p-2 border rounded"
              placeholder="새 카테고리 입력 후 Enter"
              autoFocus
            />
            <div className="flex-center flex-row gap-4">
              <button className="border px-4 py-2" onClick={handleCancel}>
                취소
              </button>
              <button className="border px-4 py-2" onClick={handleAddCategory}>
                확인
              </button>
            </div>
          </div>
        ) : (
          <button
            className="mt-auto w-full h-[50px] bg-green-500 text-white rounded"
            onClick={() => setIsAdding(true)}
          >
            + 카테고리 추가
          </button>
        )}
      </div>
    </div>
  );
}
