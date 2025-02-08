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
  FaPlus,
  FaHome,
  FaTrashAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useEffect } from "react";
import FullPageSpinner from "../UI/Spinner";

function ViewAdmin() {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const { admin } = useAdminContext();

  // Service Station Hooks
  const { deleteStationMutate, isPendingDelete } = useDeleteStations() || {};
  const { dataStations, pendinStation } = UsegetServiceStations() || {};
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
      <div className="   rounded-lg shadow-xl max-w-full md:max-w-[1440px] mx-auto">
        {/* flex flex-col md:flex-row gap-8 items-center */}
        <div className="flex flex-col-reverse rounded-lg  lg:grid lg:grid-cols-2  items-center bg-gradient-to-r from-gray-100 via-white to-gray-200">
          {/* Admin Info */}
          <div className="flex flex-col p-8 mt-20 sm:mt-10 gap-6 w-full items-center sm:items-start  max-w-2xl">
            <h2 className="text-primary-dark text-3xl md:text-4xl font-semibold mb-6 ">
              Admin Details
            </h2>
            <div className="flex flex-col sm:flex-row text-center s items-center gap-2">
              <div className="flex gap-2">
                <FaUserShield className="text-primary-dark text-xl" />
                <span className="font-semibold text-primary-dark">Name:</span>
              </div>
              <span className="text-primary text-xl font-medium">
                {currentAdmin.firstname} {currentAdmin.lastname}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex gap-2">
                <FaEnvelope className="text-primary-dark text-xl" />
                <span className="font-semibold text-primary-dark">Email:</span>
              </div>
              <span className="text-primary text-xl font-medium">
                {currentAdmin.email}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex gap-2">
                <FaPhone className="text-primary-dark text-xl" />
                <span className="font-semibold text-primary-dark">Phone:</span>
              </div>
              <span className="text-primary text-xl font-medium">
                {currentAdmin.cellno}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex gap-2">
                <FaUserShield className="text-primary-dark text-xl" />
                <span className="font-semibold text-primary-dark">Role:</span>
              </div>
              <span className="text-primary text-xl font-medium">
                {currentAdmin.role}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex gap-2">
                <FaCalendarAlt className="text-primary-dark text-xl" />
                <span className="font-semibold text-primary-dark">
                  Created At:
                </span>
              </div>
              <span className="text-primary text-xl flex text-center font-medium">
                {formatDate(currentAdmin.createdAt)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex gap-2">
                <FaCalendarAlt className="text-primary-dark text-xl" />
                <span className="font-semibold text-primary-dark">
                  Updated At:
                </span>
              </div>
              <span className="text-primary text-xl text-center font-medium">
                {formatDate(currentAdmin.updatedAt)}
              </span>
            </div>

            {/* Add Service Station Button */}
            <div className="mt-6 flex ">
              <button
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => navigate(`stations`)}
              >
                <FaPlus className="text-white" />
                Add Station
              </button>
            </div>
          </div>
          <div className="items-center  w-full justify-center sm:justify-end lg:justify-start lg:rounded-tl-none rounded-t-lg lg:rounded-tr-lg lg:rounded-r-lg  bg-primary flex h-full">
            <img
              src={currentAdmin.image || "https://via.placeholder.com/150"}
              alt={`${currentAdmin.firstname} ${currentAdmin.lastname}`}
              className="w-40 h-40  translate-y-[50%] lg:translate-y-0   sm:-translate-x-[50%] rounded-full border-4 border-white shadow-lg transform transition duration-500 hover:scale-110 hover:shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Service Stations Section */}
      <div className="mt-10  p-4 md:p-8  max-w-full md:max-w-[1440px] mx-auto">
        <h3 className="text-primary-dark text-xl md:text-2xl font-bold mb-6 ">
          Service Stations
        </h3>
        {dataStations && dataStations.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {dataStations.map((station) => (
              // <div
              //   key={station._id}
              //   className="p-4 md:p-6 border rounded-lg shadow-md bg-gradient-to-r from-primary-light to-primary-dark text-white relative transform transition-transform duration-300 hover:scale-105"
              // >
              //   {/* Top-right Delete Icon */}
              //   <button
              //     disabled={isPendingDelete}
              //     title="Delete Station"
              //     className="absolute -top-1 -right-1 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition duration-300"
              //     onClick={() => delFunction(station._id)}
              //   >
              //     <FaTrashAlt className="h-5 w-5" />
              //   </button>

              //   {/* Station Image */}
              //   <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
              //     <img
              //       src={station.image}
              //       alt={station.name}
              //       className="w-full h-full object-cover"
              //     />
              //   </div>

              //   {/* Station Details */}
              //   <h4 className="font-bold text-xl mb-2">{station.name}</h4>
              //   <p className="mb-2">{station.location}</p>
              //   <p className="mb-4">{station.address}</p>

              //   {/* Station Actions */}
              //   <div className="flex flex-col sm:flex-row gap-4 items-center">
              //     <ButtonShin
              //       text="Packages"
              //       onClick={() => navigate(`services/${station._id}`)}
              //     />
              //     <ButtonShin
              //       text="Users"
              //       onClick={() => navigate(`registerUsers/${station._id}`)}
              //     />
              //   </div>
              // </div>
              <div
                key={station._id}
                className="station-card md:min-w-[32rem]  min-w-full  bg-white  shadow-lg flex flex-col rounded-xl p-6 relative transition-transform border border-white/20"
              >
                <button
                  disabled={isPendingDelete}
                  title="Delete Station"
                  className="absolute top-2 right-2 bg-primary text-white p-2 rounded-full shadow-md hover:bg-red-800 transition duration-300"
                  onClick={() => delFunction(station._id)}
                >
                  <FaTrashAlt className="h-5 w-5" />
                </button>
                <div className="flex flex-col  sm:flex-row items-center gap-4">
                  <img
                    src={station.image} // Replace with the appropriate image path
                    alt="Logo"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary-dark object-cover"
                  />
                  <div className="mt-3 space-y-3 text-center md:text-left">
                    <h3 className="text-xl font-bold  text-primary-dark flex  gap-3 justify-center md:justify-start">
                      <FaHome className="text-lg mt-1 shrink-0" />
                      <span className="leading-tight">{station.name}</span>
                    </h3>

                    <div className="space-y-2 flex flex-col items-center sm:items-start  sm:pl-8 border-l-2 border-primary-light/30">
                      <p className="text-base text-neutral-dark flex  sm:items-center gap-3">
                        <FaMapMarkerAlt className="text-sm shrink-0" />
                        <span className="font-medium">{station.location}</span>
                      </p>

                      <p className="text-sm text-neutral-default leading-relaxed">
                        {station.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center sm:flex-row gap-2 mt-2">
                  <button
                    onClick={() => navigate(`services/${station._id}`)}
                    className="w-full h-[40px] bg-primary hover:bg-primary-dark text-white sm:font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors text-sm shadow-md"
                  >
                    Packages
                  </button>
                  <button
                    onClick={() => navigate(`registerUsers/${station._id}`)}
                    className="w-full h-[40px] bg-primary hover:bg-primary-dark text-white sm:font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors text-sm shadow-md"
                  >
                    View Users
                  </button>
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
