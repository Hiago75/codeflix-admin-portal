import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Category, useUpdateCategoryMutation, useGetCategoryQuery } from "./categorySlice";
import CategoryForm from "./components/CategoryForm";
import ToasterSystem from "../../utils/ToasterSystem";

export default function CategoryEdit() {
  const id = useParams().id as string;
  const { data: category } = useGetCategoryQuery({ id })

  const [updateCategory, status] = useUpdateCategoryMutation();
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

    updateCategory(categoryState);
  }

  useEffect(() => {
    if (category) {
      setCategoryState(category);
    }
  }, [category]);

  useEffect(() => {
    if (status.isSuccess) {
      ToasterSystem.success("Category updated successfully")
    }

    if (status.error) {
      ToasterSystem.error("Category not updated")
    }
  }, [ToasterSystem, status.error, status.isSuccess])

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
          isdisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};