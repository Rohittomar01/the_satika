import React, { useState, useEffect } from 'react';
import { DataGrid,GridToolbar} from '@mui/x-data-grid';
import { getData, updateData, deleteData } from "../../Services/ServerServices";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, Typography, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useActiveItem } from "../../Common_Components/ActiveItemContext";

import moment from 'moment';

const ColorList = () => {
  const { setActiveItem } = useActiveItem();
  const [hover, setHover] = useState(false);
  const [colors, setColors] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const response = await getData("product/fetch-colors");
      const formattedColors = response.data.map((color) => ({
        ...color,
        created_at: moment(color.started_at).format("DD/MM/YYYY hh:mm A"),
        updated_at: moment(color.ended_at).format("DD/MM/YYYY hh:mm A"),
      }));
      setColors(formattedColors);
      console.log("Fetched colors:", response.data);
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  const handleProcessRowUpdate = (newRow) => {
    setColors((prevColors) =>
      prevColors.map((row) => (row.color_id === newRow.color_id ? newRow : row))
    );
    setEditRowsModel({ ...editRowsModel, [newRow.color_id]: true });
    return newRow;
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedColor = colors.find((row) => row.color_id === id);
      if (!updatedColor) {
        console.error(`Color ${id} not found in state.`);
        return;
      }
      await updateData(`product/update-color/${id}`, updatedColor);
      setEditRowsModel({ ...editRowsModel, [id]: false });
      console.log(`Color ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating color ${id}:`, error);
    }
  };

  const handleDeleteRow = async (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`product/delete-color/${deleteId}`);
      const updatedColors = colors.filter((row) => row.color_id !== deleteId);
      setColors(updatedColors);
      console.log(`Color ${deleteId} deleted successfully!`);
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting color ${deleteId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleButtonClick = () => {
    setActiveItem("color"); // Change this to your desired route
   };

  const columns = [
    { field: 'color_id', headerName: 'ID', width: 70, editable: false },
    { field: 'color_name', headerName: 'Color Name', width: 200, editable: true },
    { field: 'color_code', headerName: 'Color Code', width: 200, editable: true },
    { field: 'created_at', headerName: 'Created At', width: 180, editable: false },
    { field: 'updated_at', headerName: 'Updated At', width: 180, editable: false },
    { field: 'created_by', headerName: 'Created By', width: 150, editable: false },
    {
      field: 'actions',
      disableExport: true,
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        const id = params.row.color_id;
        if (editRowsModel[id]) {
          return (
            <IconButton onClick={() => handleSaveEdit(id)}>
              <SaveIcon />
            </IconButton>
          );
        }
        return (
          <>
            <IconButton onClick={() => setEditRowsModel({ ...editRowsModel, [id]: true })}>
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
    <div style={{ height: 600, width: '90%', marginTop: "10%" }}>
       <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" mb={3}>
        Color List
        </Typography>
        <Tooltip title={hover ? "Add New Color" : ""} arrow>
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
      {colors.length > 0 ? (
        <>
          <DataGrid
            rows={colors}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.color_id}
            processRowUpdate={handleProcessRowUpdate}
            editMode="row"
            slots={{ toolbar: GridToolbar }}
            sx={{
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
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
                Are you sure you want to delete this color?
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
        <div style={{ height: "80vh", display: "flex", justifyContent: "center" }}>
          <p style={{ color: "red", fontWeight: "bolder", fontSize: "1.5em" }}>No colors available</p>
        </div>
      )}
    </div>
  );
};

export default ColorList;
