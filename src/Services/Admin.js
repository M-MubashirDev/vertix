import axios from "axios";
import HandleError from "../Hooks/HandleError";

async function postAdmin({ url, data }) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.post(
      `https://vertix-nine.vercel.app/${url}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response, data, "🌏🌏");
    return response;
  } catch (err) {
    HandleError(err);
  }
}

async function getAdmins({ url }) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(`https://vertix-nine.vercel.app/${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    HandleError(err);
    console.log(err.status);
  }
}

async function deleteAdmins({ url, id }) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.delete(
      `https://vertix-nine.vercel.app/${url}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    HandleError(err);
  }
}
async function updateAdmins({ url, id, updatedData }) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.patch(
      `https://vertix-nine.vercel.app/${url}/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    HandleError(err);
  }
}

export { getAdmins, postAdmin, updateAdmins, deleteAdmins };
