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
import moment from "moment"; // Import moment.js
import { useNavigate } from "react-router-dom";
import { Box, Typography, Tooltip } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const OccasionList = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [occasions, setOccasions] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchOccasions();
  }, []);

  const fetchOccasions = async () => {
    try {
      const response = await getData("product/fetch-occasions");
      // Format dates using moment.js
      const formattedOccasions = response.data.map((occasion) => ({
        ...occasion,
        started_at: moment(occasion.started_at).format("DD/MM/YYYY hh:mm A"), // Example format: 01/07/2024 04:30 PM
        ended_at: moment(occasion.ended_at).format("DD/MM/YYYY hh:mm A"),
      }));
      setOccasions(formattedOccasions);
      // console.log("Fetched occasions:", formattedOccasions);
    } catch (error) {
      console.error("Error fetching occasions:", error);
    }
  };

  const handleProcessRowUpdate = (newRow) => {
    setOccasions((prevOccasions) =>
      prevOccasions.map((row) =>
        row.occasion_id === newRow.occasion_id ? newRow : row
      )
    );
    setEditRowsModel({ ...editRowsModel, [newRow.occasion_id]: true });
    return newRow;
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedOccasion = occasions.find((row) => row.occasion_id === id);
      if (!updatedOccasion) {
        console.error(`Occasion ${id} not found in state.`);
        return;
      }
      await updateData(`product/update-occasion/${id}`, updatedOccasion);
      setEditRowsModel({ ...editRowsModel, [id]: false });
      console.log(`Occasion ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating occasion ${id}:`, error);
    }
  };

  const handleDeleteRow = async (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`product/delete-occasion/${deleteId}`);
      const updatedOccasions = occasions.filter(
        (row) => row.occasion_id !== deleteId
      );
      setOccasions(updatedOccasions);
      console.log(`Occasion ${deleteId} deleted successfully!`);
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting occasion ${deleteId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const columns = [
    { field: "occasion_id", headerName: "ID", width: 70, editable: false },
    {
      field: "occasion_name",
      headerName: "Occasion Name",
      width: 200,
      editable: true,
    },
    {
      field: "occasion_description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    {
      field: "started_at",
      headerName: "Start Date",
      width: 180,
      editable: true,
    },
    { field: "ended_at", headerName: "End Date", width: 180, editable: true },
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
        const id = params.row.occasion_id;
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
          Occasion List
        </Typography>
        <Tooltip title={hover ? "Add Record" : ""} arrow>
          <IconButton
            onClick={() => navigate("/dashboard/occassion")}
            aria-label="add"
          >
            <PlaylistAddIcon sx={{ size: "2%" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <>
        <DataGrid
          rows={occasions}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.occasion_id}
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
              Are you sure you want to delete this occasion?
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

export default OccasionList;
