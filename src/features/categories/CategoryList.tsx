import { Box, Button, Typography } from "@mui/material"
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice"
import { Link } from "react-router"
import { CategoriesTable } from "./components/CategoryTable";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ToasterSystem from "../../utils/ToasterSystem";

export default function CategoryList() {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [rowsPerPage] = useState([10, 20, 30])
  const [search, setSearch] = useState("")

  const options = { perPage, search, page }
  const { data: categories, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  async function handleDeleteCategory(id: string) {
    deleteCategory({ id });
  }

  function handleOnPageChange(page: GridPaginationModel) {
    setPage(page.page)
    setPerPage(page.pageSize)
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join("")
      setSearch(search);
    }

    setSearch("")
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      ToasterSystem.success('Category deleted')
    }

    if (deleteCategoryStatus.error) {
      ToasterSystem.error("Category not deleted")
    }
  }, [deleteCategoryStatus, ToasterSystem])

  if (error) {
    return <Typography>Error fetching categories</Typography>
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
          page={page}
          rowsPerPage={rowsPerPage}
          handleOnPageChange={handleOnPageChange}
          handleFilterChange={handleFilterChange}
          handleDeleteCategory={handleDeleteCategory}
        />
      </Box>
    </Box>
  )
}
