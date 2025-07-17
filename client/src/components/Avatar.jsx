// import React, { useState } from 'react';
// import { User, LogOut, Settings, Bell, ChevronRight, Mail, Shield, Heart, Star } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContexts';

// const Avatar = ({ userData }) => {
//     const navigate = useNavigate();
//     const { logout } = useAuth();

//     const [open, setOpen] = useState(false);
//     if (!userData) return null;

//     const handleLogout = () => {
//         logout();
//         navigate('/');
//     }

//     return (
//         <div className="relative">
//             <button
//                 onClick={() => setOpen(!open)}
//                 className="relative w-12 h-12 bg-white border-none rounded-full cursor-pointer transition-all shadow-md overflow-hidden hover:scale-110 hover:rotate-3"
//             >
//                 <img
//                     src={userData.picture || "/assets/user.png"}
//                     alt={`${userData.userName !== "" ? userData.userName : "User Name"}'s Profile`}
//                     referrerPolicy="no-referrer"
//                     className="w-full h-full object-cover rounded-full"
//                 />
//             </button>


//             {open && (
//                 <div className="absolute right-0 top-16 w-96 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden z-[1000] animate-slideIn">
//                     {/* Decorative elements */}
//                     <div className="absolute top-0 left-0 w-full h-full">
//                         <div className="absolute top-4 right-6 w-8 h-8 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-sm"></div>
//                         <div className="absolute top-12 right-12 w-4 h-4 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 rounded-full blur-sm"></div>
//                         <div className="absolute bottom-20 left-8 w-6 h-6 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-sm"></div>
//                     </div>

//                     {/* Header with enhanced styling */}
//                     <div className="relative p-8 bg-gradient-to-r from-violet-100/40 via-fuchsia-100/40 to-pink-100/40 border-b border-violet-200/30">
//                         <div className="flex items-center gap-5">
//                             <div className="relative">
//                                 <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-3 border-white/60 bg-gradient-to-br from-violet-200 to-pink-200 p-1">
//                                     <img
//                                         src={userData.picture || "./assets/user.png"}
//                                         onError={(e) => {
//                                             e.target.onerror = null; // Prevent loop
//                                             e.target.src = "./assets/user.png";
//                                         }}
//                                         alt={`${userData.userName != "" ? userData.userName : "User Name"}'s Profile`}
//                                         referrerPolicy="no-referrer"
//                                         className="w-full h-full object-cover rounded-full"
//                                     />
//                                 </div>
//                                 {/*
//                                     <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-3 border-white shadow-md flex items-center justify-center">
//                                         <Heart size={10} className="text-white" />
//                                     </div>
//                                     */}
//                             </div>
//                             <div className="flex-1">
//                                 <div className="flex items-center gap-2 mb-1">
//                                     <h3 className="text-xl text-black font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text ">
//                                         {userData.userName != "" ? userData.userName : "User Name"}
//                                     </h3>
//                                     <Star size={16} className="text-yellow-500 fill-yellow-500" />
//                                 </div>
//                                 <p className="text-sm text-gray-600 mb-2">{userData.email != "" ? userData.email : "User Email"}</p>
//                                 {/*
//                                     <div className="flex items-center gap-2">
//                                         <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full shadow-md">
//                                             <Star size={10} className="fill-white" />
//                                             Premium
//                                         </span>
//                                         <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-violet-600 bg-violet-100/60 rounded-full">
//                                             <Heart size={10} className="fill-violet-600" />
//                                             VIP
//                                         </span>
//                                     </div>
//                                     */}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Menu items with enhanced styling */}
//                     <div className="py-3 relative">
//                         <Link to="/profile" state={userData} className="group flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-violet-50/80 hover:to-fuchsia-50/80 transition-all duration-300 border-b border-violet-100/20">
//                             <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-100 to-violet-200 mr-4 group-hover:scale-110 transition-transform shadow-sm">
//                                 <User size={20} className="text-violet-600" />
//                             </div>
//                             <div className="flex-1">
//                                 <div className="font-semibold text-md text-gray-800 group-hover:text-violet-700">Your Profile</div>
//                                 <div className="text-xs text-gray-500">Manage your account</div>
//                             </div>
//                             <ChevronRight size={16} className="text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-violet-500" />
//                         </Link>
//                         {/*
//                             <a href="/settings" className="group flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-cyan-50/80 transition-all duration-300 border-b border-violet-100/20">
//                                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 mr-4 group-hover:scale-110 transition-transform shadow-sm">
//                                     <Settings size={20} className="text-blue-600" />
//                                 </div>
//                                 <div className="flex-1">
//                                     <div className="font-semibold text-sm text-gray-800 group-hover:text-blue-700">Settings</div>
//                                     <div className="text-xs text-gray-500">Preferences & privacy</div>
//                                 </div>
//                                 <ChevronRight size={16} className="text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-500" />
//                             </a>

