import { useNavigate } from "react-router-dom";

function APageHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-stone-800 to-stone-600 text-white mt-16 py-4 px-4 md:px-20 flex justify-between items-center">
      
      <h1 className="text-xl md:text-xl font-semibold">
        Anonymous Support
      </h1>

      <p className="text-sm md:text-base opacity-90">
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer hover:underline hover:text-orange-600 transition"
        >
          Home
        </span>{" "}
        &gt; Anonymous Support
      </p>

    </div>
  );
}

export default APageHeader;