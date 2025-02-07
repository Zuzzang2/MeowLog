import { create } from "zustand";

type CategoryStore = {
  categoryList: string[];
  selectedCategories: string[]; // ✅ 여러개의 카테고리가 선택됨
  setSelectedCategories: (category: string) => void; // ✅ 선택한 카테고리를 변경하는 함수
  addCategory: (category: string) => void; // ✅ 카테고리 추가 함수
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categoryList: ["카테고리1", "카테고리2", "카테고리3"],

  // ✅ 기본적으로 모든 카테고리를 선택
  selectedCategories: ["카테고리1", "카테고리2", "카테고리3"],

  // ✅ 선택한 카테고리를 토글하는 함수
  setSelectedCategories: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category) // 이미 선택된 경우 해제
        : [...state.selectedCategories, category], // 선택되지 않은 경우 추가
    })),

  // ✅ 카테고리 추가 (새 카테고리 추가)
  addCategory: (category) =>
    set((state) => ({
      categoryList: [...state.categoryList, category],
      selectedCategories: [...state.selectedCategories, category], // 자동 선택
    })),
}));