//                             <a href="/notifications" className="group flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-yellow-50/80 hover:to-orange-50/80 transition-all duration-300 border-b border-violet-100/20">
//                                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 mr-4 group-hover:scale-110 transition-transform shadow-sm">
//                                     <Bell size={20} className="text-yellow-600" />
//                                 </div>
//                                 <div className="flex-1">
//                                     <div className="font-semibold text-sm text-gray-800 group-hover:text-yellow-700">Notifications</div>
//                                     <div className="text-xs text-gray-500">3 new messages</div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-sm"></div>
//                                     <ChevronRight size={16} className="text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-yellow-500" />
//                                 </div>
//                             </a>

//                             <a href="/messages" className="group flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-green-50/80 hover:to-emerald-50/80 transition-all duration-300 border-b border-violet-100/20">
//                                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 mr-4 group-hover:scale-110 transition-transform shadow-sm">
//                                     <Mail size={20} className="text-emerald-600" />
//                                 </div>
//                                 <div className="flex-1">
//                                     <div className="font-semibold text-sm text-gray-800 group-hover:text-emerald-700">Messages</div>
//                                     <div className="text-xs text-gray-500">Chat with team</div>
//                                 </div>
//                                 <ChevronRight size={16} className="text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-emerald-500" />
//                             </a>

//                             <a href="/security" className="group flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-slate-50/80 hover:to-gray-50/80 transition-all duration-300 border-b border-violet-100/20">
//                                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 mr-4 group-hover:scale-110 transition-transform shadow-sm">
//                                     <Shield size={20} className="text-slate-600" />
//                                 </div>
//                                 <div className="flex-1">
//                                     <div className="font-semibold text-sm text-gray-800 group-hover:text-slate-700">Security</div>
//                                     <div className="text-xs text-gray-500">Password & 2FA</div>
//                                 </div>
//                                 <ChevronRight size={16} className="text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-slate-500" />
//                             </a>
//                             */}

//                         {/* Decorative divider */}
//                         <div className="my-4 mx-8 relative">
//                             <div className="border-t border-gradient-to-r from-transparent via-violet-200/50 to-transparent"></div>
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 <div className="w-6 h-6 bg-gradient-to-br from-violet-100 to-pink-100 rounded-full border border-white shadow-sm"></div>
//                             </div>
//                         </div>

//                         <a href="/" onClick={handleLogout} className="group flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-pink-50/80 transition-all duration-300 text-red-600">
//                             <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 mr-4 group-hover:scale-110 transition-transform shadow-sm">
//                                 <LogOut size={20} className="text-red-600" />
//                             </div>
//                             <div className="flex-1">
//                                 <div className="font-semibold text-sm group-hover:text-red-700">Log Out</div>
//                                 <div className="text-xs text-red-400">Sign out of account</div>
//                             </div>
//                             <ChevronRight size={16} className="text-red-400 transition-all group-hover:translate-x-1 group-hover:text-red-500" />
//                         </a>
//                     </div>

//                     {/* Bottom decoration */}
//                     <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-violet-300/30 via-fuchsia-300/30 to-pink-300/30"></div>
//                 </div>
//             )}

//             {open && (
//                 <div
//                     className="fixed inset-0 z-[999]"
//                     onClick={() => setOpen(false)}
//                 ></div>
//             )}
//         </div>
//     );
// };

// export default Avatar;

