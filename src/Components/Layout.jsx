import Home from "../Pages/Home";
import Navbar from "../UI/Navbar";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1440px] mx-auto w-[90%]">
        <Home />
      </div>
    </div>
  );
}

export default Layout;
