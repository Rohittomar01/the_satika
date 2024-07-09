import axios from "axios";

const ServerURL = "http://localhost:5000";

const getData = async (url) => {
  try {
    const response = await axios.get(`${ServerURL}/${url}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

const postData = async (url, body) => {
  try {
    const response = await axios.post(`${ServerURL}/${url}`, body);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${url}:`, error);
    return null;
  }
};

const updateData = async (url, body) => {
  try {
    const response = await axios.put(`${ServerURL}/${url}`, body);
    return response.data;
  } catch (error) {
    console.error(`Error updating data at ${url}:`, error);
    return null;
  }
};

const deleteData = async (url) => {
  try {
    const response = await axios.delete(`${ServerURL}/${url}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting data at ${url}:`, error);
    return null;
  }
};

export { ServerURL, getData, postData, updateData, deleteData };
