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
const OffersList = () => {

  const navigate=useNavigate();
  const [offers, setOffers] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await getData("offers/fetch_offers");
      setOffers(response.data);
      console.log("Fetched offers:", response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const handleProcessRowUpdate = (newRow) => {
    setOffers((prevOffers) =>
      prevOffers.map((row) => (row.offer_id === newRow.offer_id ? newRow : row))
    );
    setEditRowsModel({ ...editRowsModel, [newRow.offer_id]: true });
    return newRow;
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedOffer = offers.find((row) => row.offer_id === id);
      if (!updatedOffer) {
        console.error(`Offer ${id} not found in state.`);
        return;
      }
      await updateData(`offers/update_offer/${id}`, updatedOffer);
      setEditRowsModel({ ...editRowsModel, [id]: false });
      console.log(`Offer ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating offer ${id}:`, error);
    }
  };

  const handleDeleteRow = async (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`offers/delete_offer/${deleteId}`);
      const updatedOffers = offers.filter((row) => row.offer_id !== deleteId);
      setOffers(updatedOffers);
      console.log(`Offer ${deleteId} deleted successfully!`);
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting offer ${deleteId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const columns = [
    { field: "offer_id", headerName: "ID", width: 70, editable: false },
    { field: "title", headerName: "Offer Name", width: 200, editable: true },
    {
      field: "offer_description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 200,
      editable: true,
    },
    { field: "end_date", headerName: "End Date", width: 200, editable: true },
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
      field: "discount_type",
      headerName: "Discount Type",
      width: 150,
      editable: true,
    },
    {
      field: "discount_value",
      headerName: "Discount Value",
      width: 150,
      editable: true,
    },
    {
      field: "minimum_order_value",
      headerName: "Minimum Order Value",
      width: 200,
      editable: true,
    },
    {
      field: "maximum_discount_amount",
      headerName: "Maximum Discount Amount",
      width: 200,
      editable: true,
    },
    {
      field: "applicable_to",
      headerName: "Applicable To",
      width: 150,
      editable: true,
    },
    {
      field: "usage_limit",
      headerName: "Usage Limit",
      width: 150,
      editable: true,
    },
    {
      field: "per_user_limit",
      headerName: "Per User Limit",
      width: 150,
      editable: true,
    },
    { field: "status", headerName: "Status", width: 150, editable: true },
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
        const id = params.row.offer_id;
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
      {offers.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2>Offers List</h2>
            </div>
            <IconButton onClick={()=>navigate('/dashboard/Offers')} aria-label="delete">
              <PlaylistAddIcon sx={{ size: "2%" }} />
            </IconButton>
          </div>
          <DataGrid
            rows={offers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.offer_id}
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
            <DialogTitle id="alert-dialog-title">
              {"Confirm Delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this offer?
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
          <p style={{ fontWeight: "bolder", fontSize: "1.5em" }}>
            No offers available
          </p>
        </div>
      )}
    </div>
  );
};

export default OffersList;
