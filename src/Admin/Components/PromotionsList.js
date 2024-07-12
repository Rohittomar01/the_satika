import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
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
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";

const PromotionsList = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await getData("promotion/fetch_promotions");
      setPromotions(response.data);
      console.log("Fetched promotions:", response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const handleProcessRowUpdate = (newRow) => {
    setPromotions((prevPromotions) =>
      prevPromotions.map((row) =>
        row.promotion_id === newRow.promotion_id ? newRow : row
      )
    );
    setEditRowsModel({ ...editRowsModel, [newRow.promotion_id]: true });
    return newRow;
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedPromotion = promotions.find((row) => row.promotion_id === id);
      if (!updatedPromotion) {
        console.error(`Promotion ${id} not found in state.`);
        return;
      }
      await updateData(`promotion/update_promotion/${id}`, updatedPromotion);
      setEditRowsModel({ ...editRowsModel, [id]: false });
      console.log(`Promotion ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating promotion ${id}:`, error);
    }
  };

  const handleDeleteRow = async (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`promotion/delete_promotion/${deleteId}`);
      const updatedPromotions = promotions.filter(
        (row) => row.promotion_id !== deleteId
      );
      setPromotions(updatedPromotions);
      console.log(`Promotion ${deleteId} deleted successfully!`);
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting promotion ${deleteId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const columns = [
    { field: "promotion_id", headerName: "ID", width: 70, editable: false },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: true,
    },
    {
      field: "promotion_description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 150,
      editable: true,
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
      editable: false,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 200,
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
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const id = params.row.promotion_id;
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
    <div style={{ height: 600, width: "90%", marginTop: "20%" }}>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2>Promotions List</h2>
          </div>
          <IconButton
            onClick={() => navigate("/dashboard/Promotions")}
            aria-label="add"
          >
            <PlaylistAddIcon sx={{ size: "2%" }} />
          </IconButton>
        </div>
        <DataGrid
          rows={promotions}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.promotion_id}
          processRowUpdate={handleProcessRowUpdate}
          editMode="row"
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
              Are you sure you want to delete this promotion?
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

export default PromotionsList;
