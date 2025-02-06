// import { useNavigate, useParams } from "react-router-dom";
// import { useAdminContext } from "../Hooks/AdminContext";
// import {
//   useDeleteStations,
//   UsegetServiceStations,
// } from "../Hooks/Admin/useServiceStations";
// import {
//   FaEnvelope,
//   FaPhone,
//   FaUserShield,
//   FaCalendarAlt,
//   FaTrashAlt,
//   FaPlus,
// } from "react-icons/fa";
// import ButtonShin from "../UI/ButtonShin";
// import { useEffect } from "react";
// import FullPageSpinner from "../UI/Spinner";

// function ViewAdmin() {
//   const { adminId } = useParams();
//   const navigate = useNavigate();
//   const { admin } = useAdminContext();

//   // Service Station Hooks
//   const { deleteStationMutate, isPendingDelete } = useDeleteStations();
//   const { dataStations, pendinStation } = UsegetServiceStations();
//   console.log(dataStations, "😎😎");
//   useEffect(() => {
//     console.log(dataStations);
//   }, [dataStations]);

//   // Admin Data
//   const { dataAdmins, pendinAdmins } = admin;
//   const { admins } = dataAdmins || {};
//   const currentAdmin = admins?.filter((val) => val._id === adminId)[0];

//   // Delete Station Function
//   function delFunction(stationId) {
//     console.log("functions");
//     deleteStationMutate({ url: "service-station", id: stationId });
//   }

//   // Date Formatter
//   const formatDate = (isoDate) => new Date(isoDate).toLocaleString();

//   // Handle No Admin Case
//   if (!currentAdmin) {
//     return (
//       <div className="bg-background p-6 rounded-md max-w-[1440px] mx-auto">
//         <h2 className="text-primary-dark text-2xl font-bold mb-4">
//           Admin Details
//         </h2>
//         <p className="text-primary-dark">No admin data available.</p>
//       </div>
//     );
//   }
//   if (pendinStation || pendinAdmins) <FullPageSpinner />;

//   return (
//     <div className="py-8">
//       {/* Admin Details Section */}
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-[1440px] mx-auto">
//         <h2 className="text-primary-dark text-3xl font-bold mb-6 text-center">
//           Admin Details
//         </h2>
//         <div className="flex flex-col md:flex-row gap-8 items-center">
//           {/* Admin Profile Image */}
//           <div className="flex-shrink-0">
//             <img
//               src={currentAdmin.image || "https://via.placeholder.com/150"}
//               alt={`${currentAdmin.firstname} ${currentAdmin.lastname}`}
//               className="w-32 h-32 rounded-full border-4 border-primary shadow-md transition-transform duration-300 hover:scale-110"
//             />
//           </div>

//           {/* Admin Info */}
//           <div className="flex flex-col gap-4 w-full">
//             <div className="flex items-center gap-4">
//               <FaUserShield className="text-primary-dark text-lg" />
//               <span className="font-semibold text-primary-dark">Name:</span>
//               <span className="text-primary text-lg font-medium">
//                 {currentAdmin.firstname} {currentAdmin.lastname}
//               </span>
//             </div>

//             <div className="flex items-center gap-4">
//               <FaEnvelope className="text-primary-dark text-lg" />
//               <span className="font-semibold text-primary-dark">Email:</span>
//               <span className="text-primary text-lg font-medium">
//                 {currentAdmin.email}
//               </span>
//             </div>

//             <div className="flex items-center gap-4">
//               <FaPhone className="text-primary-dark text-lg" />
//               <span className="font-semibold text-primary-dark">Phone:</span>
//               <span className="text-primary text-lg font-medium">
//                 {currentAdmin.cellno}
//               </span>
//             </div>

//             <div className="flex items-center gap-4">
//               <FaUserShield className="text-primary-dark text-lg" />
//               <span className="font-semibold text-primary-dark">Role:</span>
//               <span className="text-primary text-lg font-medium">
//                 {currentAdmin.role}
//               </span>
//             </div>

