import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { CategoryParams, Results } from "../../types/Category";

export interface Category {
  id: string,
  name: string,
  description: null | string,
  is_active: boolean,
  created_at: string;
  deleted_at: null | string;
}

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("perPage", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  return query.toString();
}

function getCategories({ page = 0, perPage = 10, search = "" }) {
  const params = { page, perPage, search }

  return `${endpointUrl}?${parseQueryParams(params)}`
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE"
  }
}

function createCategoryMutation(category: Category) {
  return { url: endpointUrl, method: "POST", body: category }
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category
  }
}

function getCategoryQuery({ id }: { id: string }) {
  return `${endpointUrl}/${id}`
}

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Category, { id: string }>({
      query: getCategoryQuery,
      providesTags: ["Categories"]
    }),
    createCategory: mutation<Results, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"]
    }),
    deleteCategory: mutation<void, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"]
    }),
    updateCategory: mutation<Results, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"]
    })
  })
})

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

export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find(category => category.id === id);

  return (
    category || {
      id: "",
      name: "",
      description: "",
      is_active: false,
      deleted_at: null,
      created_at: ""
    }
  )
}

export const initialState = categories

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    deleteCategory(state, action) {
      const index = state.findIndex(category => category.id === action.payload.id);

      state.splice(index, 1)
    },
    updateCategory(state, action) {
      const index = state.findIndex(category => category.id === action.payload.id);

      state[index] = action.payload
    }
  }
})

export const selectCategories = (state: RootState) => state.categories
export const { createCategory, deleteCategory, updateCategory } = categoriesSlice.actions

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery
} = categoryApiSlice

export default categoriesSlice.reducer