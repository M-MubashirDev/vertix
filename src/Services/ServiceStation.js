import axios from "axios";
import HandleError from "../Hooks/HandleError";

async function getServiceStations({ url }) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(`http://localhost:5000/api/${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return []; // Return an empty array for 404 errors
    }
    throw err;
  }
}

async function postServiceStations({ url, data }) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.post(
      `http://localhost:5000/api/${url}`,
      data, // Pass the data here
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data, response.data);
    return response.data; // Return the response data
  } catch (err) {
    HandleError(err); // Handle errors properly
    console.error("Error status:", err.response?.status); // Log error status
    throw err; // Throw the error for further handling
  }
}

const deleteStation = async ({ url, id }) => {
  console.log(url, id);
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/${url}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    HandleError(err);
    throw err;
  }
};

export { postServiceStations, getServiceStations, deleteStation };
