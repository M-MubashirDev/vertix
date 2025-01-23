import { FaEye } from "react-icons/fa";

function ButtonShin({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="flex overflow-hidden border border-white  items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#264653] disabled:pointer-events-none disabled:opacity-50 bg-primary   text-white shadow hover:bg-white hover:text-[#264653] h-12 px-3 py-1 max-w-40 whitespace-pre group relative w-full justify-center gap-2 rounded-3xl transition-all duration-300 ease-out hover:ring-2 hover:ring-[#264653] hover:ring-offset-2"
    >
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
      <div className="flex items-center">
        <FaEye className="w-6 h-6 text-white group-hover:text-[#264653]" />
        <span className="ml-2">{text}</span>
      </div>
    </button>
  );
}

export default ButtonShin;
