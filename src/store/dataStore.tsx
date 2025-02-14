import { create } from "zustand";

type CategoryStore = {
  categoryList: string[];
  editCategory: (oldCategory: string, newCategory: string) => void; // ✅ 카테고리 수정 함수
  deleteCategory: (category: string) => void; // ✅ 카테고리 삭제 함수
  addCategory: (category: string) => void; // ✅ 카테고리 추가 함수
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categoryList: ["카테고리1", "카테고리2", "카테고리3"],

  // ✅ 카테고리 수정 함수 (oldCategory → newCategory (기존카테고리를 새로운 값으로 변경)
  editCategory: (oldCategory, newCategory) =>
    set((state) => ({
      categoryList: state.categoryList.map(
        (category) => (category === oldCategory ? newCategory : category)
        //카테고리1 === 카테고리1 ture -> 수정된 카테고리로 변경
        //카테고리2 === 카테고리1 false -> 기존 값 유지
      ),
    })),

  // ✅ 카테고리 삭제 함수
  deleteCategory: (category) =>
    set((state) => ({
      categoryList: state.categoryList.filter((c) => c !== category),
    })),

  // ✅ 새 카테고리 추가 함수
  addCategory: (category) =>
    set((state) => ({
      categoryList: [...state.categoryList, category],
    })),
}));
