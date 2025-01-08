import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dropdown from "../UI/DropDown";

const AdminsTable = () => {
  const navigate = useNavigate();

  const dropdownItems = [
    {
      label: "View",
      icon: <FaEye />,
      onClick: () => navigate("view"),
    },
    {
      label: "Edit",
      icon: <FaEdit />,
      onClick: () => alert("Edit clicked"),
    },
    {
      label: "Delete",
      icon: <FaTrashAlt />,
      onClick: () => alert("Delete clicked"),
    },
  ];
  const admins = []; // Empty array to simulate no data

  return (
    <div className="mt-6 bg-background p-6 rounded-lg">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Admin List</h2>
      <div className="overflow-x-auto scrollbar-thin shadow-md">
        <table className="min-w-full bg-white border rounded-md">
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
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-b hover:bg-neutral-light transition duration-150"
                >
                  <td className="py-3 px-4 flex items-center space-x-4 w-1/4">
                    <img
                      src={admin.img}
                      alt={admin.name}
                      className="min-w-10 h-10 rounded-full border border-gray-300"
                    />
                    <span className="font-bold text-primary-dark">
                      {admin.name}
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 truncate w-1/4"
                    style={{ maxWidth: "12rem" }}
                  >
                    {admin.email}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap w-1/6">
                    {admin.phone}
                  </td>
                  <td className="py-3 px-4 text-center w-1/6">
                    {admin.clients}
                  </td>
                  <td className="py-3 px-4 relative text-end w-1/6">
                    <Dropdown
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
