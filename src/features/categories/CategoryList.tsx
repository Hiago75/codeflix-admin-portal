import { Box, Button, IconButton, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteCategory, selectCategories, useGetCategoriesQuery } from "./categorySlice"
import { Link } from "react-router"
import { DataGrid, GridColDef, GridDeleteIcon, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid"

export default function CategoryList() {
  const { data } = useGetCategoriesQuery();

  console.log(data?.data)

  const categories = useAppSelector(selectCategories)
  const dispatch = useAppDispatch()

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
  }))

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
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    )
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return <Typography color={rowData.value ? "primary" : "secondary"}>
      {rowData.value ? "Active" : "Inactive"}
    </Typography>
  }

  function handleDeleteClick(id: string) {
    dispatch(deleteCategory(id))
  }

  function renderActionCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDeleteClick(params.value)}
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
