const logoUrl = "https://res.cloudinary.com/dqoeyomtf/image/upload/v1779458623/logo_tctgtx.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="w-15 h-15 overflow-hidden">
        <img
          src={logoUrl}
          alt="PETSVETA LOGO"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="font-bold text-sky-800 text-xl">PetsVeta</h1>
        <p>Care, Connect, Cure</p>
      </div>
    </div>
  );
};

export default Logo;