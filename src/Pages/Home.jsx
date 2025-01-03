import React from "react";
import AdminsTable from "../Components/AdminsTable";

const Home = () => {
  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-4">
        Welcome, SuperAdmin!
      </h1>
      <p className="text-lg text-neutral-dark mb-8">
        Here is an overview of the system:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h2 className="text-xl font-bold text-primary-dark">Total Admins</h2>
          <p className="text-3xl text-secondary">50</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h2 className="text-xl font-bold text-primary-dark">Total Clients</h2>
          <p className="text-3xl text-secondary">300</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold text-primary-dark">
            Recent Activities
          </h2>
          <ul className="list-disc list-inside mt-4 text-neutral-dark">
            <li>Admin John Doe created a new client</li>
            <li>Admin Jane Smith updated client details</li>
            <li>Client Smith booked a car wash service</li>
          </ul>
        </div>
      </div>

      <AdminsTable />
    </div>
  );
};

export default Home;
