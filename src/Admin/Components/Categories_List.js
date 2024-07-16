import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getData } from "../../Services/ServerServices";
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";



export default function DataGridDemo() {
  const [data, setData] = useState([]);

  const columns = [
  
    { field: "category_id", headerName: "ID", width: 90 },
    {
      field: "category_name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
  
    {
      field: "category_description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "category_pic",
      headerName: "Picture",
      type: "",
      width: 110,
      editable: true,
    },
    {
      headerName: "Updated",
      description: "This column has a custom cell renderer and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <div>
          <div>{params.row.created_at || ""}</div>
          <div>{params.row.created_by || ""}</div>
          <div>{params.row.updated_at || ""}</div>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.id)}>
            <ModeEditIcon sx={{color:"black"}} />
          </Button>
          <Button onClick={() => handleDelete(params.id)}>
            <DeleteIcon sx={{color:"black"}} />
          </Button>
        </>
      ),
    },
  ];
  const fetchCategory = async () => {
    try {
      const response = await getData("category/fetch_Categories"); // Replace with your API endpoint
      if (!response) {
        Sweet_Alert({ title: response.message, icon: "error" });
        throw new Error("Network response was not ok");
      }
      setData(response.data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await (id, updatedData);
      if (response.success) {
        setData((prevData) => 
          prevData.map((row) => (row.category_id === id ? { ...row, ...updatedData } : row))
        );
        Sweet_Alert({ title: response.message, icon: "success" });
      }
    } catch (error) {
      console.error("There was a problem with the edit operation:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await (id);
      if (response.success) {
        setData((prevData) => prevData.filter(row => row.category_id !== id));
        Sweet_Alert({ title: response.message, icon: "success" });
      }
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };

  console.log("data", data);
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row.category_id}
      />
    </Box>
  );
}
