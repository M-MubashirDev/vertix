import axios from "axios";

const loginsuperAdmin = async ({ email, password }) => {
  try {
    const response = await axios.post("https://vertix-nine.vercel.app/login", {
      email,
      password,
    });
    if (response?.data?.user?.role !== "superadmin") {
      throw new Error("Wronge Cradentials for SUperAdmin");
    }
    const { token } = response.data;

    localStorage.setItem("authToken", token);
    return { success: true, token };
  } catch (error) {
    console.error("Login error response:", error.response?.data); // Log server response
    throw error;
  }
};

export default loginsuperAdmin;
