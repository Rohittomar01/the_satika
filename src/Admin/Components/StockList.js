import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getData, updateData, deleteData } from "../../Services/ServerServices";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import moment from "moment";

const StockList = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await getData("product/fetch-stocks");
      const formattedStocks = response.data.map((craft) => ({
        ...craft,
        created_at: moment(craft.started_at).format("DD/MM/YYYY hh:mm A"),
        updated_at: moment(craft.ended_at).format("DD/MM/YYYY hh:mm A"),
      }));
      setStocks(formattedStocks);
      console.log("Fetched stocks:", response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleProcessRowUpdate = (newRow) => {
    setStocks((prevStocks) =>
      prevStocks.map((row) => (row.stock_id === newRow.stock_id ? newRow : row))
    );
    setEditRowsModel({ ...editRowsModel, [newRow.stock_id]: true });
    return newRow;
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedStock = stocks.find((row) => row.stock_id === id);
      if (!updatedStock) {
        console.error(`Stock ${id} not found in state.`);
        return;
      }
      await updateData(`product/update-stock/${id}`, updatedStock);
      setEditRowsModel({ ...editRowsModel, [id]: false });
      console.log(`Stock ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating stock ${id}:`, error);
    }
  };

  const handleDeleteRow = async (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`product/delete-stock/${deleteId}`);
      const updatedStocks = stocks.filter((row) => row.stock_id !== deleteId);
      setStocks(updatedStocks);
      console.log(`Stock ${deleteId} deleted successfully!`);
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting stock ${deleteId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const columns = [
    { field: "stock_id", headerName: "ID", width: 70, editable: false },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 150,
      editable: true,
    },
    {
      field: "stock_quantity",
      headerName: "Stock Quantity",
      width: 150,
      editable: true,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 180,
      editable: false,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 180,
      editable: false,
    },
    {
      field: "created_by",
      headerName: "Created By",
      width: 150,
      editable: false,
    },
    {
      field: "actions",
      disableExport: true,
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const id = params.row.stock_id;
        if (editRowsModel[id]) {
          return (
            <IconButton onClick={() => handleSaveEdit(id)}>
              <SaveIcon />
            </IconButton>
          );
        }
        return (
          <>
            <IconButton
              onClick={() => setEditRowsModel({ ...editRowsModel, [id]: true })}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteRow(id)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: 600, width: "90%", marginTop: "10%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" mb={3}>
          Stock List
        </Typography>
        <Tooltip title={hover ? "Add New Stock" : ""} arrow>
          <IconButton
            onClick={() => navigate("/dashboard/stock")}
            aria-label="add"
          >
            <PlaylistAddIcon sx={{ size: "2%" }} />
          </IconButton>
        </Tooltip>
      </Box>

      <>
        <DataGrid
          rows={stocks}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.stock_id}
          processRowUpdate={handleProcessRowUpdate}
          editMode="row"
          slots={{ toolbar: GridToolbar }}
          sx={{
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this stock?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
};

export default StockList;
