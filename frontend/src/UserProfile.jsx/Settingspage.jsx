import React, { useState } from "react";

const Settingspage = () => {
  const [profile, setProfile] = useState({
    profileImage: "https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-landscape-jpg-wallpapers-free-download-image_2573540.jpg", // Default profile image
    firstName: "Aman",
    lastName: "Kumar",
    // username: "aman123",
    email: "aman@123",
    bio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="  rounded-lg p-8 flex gap-8 w-3/4">
        {/* Left Section: Profile Image */}
        <div className="flex flex-col items-center gap-4 w-1/3">
          <div className="relative">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="rounded-full w-32 h-32 border border-gray-300 object-cover"
            />
            <input
              type="file"
              id="uploadProfileImage"
              className="hidden mb-4"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="uploadProfileImage"
              className="absolute bottom-0 left-8 bg-gray-200 text-gray-600 px-4 py-1 rounded-full cursor-pointer hover:bg-gray-300"
            >
              Upload
            </label>
          </div>
        </div>

        {/* Right Section: Profile Form */}
        <div className="w-2/3">
          <h2 className="text-lg font-bold mb-6">Edit Profile</h2>
          <form className="flex flex-col gap-4 bg-slate-100">
            {/* First Name */}
            <div className="form-control w-full">
              <label className="input-group">
                <span className="bg-gray-200">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="input input-bordered w-full bg-slate-200"
                />
              </label>
            </div>

            {/* LAst NAme */}
            <div className="form-control w-full">
              <label className="input-group">
                <span className="bg-gray-200">
                  <i className="fas fa-at"></i>
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  placeholder="lastName"
                  className="input input-bordered w-full bg-slate-200"
                />
              </label>
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="input-group">
                <span className="bg-gray-200">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  readOnly
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="input input-bordered w-full bg-slate-200"
                />
              </label>
            </div>
          </form>
          <div>
            <button className=" mt-4 ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settingspage;
