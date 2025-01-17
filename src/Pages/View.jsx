import { useParams } from "react-router-dom";
import { useAdminContext } from "../Hooks/AdminContext";
function View() {
  const { adminId } = useParams();
  const { admin } = useAdminContext();
  const { dataAdmins, pendinAdmins } = admin;
  const { admins } = dataAdmins || {};
  const currentAdmin = admins?.filter((val) => val._id === adminId)[0];
  console.log(currentAdmin);
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
  );
}

export default View;
