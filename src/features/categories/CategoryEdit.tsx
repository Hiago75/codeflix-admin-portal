import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { selectCategoryById } from "./categorySlice";
import CategoryForm from "./components/CategoryForm";
import { useAppSelector } from "../../app/hooks";

export default function CategoryEdit() {
  const id = useParams().id as string;
  const [isdisabled, _] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id))

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