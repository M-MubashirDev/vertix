import { createContext, useContext } from "react";
import { UsegetAdmins } from "./Admin/useAdmin";

const adminContext = createContext();

function AdminContext({ children }) {
  const { dataAdmins, pendinAdmins } = UsegetAdmins(); // Fetches admin data
  // const { usersOfAdmin } = UsegetUser;
  return (
    <adminContext.Provider
      value={{
        admin: {
          dataAdmins,
          pendinAdmins,
        },
      }}
    >
      {children}
    </adminContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminContext = function () {
  const context = useContext(adminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminContext");
  }
  return context;
};

export default AdminContext;
