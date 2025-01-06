import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dropdown from "../UI/DropDown";

const AdminsTable = () => {
  const navigate = useNavigate();
  const admins = [
    {
      id: 1,
      name: "Johnathan Christopher Doe III",
      email: "johnathan.christopher.doe@example.com",
      phone: "123-456-7890",
      clients: 20,
      img: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      clients: 15,
      img: "https://via.placeholder.com/40",
    },
  ];

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
  return (
    <div className="mt-6 bg-background p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Admin List</h2>
      <div className="overflow-x-auto scrollbar-thin">
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
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b hover:bg-neutral-light transition duration-150"
              >
                <td className="py-3 px-4 flex items-center space-x-4 w-1/4">
                  <img
                    src={admin.img}
                    alt={admin.name}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <span className="font-bold text-primary-dark ">
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
                <td className="py-3 px-4 text-center w-1/6">{admin.clients}</td>
                <td className="py-3 px-4 relative text-end w-1/6">
                  <Dropdown
                    items={dropdownItems}
                    buttonClassName="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    dropdownClassName="top-full right-0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminsTable;
