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
import { useNavigate } from "react-router-dom";
import moment from "moment";

const OriginList = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [origins, setOrigins] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchOrigins();
  }, []);

  const fetchOrigins = async () => {
    try {
      const response = await getData("product/fetch-origins");
      const formattedOrigins = response.data.map((origin) => ({
        ...origin,
        created_at: moment(origin.started_at).format("DD/MM/YYYY hh:mm A"),
        updated_at: moment(origin.ended_at).format("DD/MM/YYYY hh:mm A"),
      }));
      setOrigins(formattedOrigins);
      console.log("Fetched origins:", response.data);
    } catch (error) {
      console.error("Error fetching origins:", error);
    }
  };

  const handleProcessRowUpdate = (newRow) => {
    setOrigins((prevOrigins) =>
      prevOrigins.map((row) =>
        row.origin_id === newRow.origin_id ? newRow : row
      )
    );
    setEditRowsModel({ ...editRowsModel, [newRow.origin_id]: true });
    return newRow;
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedOrigin = origins.find((row) => row.origin_id === id);
      if (!updatedOrigin) {
        console.error(`Origin ${id} not found in state.`);
        return;
      }
      await updateData(`product/update-origin/${id}`, updatedOrigin);
      setEditRowsModel({ ...editRowsModel, [id]: false });
      console.log(`Origin ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating origin ${id}:`, error);
    }
  };

  const handleDeleteRow = async (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`product/delete-origin/${deleteId}`);
      const updatedOrigins = origins.filter(
        (row) => row.origin_id !== deleteId
      );
      setOrigins(updatedOrigins);
      console.log(`Origin ${deleteId} deleted successfully!`);
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting origin ${deleteId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const columns = [
    { field: "origin_id", headerName: "ID", width: 70, editable: false },
    {
      field: "country_name",
      headerName: "Country Name",
      width: 200,
      editable: true,
    },
    {
      field: "region_name",
      headerName: "Region Name",
      width: 200,
      editable: true,
    },
    {
      field: "origin_description",
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
        const id = params.row.origin_id;
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
          Origin List
        </Typography>
        <Tooltip title={hover ? "Add New Origin" : ""} arrow>
          <IconButton
            onClick={() => navigate("/dashboard/origin")}
            aria-label="add"
          >
            <PlaylistAddIcon sx={{ size: "2%" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <>
        <DataGrid
          rows={origins}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.origin_id}
          processRowUpdate={handleProcessRowUpdate}
          editMode="row"
          slots={{ toolbar: GridToolbar }}
          sx={{
            "& .MuiDataGrid-cell:hover": {
              origin: "primary.main",
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
              Are you sure you want to delete this origin?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} origin="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} origin="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
};

export default OriginList;
