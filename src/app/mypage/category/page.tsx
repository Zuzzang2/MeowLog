"use client";

import { useState } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useUnitStore } from "@/store/useUnitStore";

export default function Category() {
  const { categoryList, editCategory, deleteCategory, addCategory } =
    useCategoryStore();
  const { unitOptions, unitByCategory, setUnitForCategory } = useUnitStore();
  const [isAdding, setIsAdding] = useState(false); // 카테고리 추가 중인지 여부
  const [newCategory, setNewCategory] = useState(""); // 새 카테고리 입력값 저장
  const [editingCategory, setEditingCategory] = useState<{
    oldName: string;
    newName: string;
  } | null>(null);

  // 수정버튼 누르기 전 -> 아직 setEditingCategory(...)을 실행하지 않았으므로 editingCategory === null
  // 수정버튼 누른 후 -> editingCategory가 { name: category }로 변경. 이후에 editingCategory !== null 상태가 됨
  // 완료 / 취소 버튼 눌렀을 때 -> 다시 null로 설정

  // 새 카테고리 저장 ///////공백일 시 경고 문구 만들기
  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && unitByCategory[trimmedCategory]) {
      addCategory(trimmedCategory);
      setUnitForCategory(trimmedCategory, unitByCategory[trimmedCategory]); // Zustand에 단위 저장
      setNewCategory("");
      setIsAdding(false);
    }
  };

  // 카테고리 수정 저장
  const handleEditCategory = () => {
    if (editingCategory && editingCategory.newName.trim() !== "") {
      editCategory(editingCategory.oldName, editingCategory.newName); // 기존 -> 새로운 값으로 변경
      setEditingCategory(null);
    }
  };
  return (
    <div className="w-full">
      <p>설명설명설명설명설명</p>
      <div className="border w-full p-4">
        {categoryList.map((category, index) => (
          // category = categoryList배열의 각 항목을 의미
          <div
            key={index}
            className={`flex justify-between flex-row items-center h-[60px] px-2 border cursor-pointer
             `}
          >
            {editingCategory?.oldName === category ? (
              // 수정 중이면 input 표시
              <input
                type="text"
                value={editingCategory.newName}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    newName: e.target.value,
                  })
                }
                className="border p-2"
                autoFocus
              />
            ) : (
              // 기본 상태에서 카테고리명 표시
              <div className="flex gap-4">
                <span>{category}</span>
                <span>
                  선택한 단위 :{unitByCategory[category] || "단위 없음"}
                </span>
              </div>
            )}
            {/* 수정 및 삭제 버튼 */}
            <div className="flex gap-2">
              {editingCategory?.oldName === category ? (
                <button
                  onClick={handleEditCategory}
                  className="border px-2 py-1 bg-green-500 text-white rounded"
                >
                  확인
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingCategory({
                      oldName: category,
                      newName: category,
                    });
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

        {/* 새 카테고리 추가 버튼 */}
        {isAdding ? (
          <div className="flex justify-between items-center h-[60px] px-2 border">
            <input
              type="text"
              value={newCategory}
              // required 나중에 구현
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-[300px] h-[50px] p-2 border rounded "
              placeholder="새 카테고리 입력"
              autoFocus
            />
            <select
              className="border p-2 rounded"
              value={unitByCategory[newCategory] || "선택"}
              onChange={(e) => setUnitForCategory(newCategory, e.target.value)} // Zustand에서 선택된 값 업데이트
            >
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <div className="flex-center flex-row gap-2">
              <button
                className="border px-4 py-2"
                onClick={() => setIsAdding(false)}
              >
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
