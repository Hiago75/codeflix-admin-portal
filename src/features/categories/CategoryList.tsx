import { Box, Button, IconButton, Typography } from "@mui/material"
import { useAppSelector } from "../../app/hooks"
import { selectCategories } from "./categorySlice"
import { Link } from "react-router"
import { DataGrid, GridColDef, GridDeleteIcon, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid"

export default function CategoryList() {
  const categories = useAppSelector(selectCategories)

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
  }))

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
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
      flex: 1,
      renderCell: renderActionCell
    },
  ]

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return <Typography color={rowData.value ? "primary" : "secondary"}>
      {rowData.value ? "Active" : "Inactive"}
    </Typography>
  }

  function renderActionCell(rowData: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => console.log("Delete")}
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
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          showToolbar={true}
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableRowSelectionOnClick={true}
        />
      </div>
    </Box>
  )
}
