import React, { useState, useEffect } from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
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
import { Typography, Tooltip,Box } from '@mui/material';
import moment from 'moment'; 
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";


const CraftList = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [crafts, setCrafts] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchCrafts();
  }, []);

  const fetchCrafts = async () => {
    try {
      const response = await getData("product/fetch-crafts");
      const formattedCrafts = response.data.map(craft => ({
        ...craft,
        created_at: moment(craft.started_at).format('DD/MM/YYYY hh:mm A'),
        updated_at: moment(craft.ended_at).format('DD/MM/YYYY hh:mm A'),
      }));
      setCrafts(formattedCrafts);
      console.log("Fetched crafts:", formattedCrafts);
    } catch (error) {
      console.error('Error fetching crafts:', error);
    }
  };

  const handleProcessRowUpdate = (newRow) => {
    setCrafts((prevCrafts) =>
      prevCrafts.map((row) => (row.craft_id === newRow.craft_id ? newRow : row))
    );
    setEditRowsModel({ ...editRowsModel, [newRow.craft_id]: true });
    return newRow;
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedCraft = crafts.find((row) => row.craft_id === id);
      if (!updatedCraft) {
        console.error(`Craft ${id} not found in state.`);
        return;
      }
      await updateData(`product/update-craft/${id}`, updatedCraft);
      setEditRowsModel({ ...editRowsModel, [id]: false });
      console.log(`Craft ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating craft ${id}:`, error);
    }
  };

  const handleDeleteRow = async (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`product/delete-craft/${deleteId}`);
      const updatedCrafts = crafts.filter((row) => row.craft_id !== deleteId);
      setCrafts(updatedCrafts);
      console.log(`Craft ${deleteId} deleted successfully!`);
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting craft ${deleteId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

 

  const columns = [
    { field: 'craft_id', headerName: 'ID', width: 70, editable: false },
    { field: 'craft_name', headerName: 'Craft Name', width: 200, editable: true },
    { field: 'craft_description', headerName: 'Description', width: 300, editable: true },
    { field: 'created_at', headerName: 'Created At', width: 180, editable: false },
    { field: 'updated_at', headerName: 'Updated At', width: 180, editable: false },
    { field: 'created_by', headerName: 'Created By', width: 150, editable: false },
    {
      field: 'actions',
      disableExport: true,
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        const id = params.row.craft_id;
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
        Craft List
        </Typography>
        <Tooltip title={hover ? "Add New Craft" : ""} arrow>
        <IconButton
            onClick={() => navigate("/dashboard/craft")}
            aria-label="add"
          >
            <PlaylistAddIcon sx={{ size: "2%" }} />
          </IconButton>
        </Tooltip>
      </Box>
     
     
        <>
          <DataGrid
            rows={crafts}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.craft_id}
            processRowUpdate={handleProcessRowUpdate}
            editMode="row"
            slots={{ toolbar: GridToolbar }}
            sx={{
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
              textTransform: "capitalize"
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
                Are you sure you want to delete this craft?
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

export default CraftList;
