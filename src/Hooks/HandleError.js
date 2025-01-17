import { useNavigate } from "react-router-dom";

async function HandleError(err) {
  console.log(err.status === 401);
  if (err.status === 401) {
    // Token is invalid or expired
    localStorage.removeItem("authToken");
    // You might use React Router or another method to navigate to the login page
    window.location.href = "/login";
  } else {
    // Other error handling
    console.error(err);
    throw new Error(err.message);
  }
}

export default HandleError;