import React, { useState } from 'react';
import { User, LogOut, Settings, Bell, ChevronRight, Mail, Shield, Heart, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import { X, Zap } from 'lucide-react';
import UserImage  from '../assets/user.png'

const Avatar = ({ userData }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [open, setOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!userData) return null;

    const handleLogout = () => {
        setShowConfirm(true);
    };

    const confirmLogout = () => {
        setIsLoading(true); // ✅ Trigger loading state

        // Simulate async logout or handle it
        setTimeout(() => {
            logout(); // <- your actual logout function from context
            navigate('/');
        }, 1500); // Optional delay for demonstration
    };

    const cancelLogout = () => {
        setShowConfirm(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="relative w-12 h-12 bg-white border-none rounded-full cursor-pointer transition-all shadow-md overflow-hidden hover:scale-110 hover:rotate-3"
            >
                <img
                    src={userData.picture || UserImage}
                    alt={`${userData.userName !== "" ? userData.userName : "User Name"}'s Profile`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                />
            </button>

            {open && (
                <div className="absolute right-0 top-16 w-96 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden z-[1000] animate-slideIn">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-4 right-6 w-8 h-8 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-sm"></div>
                        <div className="absolute top-12 right-12 w-4 h-4 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 rounded-full blur-sm"></div>
                        <div className="absolute bottom-20 left-8 w-6 h-6 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-sm"></div>
                    </div>

                    {/* Header */}
                    <div className="relative p-8 bg-gradient-to-r from-violet-100/40 via-fuchsia-100/40 to-pink-100/40 border-b border-violet-200/30">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-3 border-white/60 bg-gradient-to-br from-violet-200 to-pink-200 p-1">
                                    <img
                                        src={userData.picture || UserImage}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "./assets/user.png";
                                        }}
                                        alt={`${userData.userName !== "" ? userData.userName : "User Name"}'s Profile`}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl text-black font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text">
                                        {userData.userName !== "" ? userData.userName : "User Name"}
                                    </h3>
                                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{userData.email !== "" ? userData.email : "User Email"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="py-3 relative">
                        <Link to="/profile" state={userData} className="group flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-violet-50/80 hover:to-fuchsia-50/80 transition-all duration-300 border-b border-violet-100/20">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-100 to-violet-200 mr-4 group-hover:scale-110 transition-transform shadow-sm">
                                <User size={20} className="text-violet-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-md text-gray-800 group-hover:text-violet-700">Your Profile</div>
                                <div className="text-xs text-gray-500">Manage your account</div>
                            </div>
                            <ChevronRight size={16} className="text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-violet-500" />
                        </Link>

                        {/* Divider */}
                        <div className="my-4 mx-8 relative">
                            <div className="border-t border-gradient-to-r from-transparent via-violet-200/50 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 bg-gradient-to-br from-violet-100 to-pink-100 rounded-full border border-white shadow-sm"></div>
                            </div>
                        </div>

                        {/* Logout */}
                        <a href="/" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="group flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-pink-50/80 transition-all duration-300 text-red-600">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 mr-4 group-hover:scale-110 transition-transform shadow-sm">
                                <LogOut size={20} className="text-red-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm group-hover:text-red-700">Log Out</div>
                                <div className="text-xs text-red-400">Sign out of account</div>
                            </div>
                            <ChevronRight size={16} className="text-red-400 transition-all group-hover:translate-x-1 group-hover:text-red-500" />
                        </a>
                    </div>

                    {/* Bottom Decoration */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-violet-300/30 via-fuchsia-300/30 to-pink-300/30"></div>
                </div>
            )}

            {open && (
                <div
                    className="fixed inset-0 z-[999]"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* Logout Confirmation Modal */}
            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    {/* Fixed backdrop with subtle spotlight */}
                    <div
                        className="absolute inset-0 backdrop-blur-sm"
                        onClick={cancelLogout}
                        style={{
                            background: 'radial-gradient(circle at center, rgba(0,0,0,0.1), rgba(0,0,0,0.5))'
                        }}
                    />

                    {/* Glassmorphic Modal */}
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-500 border border-white/20 overflow-hidden">
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-sm pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={cancelLogout}
                            disabled={isLoading}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200/80 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <X size={18} />
                        </button>

                        {/* Content */}
                        <div className="relative p-10 text-center">
                            {/* Animated icon */}
                            <div className="relative w-20 h-20 mx-auto mb-8">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full animate-ping" />
                                <div className="absolute inset-2 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />

                                <div className="relative w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
                                    <LogOut size={32} className="text-black" />
                                </div>

                                {/* Mini floating icons */}
                                <Shield size={16} className="absolute -top-2 -right-2 text-blue-500 animate-bounce" style={{ animationDelay: '1s' }} />
                                <Zap size={16} className="absolute -bottom-2 -left-2 text-yellow-500 animate-bounce" style={{ animationDelay: '1.5s' }} />
                            </div>

                            {/* Title
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-black mb-4">
          Signout
        </h2>
         */}


                            {/* Message */}
                            <p className="text-gray-800 mb-8 leading-relaxed text-lg">
                                Are you sure you want to Log Out ?
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={cancelLogout}
                                    disabled={isLoading}
                                    className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105 border border-gray-200/50"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={confirmLogout}
                                    disabled={isLoading}
                                    className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-red-600 font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden"
                                >
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />

                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                                            <span className="whitespace-nowrap">Logout...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <LogOut size={18} className="relative" />
                                            <span className="relative">Logout</span>
                                        </>
                                    )}
                                </button>


                            </div>
                        </div>

                        {/* Bottom glow */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm" />
                    </div>
                </div>
            )}


        </div>
    );
};

export default Avatar;