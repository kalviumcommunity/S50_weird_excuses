import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ username, profilePhoto }) => {
    const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("username");
    navigate("/")
    

    console.log("Logout successful");
  };

  return (
    <div className="profile-block">
      <div className="profile-info">
        <div className="flex items-center">
          {profilePhoto && (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4"
            />
          )}
          <div>
            <p className="text-lg font-semibold">{username}</p>
            <button
              onClick={handleLogout}
              className="mt-2 bg-red-400 hover:bg-red-500 text-white font-normal py-1 px-1 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
