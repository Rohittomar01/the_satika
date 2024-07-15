import React, { useState, useEffect } from "react";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
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
import AddIcon from "@mui/icons-material/Add";
import { useActiveItem } from "../../Common_Components/ActiveItemContext";

import moment from "moment";

const FabricList = () => {
  const { setActiveItem } = useActiveItem();
  const [hover, setHover] = useState(false);
  const [fabrics, setFabrics] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchFabrics();
  }, []);

  const fetchFabrics = async () => {
    try {
      const response = await getData("product/fetch-fabrics");
      const formattedFabric = response.data.map((fabric) => ({
        ...fabric,
        created_at: moment(fabric.started_at).format("DD/MM/YYYY hh:mm A"),
        updated_at: moment(fabric.ended_at).format("DD/MM/YYYY hh:mm A"),
      }));
      setFabrics(formattedFabric);
      console.log("Fetched fabrics:", response.data);
    } catch (error) {
      console.error("Error fetching fabrics:", error);
    }
  };

  const handleProcessRowUpdate = (newRow) => {
    setFabrics((prevFabrics) =>
      prevFabrics.map((row) =>
        row.fabric_id === newRow.fabric_id ? newRow : row
      )
    );
    setEditRowsModel({ ...editRowsModel, [newRow.fabric_id]: true });
    return newRow;
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedFabric = fabrics.find((row) => row.fabric_id === id);
      if (!updatedFabric) {
        console.error(`Fabric ${id} not found in state.`);
        return;
      }
      await updateData(`product/update-fabric/${id}`, updatedFabric);
      setEditRowsModel({ ...editRowsModel, [id]: false });
      console.log(`Fabric ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating fabric ${id}:`, error);
    }
  };

  const handleDeleteRow = async (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`product/delete-fabric/${deleteId}`);
      const updatedFabrics = fabrics.filter(
        (row) => row.fabric_id !== deleteId
      );
      setFabrics(updatedFabrics);
      console.log(`Fabric ${deleteId} deleted successfully!`);
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting fabric ${deleteId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleButtonClick = () => {
    setActiveItem("fabric"); // Change this to your desired route
  };

  const columns = [
    { field: "fabric_id", headerName: "ID", width: 70, editable: false },
    {
      field: "fabric_name",
      headerName: "Fabric Name",
      width: 200,
      editable: true,
    },
    {
      field: "fabric_description",
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
        const id = params.row.fabric_id;
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
          Fabric List
        </Typography>
        <Tooltip title={hover ? "Add New Fabric" : ""} arrow>
          <Button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleButtonClick}
            sx={{
              mb: 3,
              cursor: "pointer",
              borderRadius: "50%",
              width: 40,
              height: 40,
              minWidth: 0,
              padding: 0,
            }}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </Box>
      {fabrics.length > 0 ? (
        <>
          <DataGrid
            rows={fabrics}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.fabric_id}
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
            <DialogTitle id="alert-dialog-title">
              {"Confirm Delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this fabric?
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
      ) : (
        <div
          style={{ height: "80vh", display: "flex", justifyContent: "center" }}
        >
          <p style={{ color: "red", fontWeight: "bolder", fontSize: "1.5em" }}>
            No fabrics available
          </p>
        </div>
      )}
    </div>
  );
};

export default FabricList;
