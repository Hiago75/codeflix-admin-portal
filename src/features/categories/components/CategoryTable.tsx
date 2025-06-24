import { DataGrid, GridColDef, GridDeleteIcon, GridFilterModel, GridRenderCellParams, GridPaginationModel } from "@mui/x-data-grid";
import { Results } from "../../../types/Category";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router"

type CategoriesTableProps = {
  data: Results | undefined;
  perPage: number;
  page: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: GridPaginationModel) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleDeleteCategory: (id: string) => void;
}

type RowsProps = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
}

export function CategoriesTable({
  data,
  page,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleDeleteCategory
}: CategoriesTableProps) {
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

  const mapDataToGridRows = (data: Results): RowsProps[] => {
    const { items: categories } = data;

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      isActive: category.is_active,
      createdAt: new Date(category.created_at).toLocaleDateString("pt-BR")
    }))
  }

  const rows = data ? mapDataToGridRows(data) : []
  const rowCount = data ? data.total : 0;

  const componentProps = {
    showToolbar: true,
    disableColumnSelector: true,
    disableColumnFilter: true,
    disableRowSelectionOnClick: true,
    pageSizeOptions: rowsPerPage,
    paginationModel: {
      pageSize: perPage,
      page: page
    },
    onPaginationModelChange: handleOnPageChange,
    filterMode: 'server',
    onFilterModelChange: handleFilterChange,
    paginationMode: 'server',
    rowCount: rowCount,
    loading: isFetching,
    checkboxSelection: false
  } as const;

  return (
    <Box sx={{ display: "flex", height: 683, width: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        {...componentProps}
      />
    </Box>
  )
}