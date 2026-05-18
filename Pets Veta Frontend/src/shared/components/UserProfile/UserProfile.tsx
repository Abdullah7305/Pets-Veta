const UserProfile = () => {
  return (
    <div className="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/50"
        alt="user"
        className="w-12 h-12 rounded-full object-cover"
      />

      <div>
        <h3 className="font-semibold">Admin User</h3>
        <p className="text-sm text-gray-500">Administrator</p>
      </div>
    </div>
  );
};

export default UserProfile;
