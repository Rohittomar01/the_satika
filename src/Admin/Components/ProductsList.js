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
import { Box, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";


const ProductsList = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [products, setProducts] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getData("product/fetch-products");
      setProducts(response.data);
      console.log("Fetched products:", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProcessRowUpdate = (newRow) => {
    setProducts((prevProducts) =>
      prevProducts.map((row) =>
        row.product_id === newRow.product_id ? newRow : row
      )
    );
    setEditRowsModel({ ...editRowsModel, [newRow.product_id]: true });
    return newRow;
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedProduct = products.find((row) => row.product_id === id);
      if (!updatedProduct) {
        console.error(`Product ${id} not found in state.`);
        return;
      }
      await updateData(`product/update-product/${id}`, updatedProduct);
      setEditRowsModel({ ...editRowsModel, [id]: false });
      console.log(`Product ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
    }
  };

  const handleDeleteRow = async (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`product/delete-product/${deleteId}`);
      const updatedProducts = products.filter(
        (row) => row.product_id !== deleteId
      );
      setProducts(updatedProducts);
      console.log(`Product ${deleteId} deleted successfully!`);
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting product ${deleteId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  

  const columns = [
    { field: "product_id", headerName: "ID", width: 70, editable: false },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 200,
      editable: true,
    },
    {
      field: "product_description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    { field: "price", headerName: "Price", width: 120, editable: true },
    { field: "discount", headerName: "Discount", width: 120, editable: true },
    { field: "stock", headerName: "Stock", width: 120, editable: true },
    { field: "trending", headerName: "Trending", width: 120, editable: true },
    {
      field: "new_arrival",
      headerName: "New Arrival",
      width: 150,
      editable: true,
    },
    {
      field: "top_selling",
      headerName: "Top Selling",
      width: 150,
      editable: true,
    },
    { field: "category", headerName: "Category", width: 150, editable: true },
    { field: "occasion", headerName: "Occasion", width: 150, editable: true },
    { field: "craft", headerName: "Craft", width: 150, editable: true },
    { field: "fabric", headerName: "Fabric", width: 150, editable: true },
    { field: "color", headerName: "Color", width: 150, editable: true },
    { field: "origin", headerName: "Origin", width: 150, editable: true },
    { field: "brand", headerName: "Brand", width: 150, editable: true },
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
        const id = params.row.product_id;
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
    <div style={{ height: 600, width: "90%", marginTop: "20vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily:"Futura Bold Italic"
        }}
      >
        <Typography sx={{fontFamily:"Futura medium Italic"}} variant="h4" mb={3}>
          Product List
        </Typography>
        <Tooltip title={hover ? "Add New Product" : ""} arrow>
        <IconButton
            onClick={() => navigate("/dashboard/product")}
            aria-label="add"
          >
            <PlaylistAddIcon sx={{ size: "2%" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.product_id}
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
              Are you sure you want to delete this product?
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

export default ProductsList;