//             <div className="flex items-center gap-4">
//               <FaCalendarAlt className="text-primary-dark text-lg" />
//               <span className="font-semibold text-primary-dark">
//                 Created At:
//               </span>
//               <span className="text-primary text-lg font-medium">
//                 {formatDate(currentAdmin.createdAt)}
//               </span>
//             </div>

//             <div className="flex items-center gap-4">
//               <FaCalendarAlt className="text-primary-dark text-lg" />
//               <span className="font-semibold text-primary-dark">
//                 Updated At:
//               </span>
//               <span className="text-primary text-lg font-medium">
//                 {formatDate(currentAdmin.updatedAt)}
//               </span>
//             </div>

//             {/* Add Service Station Button */}
//             <div className="mt-4">
//               <button
//                 className="flex items-center gap-2 bg-primary text-white px-4 py-4 rounded-[5rem] shadow-md hover:bg-primary-dark transition duration-300"
//                 onClick={() => navigate(`stations`)}
//               >
//                 <FaPlus className="text-white" />
//                 Add Station
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Service Stations Section */}
//       <div className="mt-10 bg-white p-8 rounded-lg shadow-lg max-w-[1440px] mx-auto">
//         <h3 className="text-primary-dark text-2xl font-bold mb-6 text-center">
//           Service Stations
//         </h3>
//         {dataStations && dataStations.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {dataStations.map((station) => (
//               <div
//                 key={station._id}
//                 className="p-6 border rounded-lg shadow-md bg-gradient-to-r from-primary-light to-primary-dark text-white relative transform transition-transform duration-300"
//               >
//                 {/* Top-right Delete Icon */}
//                 <button
//                   disabled={isPendingDelete}
//                   title="Delete Station"
//                   className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition duration-300"
//                   onClick={() => delFunction(station._id)}
//                 >
//                   <FaTrashAlt className="h-5 w-5" />
//                 </button>

//                 {/* Station Image */}
//                 <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
//                   <img
//                     src={station.image}
//                     alt={station.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Station Details */}
//                 <h4 className="font-bold text-xl mb-2">{station.name}</h4>
//                 <p className="mb-2">{station.location}</p>
//                 <p className="mb-4">{station.address}</p>

//                 {/* Station Actions */}
//                 <div className="flex gap-4 items-center">
//                   <ButtonShin
//                     text="View Packages"
//                     onClick={() => navigate(`services/${station._id}`)}
//                   />
//                   <ButtonShin
//                     text="View Users"
//                     onClick={() => navigate(`registerUsers/${station._id}`)}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">
//             No service stations available.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ViewAdmin;
import { useNavigate, useParams } from "react-router-dom";
import { useAdminContext } from "../Hooks/AdminContext";
import {
  useDeleteStations,
  UsegetServiceStations,
} from "../Hooks/Admin/useServiceStations";
import {
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCalendarAlt,
  FaTrashAlt,
  FaPlus,
} from "react-icons/fa";
import ButtonShin from "../UI/ButtonShin";
import { useEffect } from "react";
import FullPageSpinner from "../UI/Spinner";

