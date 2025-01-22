import { UsegetStationsUsers } from "../Hooks/Admin/useServiceStations";

function RegisterUserDetails() {
  const { dataStationUsers, pendingStationUsers } = UsegetStationsUsers();
  console.log(dataStationUsers);
  // Loading state
  if (pendingStationUsers) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-6 bg-background p-6 rounded-lg">
      <h2 className="text-xl font-bold text-primary-dark mb-4">User Details</h2>
      <div className="overflow-x-auto min-h-[50vh] max-h-screen scrollbar-thin shadow-md">
        <table className="min-w-full bg-white border rounded-md">
          <thead className="bg-primary-dark text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/5">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/5">
                Car Details
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/5">
                Number Plate
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/5">
                Owner Address
              </th>
              <th className="py-3 px-4 text-center text-sm uppercase font-semibold w-1/5">
                Station
              </th>
            </tr>
          </thead>
          <tbody>
            {dataStationUsers?.length > 0 ? (
              dataStationUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-neutral-light transition duration-150"
                >
                  <td className="py-3 px-4 w-1/5">
                    <span className="font-bold text-primary-dark">
                      {user.userId.firstname} {user.userId.lastname}
                    </span>
                  </td>
                  <td className="py-3 px-4 w-1/5">
                    <p className="font-medium">{user.carName}</p>
                    <p className="text-sm text-slate-400">
                      {user.carModel} | {user.carColor}
                    </p>
                  </td>
                  <td className="py-3 px-4 w-1/5">{user.carNumber}</td>
                  <td className="py-3 px-4 w-1/5">{user.ownerAddress}</td>
                  <td className="py-3 px-4 text-center w-1/5">
                    {user.serviceStationId.name}
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
                    No users found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegisterUserDetails;
