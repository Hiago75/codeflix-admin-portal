import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Category, useCreateCategoryMutation } from "./categorySlice";
import CategoryForm from "./components/CategoryForm";
import ToasterSystem from "../../utils/ToasterSystem";

export default function CategoryCreate() {
  const [createCategory, status] = useCreateCategoryMutation();
  const [isDisabled, setIsDisable] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createCategory(category);


  }

  useEffect(() => {
    if (status.isSuccess) {
      ToasterSystem.success("Category created successfully")
      setIsDisable(true);
    }

    if (status.error) {
      ToasterSystem.error("Category not created")
    }
  }, [ToasterSystem, status.error, status.isSuccess]);

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