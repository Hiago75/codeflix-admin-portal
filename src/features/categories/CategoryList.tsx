import { Box, Button } from "@mui/material"
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice"
import { Link } from "react-router"
import { CategoriesTable } from "./components/CategoryTable";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";

export default function CategoryList() {
  const [perPage] = useState(10)
  const [rowsPerPage] = useState([10, 20, 30])
  const [search, setSearch] = useState("")

  const { data: categories, isFetching } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  async function handleDeleteCategory(id: string) {
    deleteCategory({ id });
  }

  function handleOnPageChange(page: GridPaginationModel) {
    console.log("pageChange")
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    console.log("filterChange")
  }

  function handleOnPageSizeChange(perPage: number) {
    console.log("pageSizeChange")
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>
      <Box>
        <CategoriesTable
          data={categories}
          isFetching={isFetching}
          perPage={perPage}
          rowsPerPage={rowsPerPage}
          handleOnPageChange={handleOnPageChange}
          handleFilterChange={handleFilterChange}
          handleOnPageSizeChange={handleOnPageSizeChange}
          handleDeleteCategory={handleDeleteCategory}
        />
      </Box>
    </Box>
  )
}
