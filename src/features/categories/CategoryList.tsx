import { Box, Button, IconButton, Typography } from "@mui/material"
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice"
import { Link } from "react-router"
import { DataGrid, GridColDef, GridDeleteIcon, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid"
import { useEffect } from "react";
import ToasterSystem from "../../utils/ToasterSystem";

export default function CategoryList() {
  const { data: categories } = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const rows: GridRowsProp = categories ? categories.items.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
  })) : []

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: renderNameCell
    },
    {
      field: 'description',
      headerName:
        'Description',
      flex: 1
    },
    {
      field: 'isActive',
      headerName: 'Active?',
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell
    },
    {
      field: 'createdAt',
      headerName: 'Created at',
      flex: 1
    },
    {
      field: 'id',
      headerName: 'Actions',
      type: "string",
      flex: 1,
      renderCell: renderActionCell
    },
  ]

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary" style={{ display: 'inline-block' }}>{rowData.value}</Typography>
      </Link>
    )
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return <Typography color={rowData.value ? "primary" : "secondary"}>
      {rowData.value ? "Active" : "Inactive"}
    </Typography>
  }

  async function handleDeleteCategory(id: string) {
    deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      ToasterSystem.success("Category deleted")
    }

    if (deleteCategoryStatus.error) {
      ToasterSystem.error("Category not deleted")
    }

  }, [deleteCategoryStatus])

  function renderActionCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDeleteCategory(params.value)}
        aria-label="delete"
      >
        <GridDeleteIcon />
      </IconButton>
    )
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
      <Box style={{ display: "flex", height: 600 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          showToolbar={true}
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableRowSelectionOnClick={true}
        />
      </Box>
    </Box>
  )
}