function ViewAdmin() {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const { admin } = useAdminContext();

  // Service Station Hooks
  const { deleteStationMutate, isPendingDelete } = useDeleteStations();
  const { dataStations, pendinStation } = UsegetServiceStations();
  console.log(dataStations, "😎😎");
  useEffect(() => {
    console.log(dataStations);
  }, [dataStations]);

  // Admin Data
  const { dataAdmins, pendinAdmins } = admin;
  const { admins } = dataAdmins || {};
  const currentAdmin = admins?.filter((val) => val._id === adminId)[0];

  // Delete Station Function
  function delFunction(stationId) {
    console.log("functions");
    deleteStationMutate({ url: "service-station", id: stationId });
  }

  // Date Formatter
  const formatDate = (isoDate) => new Date(isoDate).toLocaleString();

  // Handle No Admin Case
  if (!currentAdmin) {
    return (
      <div className="bg-background p-6 rounded-md max-w-full md:max-w-[1440px] mx-auto px-4">
        <h2 className="text-primary-dark text-2xl font-bold mb-4">
          Admin Details
        </h2>
        <p className="text-primary-dark">No admin data available.</p>
      </div>
    );
  }
  if (pendinStation || pendinAdmins) return <FullPageSpinner />;

  return (
    <div className="py-8 px-4">
      {/* Admin Details Section */}
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-full md:max-w-[1440px] mx-auto">
        <h2 className="text-primary-dark text-2xl md:text-3xl font-bold mb-6 text-center">
          Admin Details
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Admin Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={currentAdmin.image || "https://via.placeholder.com/150"}
              alt={`${currentAdmin.firstname} ${currentAdmin.lastname}`}
              className="w-32 h-32 rounded-full border-4 border-primary shadow-md transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Admin Info */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex gap-2">
                <FaUserShield className="text-primary-dark text-lg" />
                <span className="font-semibold text-primary-dark">Name:</span>
              </div>
              <span className="text-primary text-lg font-medium">
                {currentAdmin.firstname} {currentAdmin.lastname}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex gap-2">
                <FaEnvelope className="text-primary-dark text-lg" />
                <span className="font-semibold text-primary-dark">Email:</span>
              </div>
              <span className="text-primary text-lg font-medium">
                {currentAdmin.email}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex gap-2">
                <FaPhone className="text-primary-dark text-lg" />
                <span className="font-semibold text-primary-dark">Phone:</span>
              </div>
              <span className="text-primary text-lg font-medium">
                {currentAdmin.cellno}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex gap-2">
                <FaUserShield className="text-primary-dark text-lg" />
                <span className="font-semibold text-primary-dark">Role:</span>
              </div>
              <span className="text-primary text-lg font-medium">
                {currentAdmin.role}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex gap-2">
                <FaCalendarAlt className="text-primary-dark text-lg" />
                <span className="font-semibold text-primary-dark">
                  Created At:
                </span>
              </div>
              <span className="text-primary text-lg font-medium">
                {formatDate(currentAdmin.createdAt)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex gap-2">
                <FaCalendarAlt className="text-primary-dark text-lg" />
                <span className="font-semibold text-primary-dark">
                  Updated At:
                </span>
              </div>
              <span className="text-primary text-lg font-medium">
                {formatDate(currentAdmin.updatedAt)}
              </span>
            </div>

            {/* Add Service Station Button */}
            <div className="mt-4">
              <button
                className="flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-[5rem] shadow-md hover:bg-primary-dark transition duration-300"
                onClick={() => navigate(`stations`)}
              >
                <FaPlus className="text-white" />
                Add Station
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Stations Section */}
      <div className="mt-10 bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-full md:max-w-[1440px] mx-auto">
        <h3 className="text-primary-dark text-xl md:text-2xl font-bold mb-6 text-center">
          Service Stations
        </h3>
        {dataStations && dataStations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataStations.map((station) => (
              <div
                key={station._id}
                className="p-4 md:p-6 border rounded-lg shadow-md bg-gradient-to-r from-primary-light to-primary-dark text-white relative transform transition-transform duration-300 hover:scale-105"
              >
                {/* Top-right Delete Icon */}
                <button
                  disabled={isPendingDelete}
                  title="Delete Station"
                  className="absolute -top-1 -right-1 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition duration-300"
                  onClick={() => delFunction(station._id)}
                >
                  <FaTrashAlt className="h-5 w-5" />
                </button>

                {/* Station Image */}
                <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={station.image}
                    alt={station.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Station Details */}
                <h4 className="font-bold text-xl mb-2">{station.name}</h4>
                <p className="mb-2">{station.location}</p>
                <p className="mb-4">{station.address}</p>

                {/* Station Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <ButtonShin
                    text="Packages"
                    onClick={() => navigate(`services/${station._id}`)}
                  />
                  <ButtonShin
                    text="Users"
                    onClick={() => navigate(`registerUsers/${station._id}`)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No service stations available.
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewAdmin;
