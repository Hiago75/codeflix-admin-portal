import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Category, createCategory } from "./categorySlice";
import CategoryForm from "./components/CategoryForm";
import { useAppDispatch } from "../../app/hooks";
import { useSnackbar } from "notistack";

export default function CategoryCreate() {
  const dispatch = useAppDispatch();
  const [isDisabled, _] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCategory({ ...category, [name]: value })
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setCategory({ ...category, [name]: checked })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createCategory(category));
    enqueueSnackbar("Category updated successfully", {
      variant: "success",
    });
  }

  useEffect(() => {
    if (category) {
      setCategory(category);
    }
  }, [category]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          isLoading={false}
          category={category}
          isdisabled={isDisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};