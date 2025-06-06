import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Category } from "./categorySlice";
import CategoryForm from "./components/CategoryForm";

export default function CategoryCreate() {
  const [isdisabled, _] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: ""
  });

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
          isdisabled={isdisabled}
          handleSubmit={() => console.log("teste")}
          handleChange={() => console.log('change')}
          handleToggle={() => console.log("toggle")}
        />
      </Paper>
    </Box>
  );
};