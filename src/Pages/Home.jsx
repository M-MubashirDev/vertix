import AdminsTable from "../Components/AdminsTable";
import HeadingWithAnimation from "../UI/HeadingWithAnimation";

const Home = () => {
  return (
    <div className="p-6 bg-background min-h-screen">
      <HeadingWithAnimation />

      <AdminsTable />
      <div className="flex flex-wrap justify-center gap-16 min-w-full  mb-12">
        {" "}
        {/* <AdminClientChart data={adminClientData} /> */}
      </div>
    </div>
  );
};

export default Home;
