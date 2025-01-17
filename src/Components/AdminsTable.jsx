import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dropdown from "../UI/DropDown";
import { useDeleteAdminMutate } from "../Hooks/Admin/useAdmin";
import { useAdminContext } from "../Hooks/AdminContext";

const AdminsTable = () => {
  const navigate = useNavigate();
  const { admin } = useAdminContext();
  const { dataAdmins, pendinAdmins } = admin;
  console.log(admin);
  const { deleteAdmin, isPendingDelete } = useDeleteAdminMutate();
  const dropdownItems = [
    {
      label: "View",
      icon: <FaEye />,
      Click: (value) => {
        navigate(`view/${value._id}`);
      },
    },
    {
      label: "Edit",
      icon: <FaEdit />,
      Click: (value) => {
        navigate(`edit/${value._id}`);
      },
    },
    {
      label: "Delete",
      icon: <FaTrashAlt />,
      Click: (value) => {
        if (!value) return;
        deleteAdmin({ url: `delete-admin`, id: value._id });
        console.log("value", value);
      },
    },
  ];

  if (pendinAdmins) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-6 bg-background p-6 rounded-lg">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Admin List</h2>
      <div className="overflow-x-auto min-h-[50vh] max-h-screen  scrollbar-thin shadow-md">
        <table className="min-w-full    bg-white border rounded-md">
          <thead className="bg-primary-dark text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/4">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/4">
                Email
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/6">
                Phone
              </th>
              <th className="py-3 px-4 text-center text-sm uppercase font-semibold w-1/6">
                Clients
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {dataAdmins?.admins?.length > 0 && dataAdmins ? (
              dataAdmins.admins.map((admin) => (
                <tr
                  key={admin._id}
                  className="border-b hover:bg-neutral-light transition duration-150"
                >
                  <td className="py-3 px-4 flex items-center space-x-4 w-1/4">
                    <img
                      src={admin.image || "https://via.placeholder.com/150"}
                      alt={`${admin.firstname} ${admin.lastname}`}
                      className="min-w-10 h-10 rounded-full border border-gray-300"
                    />
                    <span className="font-bold text-primary-dark">
                      {admin.firstname} {admin.lastname}
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 truncate w-1/4"
                    style={{ maxWidth: "12rem" }}
                  >
                    {admin.email}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap w-1/6">
                    {admin.cellno}
                  </td>
                  <td className="py-3 px-4 text-center w-1/6">
                    {/* Assuming "clients" field is not present in the current data */}
                    0
                  </td>
                  <td className="p  y-3 px-4 relative text-end w-1/6">
                    <Dropdown
                      value={admin}
                      items={dropdownItems}
                      buttonClassName="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      dropdownClassName="top-full right-0"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-10 text-center align-middle text-gray-500"
                >
                  <div className="flex justify-center items-center h-[200px]">
                    No admins found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminsTable;
