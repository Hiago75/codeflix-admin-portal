import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category {
  id: string,
  name: string,
  description: null | string,
  is_active: boolean,
  created_at: string;
  deleted_at: null | string;
}

const categories: Category[] = [
  {
    id: "0589e63f0c5f4cf7a5de1073a920e65e",
    name: "Documentaries",
    description: "null",
    is_active: false,
    created_at: "2025-06-04T13:05:51.098430Z",
    deleted_at: "2025-06-04T13:05:51.098430Z"
  },
  {
    id: "156e63212c1e425998aa576006704854",
    name: "Movies",
    description: "Most watched categories",
    is_active: true,
    created_at: "2025-06-04T13:05:22.456190Z",
    deleted_at: null
  }
]

export const initialState = categories

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory(state, action) { },
    deleteCategory(state, action) { },
    updateCategory(state, action) { }
  }
})

export const selectCategories = (state: RootState) => state.categories

export default categoriesSlice.reducer