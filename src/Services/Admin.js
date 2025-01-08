import axios from "axios";

async function postAdmin({ url, data }) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.post(
      `http://localhost:5000/api/${url}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}
async function getAdmin({ url }) {
  console.log("get admin", url);
}
export { getAdmin, postAdmin };
