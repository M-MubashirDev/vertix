// import { useState } from "react";
// import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Dropdown from "../UI/DropDown";
// import { useDeleteAdminMutate } from "../Hooks/Admin/useAdmin";
// import { useAdminContext } from "../Hooks/AdminContext";
// import FullPageSpinner from "../UI/Spinner";

// const AdminsTable = () => {
//   const navigate = useNavigate();
//   const { admin } = useAdminContext();
//   const { dataAdmins, pendinAdmins } = admin;
//   const { deleteAdmin, isPendingDelete } = useDeleteAdminMutate();

//   const [searchQuery, setSearchQuery] = useState(""); // State for search input
//   const [sortColumn, setSortColumn] = useState("firstname"); // State for selected sorting column
//   const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

//   const sortingOptions = [
//     { label: "Name", value: "firstname" },
//     { label: "Email", value: "email" },
//     { label: "Phone", value: "cellno" },
//   ];

//   // Sort and filter data
//   const filteredAndSortedAdmins = dataAdmins?.admins
//     ?.filter((admin) =>
//       Object.values(admin).some((value) =>
//         String(value).toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     )
//     .sort((a, b) => {
//       if (a[sortColumn].toLowerCase() < b[sortColumn].toLowerCase()) {
//         return sortOrder === "asc" ? -1 : 1;
//       }
//       if (a[sortColumn].toLowerCase() > b[sortColumn].toLowerCase()) {
//         return sortOrder === "asc" ? 1 : -1;
//       }
//       return 0;
//     });

//   const dropdownItems = [
//     {
//       label: "View",
//       icon: <FaEye />,
//       Click: (value) => {
//         navigate(`view/${value._id}`);
//       },
//     },
//     {
//       label: "Edit",
//       icon: <FaEdit />,
//       Click: (value) => {
//         navigate(`edit/${value._id}`);
//       },
//     },
//     {
//       label: "Delete",
//       icon: <FaTrashAlt />,
//       Click: (value) => {
//         if (!value) return;
//         deleteAdmin({ url: `delete-admin`, id: value._id });
//       },
//     },
//   ];

//   if (pendinAdmins) return <FullPageSpinner />;

//   return (
//     <div className="mt-6 bg-background p-6 rounded-lg">
//       <h2 className="text-xl font-bold text-primary-dark mb-4">Admin List</h2>

