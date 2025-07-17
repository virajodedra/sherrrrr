import React from "react";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit, 
  LogOut,
  Settings,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation(); 
  const userData = location.state;
  const user = {
    name: userData.userName != null ? userData.userName : "User Name",
    email: userData.email != null ? userData.email : "User email",
    age: 21,
    bio: "Passionate web developer who loves building interactive user experiences with React and Tailwind CSS.",
    location: "Ahmedabad, India",
    avatar: userData.picture,
  };

  const iconWrapper =
    "p-3 rounded-xl text-white flex items-center justify-center transition-all duration-300";

  const cardWrapper =
    "rounded-2xl p-6 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1";

  return (

    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-[500px] h-[500px] bg-gradient-to-l from-blue-600/25 to-purple-600/25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-t from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-green-500/15 to-teal-500/15 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tr from-violet-500/25 to-pink-500/25 rounded-full blur-xl"></div>
      </div>

      {/* Main Container */}
      <div className="w-[90%] max-w-4xl h-[90%] relative">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-xl rounded-3xl border border-white/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-3xl"></div>

        {/* Content */}
        <div className="relative w-full h-full backdrop-blur-sm rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-black/10 p-6 relative backdrop-blur-lg border-b border-white/20">
            <div className="absolute inset-0 bg-white/5 rounded-t-3xl backdrop-blur-md" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img
                    src={user.avatar || "/assets/user.png"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/40 shadow-xl group-hover:border-white/60 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/10 transition-all duration-300"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-2xl">
                    {user.name}
                  </h1>
                  <p className="text-gray-300 drop-shadow-lg">Welcome back!</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 backdrop-blur-lg border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl group">
                  <Edit className="w-5 h-5 text-white drop-shadow group-hover:scale-110 transition-transform duration-200" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 backdrop-blur-lg border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl group">
                  <Settings className="w-5 h-5 text-white drop-shadow group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="p-6 space-y-6 h-[calc(100%-108px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className={cardWrapper}>
                <div className="flex items-center gap-4">
                  <div className={`${iconWrapper} bg-white/10 backdrop-blur-md shadow-lg border border-white/30 group-hover:bg-white/20 group-hover:scale-110`}>
                    <Mail className="w-6 h-6 drop-shadow-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium mb-1">Email</p>
                    <p className="text-white font-semibold drop-shadow-lg group-hover:text-gray-100 transition-colors">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Age */}
              <div className={`${cardWrapper} group`}>
                <div className="flex items-center gap-4">
                  <div className={`${iconWrapper} bg-white/10 backdrop-blur-md shadow-lg border border-white/30 group-hover:bg-white/20 group-hover:scale-110`}>
                    <Calendar className="w-6 h-6 drop-shadow-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium mb-1">Age</p>
                    <p className="text-white font-semibold drop-shadow-lg group-hover:text-gray-100 transition-colors">{user.age} years</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className={`${cardWrapper} md:col-span-2 group`}>
                <div className="flex items-center gap-4">
                  <div className={`${iconWrapper} bg-white/10 backdrop-blur-md shadow-lg border border-white/30 group-hover:bg-white/20 group-hover:scale-110`}>
                    <MapPin className="w-6 h-6 drop-shadow-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium mb-1">Location</p>
                    <p className="text-white font-semibold drop-shadow-lg group-hover:text-gray-100 transition-colors">{user.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className={`${cardWrapper} group`}>
              <div className="flex items-start gap-4">
                <div className={`${iconWrapper} bg-white/10 backdrop-blur-md shadow-lg border border-white/30 group-hover:bg-white/20 group-hover:scale-110`}>
                  <User className="w-6 h-6 drop-shadow-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300 font-medium mb-3">About Me</p>
                  <p className="text-gray-200 leading-relaxed drop-shadow-sm group-hover:text-gray-100 transition-colors">{user.bio}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/30 hover:border-white/50 backdrop-blur-lg transform hover:scale-105">
                Edit Profile
              </button>

              <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/15 text-white py-4 px-6 rounded-xl font-semibold border border-white/30 hover:border-white/50 transition-all duration-300 backdrop-blur-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transform hover:scale-105 group">
                <LogOut className="w-5 h-5 drop-shadow-lg group-hover:translate-x-1 transition-transform" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;