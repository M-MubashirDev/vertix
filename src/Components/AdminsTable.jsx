import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FaEdit,
  FaTrashAlt,
  FaUserPlus,
  FaEye,
  FaEllipsisV,
} from "react-icons/fa";

const admins = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    clients: 20,
    img: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    clients: 15,
    img: "https://via.placeholder.com/40",
  },
];

const AdminsTable = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY, // Account for scrolling
      left: rect.left + window.scrollX,
    });
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  return (
    <div className="overflow-x-auto mt-6 bg-background p-6 rounded-lg shadow-md relative">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Admin List</h2>
      <table className="min-w-full bg-white border rounded-md overflow-hidden">
        <thead className="bg-primary-dark text-white">
          <tr>
            <th className="py-3 px-4 text-left text-sm uppercase font-semibold">
              Name
            </th>
            <th className="py-3 px-4 text-left text-sm uppercase font-semibold">
              Email
            </th>
            <th className="py-3 px-4 text-left text-sm uppercase font-semibold">
              Phone
            </th>
            <th className="py-3 px-4 text-left text-sm uppercase font-semibold">
              Clients
            </th>
            <th className="py-3 px-4 text-left text-sm uppercase font-semibold">
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
              <td className="py-3 px-4 flex items-center space-x-4">
                <img
                  src={admin.img}
                  alt={admin.name}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <span className="font-bold text-primary-dark">
                  {admin.name}
                </span>
              </td>
              <td className="py-3 px-4">{admin.email}</td>
              <td className="py-3 px-4">{admin.phone}</td>
              <td className="py-3 px-4">{admin.clients}</td>
              <td className="py-3 px-4 relative">
                <button
                  className="text-accent hover:text-primary-dark p-2"
                  onClick={(e) => toggleMenu(admin.id, e)}
                  title="Menu"
                >
                  <FaEllipsisV />
                </button>
                {activeMenu === admin.id &&
                  createPortal(
                    <div
                      ref={menuRef}
                      className="absolute z-50 bg-white shadow-md rounded-md w-32"
                      style={{
                        top: menuPosition.top,
                        left: menuPosition.left,
                      }}
                    >
                      <ul className="p-2 space-y-2">
                        <li>
                          <button
                            className="flex items-center text-primary-dark hover:text-primary p-2"
                            title="View"
                          >
                            <FaEye className="mr-2" /> View
                          </button>
                        </li>
                        <li>
                          <button
                            className="flex items-center text-primary-dark hover:text-primary p-2"
                            title="Edit"
                          >
                            <FaEdit className="mr-2" /> Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="flex items-center text-accent-dark hover:text-accent p-2"
                            title="Delete"
                          >
                            <FaTrashAlt className="mr-2" /> Delete
                          </button>
                        </li>
                      </ul>
                    </div>,
                    document.body // Render outside of table boundaries
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminsTable;
