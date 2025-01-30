import axios from "axios";
import HandleError from "../Hooks/HandleError";

async function getUsers({ url }) {
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
export { getUsers };
