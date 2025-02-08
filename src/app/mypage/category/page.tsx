"use client";

import { useState } from "react";
import { useCategoryStore } from "@/store/dataStore";

export default function Category() {
  const { categoryList, editCategory, deleteCategory, addCategory } =
    useCategoryStore();
  const [isAdding, setIsAdding] = useState(false); // ✅ 카테고리 추가 중인지 여부
  const [newCategory, setNewCategory] = useState(""); // ✅ 새 카테고리 입력값 저장
  const [editingCategory, setEditingCategory] = useState<string | null>(null); // ✅ 현재 수정 중인 카테고리
  const [editedCategoryName, setEditedCategoryName] = useState(""); // ✅ 수정 중인 카테고리 입력값

  // ✅ 새 카테고리 저장 함수
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      addCategory(newCategory); // ✅ Zustand 상태에 추가
      setNewCategory(""); // 입력값 초기화
      setIsAdding(false); // 입력창 닫기
    }
  };
  // ✅ 취소 버튼 클릭 시 입력창 닫기
  const handleCancel = () => {
    setIsAdding(false);
    setNewCategory(""); //입력값 초기화
  };

  // ✅ 카테고리 수정 적용
  const handleEditCategory = (oldCategory: string) => {
    if (editedCategoryName.trim() !== "") {
      editCategory(oldCategory, editedCategoryName); // ✅ Zustand 상태 업데이트
      setEditingCategory(null); // 수정 모드 종료
    }
  };

  return (
    <div className="w-full">
      <p>설명설명설명설명설명</p>
      <div className="border w-full p-4">
        {/* 카테고리 리스트 */}

        {categoryList.map((category, index) => (
          //✅ category = categoryList배열의 각 항목을 의미
          <div
            key={index}
            className={`flex justify-between flex-row items-center h-[60px] px-2 border cursor-pointer
             `}
          >
            {editingCategory === category ? (
              // ✅ 수정 중이면 input 표시
              <input
                type="text"
                value={editedCategoryName}
                onChange={(e) => setEditedCategoryName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleEditCategory(category)
                }
                className="border p-2"
                autoFocus
              />
            ) : (
              // ✅ 기본 상태에서 카테고리명 표시
              <span>{category}</span>
            )}
            {/* ✅ 수정 및 삭제 버튼 */}
            <div className="flex gap-2">
              {editingCategory === category ? (
                // ✅ 수정 중일 때 '확인' 버튼
                <button
                  onClick={() => handleEditCategory(category)}
                  className="border px-2 py-1 bg-green-500 text-white rounded"
                >
                  확인
                </button>
              ) : (
                // ✅ 수정 버튼
                <button
                  onClick={() => {
                    setEditingCategory(category); // ✅ 수정 모드 활성화
                    setEditedCategoryName(category); // ✅ 기존 카테고리명 입력
                  }}
                  className="border px-2 py-1 bg-blue-500 text-white rounded"
                >
                  수정
                </button>
              )}
              <button
                onClick={() => deleteCategory(category)}
                className="border px-2 py-1 bg-red-500 text-white rounded"
              >
                삭제
              </button>
            </div>
          </div>
        ))}

        {/* ✅ 새 카테고리 추가 버튼 (항상 가장 아래) */}
        {isAdding ? (
          <div className="flex justify-between items-center h-[60px] px-2 border">
            <input
              type="text"
              value={newCategory}
              // required 나중에 구현
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCategory();
              }}
              className="w-[300px] h-[50px] p-2 border rounded "
              placeholder="새 카테고리 입력 후 Enter"
              autoFocus
            />
            <div className="flex-center flex-row gap-2">
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
