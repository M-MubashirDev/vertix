import { useParams } from "react-router-dom";
import { useAdminContext } from "../Hooks/AdminContext";
import { UsegetServiceStations } from "../Hooks/Admin/useServiceStations";
function View() {
  const { adminId } = useParams();
  const { admin } = useAdminContext();
  const { dataStations, pendinStation } = UsegetServiceStations();
  const { dataAdmins, pendinAdmins } = admin;
  const { admins } = dataAdmins || {};
  const currentAdmin = admins?.filter((val) => val._id === adminId)[0];
  console.log(dataStations);
  if (!currentAdmin) {
    return (
      <div className="bg-background p-6 rounded-md max-w-[1440px] mx-auto">
        <h2 className="text-primary-dark text-2xl font-bold mb-4">
          Admin Details
        </h2>
        <p className="text-neutral-dark">No admin data available.</p>
      </div>
    );
  }

  const formatDate = (isoDate) => new Date(isoDate).toLocaleString();

  return (
    <div>
      <div className="bg-background p-6 rounded-md max-w-[1440px] mx-auto">
        <h2 className="text-primary-dark text-2xl font-bold mb-4">
          Admin Details
        </h2>
        <div className="flex flex-col space-y-6">
          {/* Display the Admin Image */}
          <div className="flex items-center">
            <img
              src={currentAdmin.image || "https://via.placeholder.com/150"}
              alt={`${currentAdmin.firstname} ${currentAdmin.lastname}`}
              className="w-24 h-24 rounded-full border border-neutral-light"
            />
          </div>

          {/* Display General Details */}
          <div>
            <span className="font-semibold text-neutral-dark">Name:</span>{" "}
            <span className="text-primary">
              {currentAdmin.firstname} {currentAdmin.lastname}
            </span>
          </div>
          <div>
            <span className="font-semibold text-neutral-dark">Email:</span>{" "}
            <span className="text-primary">{currentAdmin.email}</span>
          </div>
          <div>
            <span className="font-semibold text-neutral-dark">Phone:</span>{" "}
            <span className="text-primary">{currentAdmin.cellno}</span>
          </div>
          <div>
            <span className="font-semibold text-neutral-dark">Role:</span>{" "}
            <span className="text-primary">{currentAdmin.role}</span>
          </div>

          {/* Display Timestamps */}
          <div>
            <span className="font-semibold text-neutral-dark">Created At:</span>{" "}
            <span className="text-primary">
              {formatDate(currentAdmin.createdAt)}
            </span>
          </div>
          <div>
            <span className="font-semibold text-neutral-dark">Updated At:</span>{" "}
            <span className="text-primary">
              {formatDate(currentAdmin.updatedAt)}
            </span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-primary-dark text-xl font-bold mb-4">
          Service Stations
        </h3>
        {dataStations && dataStations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataStations.map((station) => (
              <div
                key={station._id}
                className="p-4 border rounded-md shadow-sm bg-white"
              >
                <h4 className="font-semibold text-primary">{station.name}</h4>
                <p className="text-neutral-dark">{station.location}</p>
                <p className="text-neutral-dark">{station.address}</p>
                <button
                  className="mt-2 px-4 py-2 bg-primary text-white rounded"
                  onClick={() => navigate(`/stations/${station._id}/services`)}
                >
                  View Services
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-dark">No service stations available.</p>
        )}
      </div>
    </div>
  );
}

export default View;