//       {/* Search and Sorting Controls */}
//       <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search by any field..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 border rounded-md w-full md:w-1/3"
//         />
//         <div className="flex flex-col sm:flex-row gap-4 items-center">
//           {/* Sorting Dropdown */}
//           <select
//             value={sortColumn}
//             onChange={(e) => setSortColumn(e.target.value)}
//             className="p-2 border rounded-md"
//           >
//             {sortingOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 Sort by {option.label}
//               </option>
//             ))}
//           </select>
//           {/* Sorting Order Toggle */}
//           <button
//             onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
//             className="p-2 bg-primary-dark text-white rounded-md"
//           >
//             {sortOrder === "asc" ? "Ascending" : "Descending"}
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto min-h-[50vh] max-h-screen scrollbar-thin shadow-md">
//         <table className="min-w-full bg-white border rounded-md">
//           <thead className="bg-primary-dark text-white">
//             <tr>
//               <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/4">
//                 Name
//               </th>
//               <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/4">
//                 Email
//               </th>
//               <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/6">
//                 Phone
//               </th>
//               <th className="py-3 px-4 text-center text-sm uppercase font-semibold w-1/6">
//                 Created At
//               </th>
//               <th className="py-3 px-4 text-right text-sm uppercase font-semibold w-1/6">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAndSortedAdmins?.length > 0 ? (
//               filteredAndSortedAdmins.map((admin) => (
//                 <tr
//                   key={admin._id}
//                   className="border-b hover:bg-neutral-light transition duration-150"
//                 >
//                   <td className="py-3 px-4 flex items-center space-x-4 w-1/4">
//                     <img
//                       src={admin.image}
//                       alt={`${admin.firstname} ${admin.lastname}`}
//                       className="min-w-10 h-10 rounded-full border border-gray-300"
//                     />
//                     <span className="font-bold text-primary-dark">
//                       {admin.firstname} {admin.lastname}
//                     </span>
//                   </td>
//                   <td
//                     className="py-3 px-4 truncate w-1/4"
//                     style={{ maxWidth: "12rem" }}
//                   >
//                     {admin.email}
//                   </td>
//                   <td className="py-3 px-4 whitespace-nowrap w-1/6">
//                     {admin.cellno}
//                   </td>
//                   <td className="py-3 px-4 text-center w-1/6">
//                     {new Date(admin.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="py-3 px-4 relative text-end w-1/6">
//                     <Dropdown
//                       value={admin}
//                       items={dropdownItems}
//                       buttonClassName="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                       dropdownClassName="top-full right-0"
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="py-10 text-center align-middle text-gray-500"
//                 >
//                   No admins found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminsTable;
import { useState } from "react";
import { FaEdit, FaTrashAlt, FaEye, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dropdown from "../UI/DropDown";
import { useDeleteAdminMutate } from "../Hooks/Admin/useAdmin";
import { useAdminContext } from "../Hooks/AdminContext";
import FullPageSpinner from "../UI/Spinner";

const AdminsTable = () => {
  const navigate = useNavigate();
  const { admin } = useAdminContext();
  const { dataAdmins, pendinAdmins } = admin;
  const { deleteAdmin, isPendingDelete } = useDeleteAdminMutate();

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [sortColumn, setSortColumn] = useState("firstname"); // State for selected sorting column
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

  const sortingOptions = [
    { label: "Name", value: "firstname" },
    { label: "Email", value: "email" },
    { label: "Phone", value: "cellno" },
  ];

  // Sort and filter data
  const filteredAndSortedAdmins = dataAdmins?.admins
    ?.filter((admin) =>
      Object.values(admin).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (a[sortColumn].toLowerCase() < b[sortColumn].toLowerCase()) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[sortColumn].toLowerCase() > b[sortColumn].toLowerCase()) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

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
      },
    },
  ];

  if (pendinAdmins) return <FullPageSpinner />;

  return (
    <div className="mt-6 bg-background p-6 rounded-lg">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Admin List</h2>

      {/* Search and Sorting Controls */}
      <div className="mb-4 flex flex-col lg:flex-row md:justify-between md:items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full  lg:w-[40%] px-4 py-2 text-lg rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-between lg:justify-end w-full items-center">
          <div className="relative">
            <select
              value={sortColumn}
              onChange={(e) => setSortColumn(e.target.value)}
              className="border rounded-full w-40 px-4 h-10 appearance-none pr-8"
            >
              {sortingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FaCaretDown className="h-4 w-4 text-gray-500" />
            </span>
          </div>
          <div className="flex sm:flex-row flex-col  gap-4">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className=" bg-primary-dark w-36   h-10  text-white rounded-full"
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </button>
            <button
              onClick={() => navigate("/admin")}
              className=" bg-primary-dark w-36 h-10  text-white rounded-full"
            >
              New Admin
            </button>
          </div>
          {/* Sorting Order Toggle */}
        </div>
      </div>

      <div className="overflow-x-auto min-h-[50vh] max-h-screen scrollbar-thin shadow-md rounded-lg ">
        <table className="min-w-full bg-white border ">
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
                Created At
              </th>
              <th className="py-3 px-4 text-right text-sm uppercase font-semibold w-1/6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedAdmins?.length > 0 ? (
              filteredAndSortedAdmins.map((admin) => (
                <tr
                  key={admin._id}
                  className="border-b hover:bg-neutral-light transition duration-150"
                >
                  <td className="py-3 px-4 flex items-center space-x-4 w-1/4">
                    <img
                      src={admin.image}
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
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 relative text-end w-1/6">
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
                  No admins found
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
