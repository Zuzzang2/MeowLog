import { create } from "zustand";

type CategoryStore = {
  categoryList: string[];
  editCategory: (oldName: string, newName: string) => void;
  deleteCategory: (category: string) => void;
  addCategory: (category: string) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categoryList: ["카테고리1", "카테고리2", "카테고리3"],

  // 카테고리 수정 함수 (oldName → newName 기존카테고리를 새로운 값으로 변경)
  editCategory: (oldName, newName) =>
    set((state) => {
      if (!state.categoryList.includes(oldName)) return state;

      return {
        categoryList: state.categoryList.map((category) =>
          category === oldName ? newName : category
        ),
      };
    }),

  deleteCategory: (category) =>
    set((state) => ({
      categoryList: state.categoryList.filter((c) => c !== category),
    })),

  addCategory: (category) =>
    set((state) => ({
      categoryList: [...state.categoryList, category],
    })),
}));
