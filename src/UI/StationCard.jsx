import { FaInstagram, FaTwitter, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

const StationCard = ({ admin }) => {
  return (
    <div className="flex items-center justify-center h-[294px] w-[240px] perspective-[800px] font-sans mx-auto">
      <div className="relative w-full h-full bg-black rounded-2xl transform transition-transform duration-[1500ms] transform-style-preserve-3d group hover:rotate-y-180">
        {/* Front */}
        <div className="absolute w-full h-full flex flex-col items-center justify-center gap-3 rounded-2xl shadow-md backface-hidden bg-primary-dark">
          <div className="flex items-center justify-center w-3/4 h-[10%] bg-transparent border-2 border-primary-light border-t-0 rounded-b-lg shadow-lg">
            <p className="text-white text-sm font-bold">Admin Profile</p>
          </div>
          <img
            src={admin.image || "https://via.placeholder.com/150"}
            alt={`${admin.firstname} ${admin.lastname}`}
            className="w-20 h-20 rounded-full border border-neutral-light"
          />
          <p className="text-lg font-bold text-white">
            {admin.firstname} {admin.lastname}
          </p>
          <p className="text-sm font-medium text-white">{admin.email}</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full flex flex-col items-center justify-center gap-5 rounded-2xl shadow-md backface-hidden bg-primary-light transform rotate-y-180">
          <p className="text-lg font-bold text-white">Contact</p>
          <div className="text-center">
            <p className="text-sm text-white">{admin.cellno}</p>
            <p className="text-sm text-white">{admin.role}</p>
          </div>
          <div className="flex flex-row gap-5 mt-5">
            <FaInstagram size={32} className="text-white hover:text-pink-500" />
            <FaTwitter size={32} className="text-white hover:text-blue-500" />
            <FaWhatsapp size={32} className="text-white hover:text-green-500" />
            <FaFacebook size={32} className="text-white hover:text-blue-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationCard;
