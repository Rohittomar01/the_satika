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
import { Box, Typography, Tooltip } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const BrandList = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [brands, setBrands] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await getData("product/fetch-brands");
      const formattedBrands = response.data.map((brand) => ({
        ...brand,
        created_at: moment(brand.started_at).format("DD/MM/YYYY hh:mm A"),
        updated_at: moment(brand.ended_at).format("DD/MM/YYYY hh:mm A"),
      }));
      setBrands(formattedBrands);
      console.log("Fetched brands:", response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleProcessRowUpdate = (newRow) => {
    setBrands((prevBrands) =>
      prevBrands.map((row) => (row.brand_id === newRow.brand_id ? newRow : row))
    );
    setEditRowsModel({ ...editRowsModel, [newRow.brand_id]: true });
    return newRow;
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedBrand = brands.find((row) => row.brand_id === id);
      if (!updatedBrand) {
        console.error(`Brand ${id} not found in state.`);
        return;
      }
      await updateData(`product/update-brand/${id}`, updatedBrand);
      setEditRowsModel({ ...editRowsModel, [id]: false });
      console.log(`Brand ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating brand ${id}:`, error);
    }
  };

  const handleDeleteRow = async (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`product/delete-brand/${deleteId}`);
      const updatedBrands = brands.filter((row) => row.brand_id !== deleteId);
      setBrands(updatedBrands);
      console.log(`Brand ${deleteId} deleted successfully!`);
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting brand ${deleteId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const columns = [
    { field: "brand_id", headerName: "ID", width: 70, editable: false },
    {
      field: "brand_name",
      headerName: "Brand Name",
      width: 200,
      editable: true,
    },
    {
      field: "brand_description",
      headerName: "Description",
      width: 300,
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
        const id = params.row.brand_id;
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
          Brand List
        </Typography>
        <Tooltip title={hover ? "Add New Brand" : ""} arrow>
          <IconButton
            onClick={() => navigate("/dashboard/brand")}
            aria-label="add"
          >
            <PlaylistAddIcon sx={{ size: "2%" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <>
        <DataGrid
          rows={brands}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.brand_id}
          processRowUpdate={handleProcessRowUpdate}
          editMode="row"
          slots={{ toolbar: GridToolbar }}
          sx={{
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
            textTransform: "capitalize",
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
              Are you sure you want to delete this brand?
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

export default BrandList;
