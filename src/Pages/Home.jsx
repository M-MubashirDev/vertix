import AdminsTable from "../Components/AdminsTable";

const Home = () => {
  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-4">Welcome</h1>
      <p className="text-lg text-neutral-dark mb-8">
        Here is an overview of the system:
      </p>

      <AdminsTable />
      <div className="flex flex-wrap justify-center gap-16 min-w-full  mb-12">
        {" "}
        {/* <AdminClientChart data={adminClientData} /> */}
      </div>
    </div>
  );
};

export default Home;
