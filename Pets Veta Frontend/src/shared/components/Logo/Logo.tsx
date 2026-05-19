import logoImage from "../../../assets/icons/Gemini_Generated_Image_34da4a34da4a34da-removebg-preview.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold text-cyan-600">
      {/* <div className="w-10 h-10 rounded-full  border-2 border-white"></div> */}
      <img
        src={logoImage}
        className="w-13 h-13 rounded-full border-danger border-2 object-cover"
        alt="logo error"
      />
      <h1>PetsVeta</h1>
    </div>
  );
};

export default Logo;
