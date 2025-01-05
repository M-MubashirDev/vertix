// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const links = [
//     { name: "Manage Admins", path: "/admins" },
//     { name: "View Clients", path: "/clients" },
//   ];

//   return (
//     <nav className="bg-primary-dark text-white p-4 max-w-[1440px] mx-auto rounded-b-md w-[90%]">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-2xl font-bold">
//           <Link to="/" className="text-secondary-light">
//             LOGO
//           </Link>
//         </div>
//         <ul className="hidden md:flex space-x-8">
//           {links.map((link, index) => (
//             <li key={index}>
//               <Link
//                 to={link.path}
//                 className="hover:text-secondary-light transition duration-200"
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//         <button
//           className="md:hidden text-white hover:text-secondary-light"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//       </div>
//       {isMenuOpen && (
//         <ul className="md:hidden bg-primary-dark text-white p-4 space-y-2">
//           {links.map((link, index) => (
//             <li key={index}>
//               <Link
//                 to={link.path}
//                 className="block hover:text-primary-light transition duration-200"
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary-dark text-white p-4 max-w-[1440px] mx-auto rounded-b-md w-[90%]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-secondary-light">
            LOGO
          </Link>
        </div>
        <ul className="hidden md:flex space-x-8 items-center">
          {/* Add "Create New Admin" link */}
          <li>
            <Link
              to="/admin"
              className="flex items-center space-x-2 hover:text-neutral-light transition duration-200"
            >
              <FaUserPlus />
              <span>Create New Admin</span>
            </Link>
          </li>
        </ul>
        <button
          className="md:hidden text-white hover:text-secondary-light"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
      {isMenuOpen && (
        <ul className="md:hidden bg-primary-dark text-white p-4 space-y-2">
          {/* Add "Create New Admin" link for mobile */}
          <li>
            <Link
              to="admin"
              className="flex items-center space-x-2 hover:text-primary-light transition duration-200"
            >
              <FaUserPlus />
              <span>Create New Admin</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
