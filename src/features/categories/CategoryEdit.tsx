import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Category, selectCategoryById, updateCategory } from "./categorySlice";
import CategoryForm from "./components/CategoryForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function CategoryEdit() {
  const dispatch = useAppDispatch();
  const id = useParams().id as string;
  const [isDisabled] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id))
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    is_active: false,
    created_at: "",
    deleted_at: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCategoryState({ ...categoryState, [name]: value })
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setCategoryState({ ...categoryState, [name]: checked })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateCategory(categoryState));
  }

  useEffect(() => {
    if (category) {
      setCategoryState(category);
    }
  }, [category]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          isLoading={false}
          category={categoryState}
          isdisabled={isDisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};