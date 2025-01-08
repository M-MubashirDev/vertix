import axios from "axios";

const loginsuperAdmin = async ({ email, password }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
    const { token } = response.data;
    console.log(response);
    localStorage.setItem("authToken", token);
    return { success: true, token };
  } catch (error) {
    console.error("Login error response:", error.response?.data); // Log server response
    throw error;
  }
};

export default loginsuperAdmin;
