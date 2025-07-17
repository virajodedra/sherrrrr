// import React, { useState } from 'react';
// import { FcGoogle } from 'react-icons/fc';
// import { FaGithub } from 'react-icons/fa';
// import { LuUser } from 'react-icons/lu';
// import { MdOutlineEmail } from 'react-icons/md';
// import { useAuth } from "../contexts/AuthContexts";
// import { useNavigate } from "react-router-dom";

// const AuthForm = () => {
//   const [isRegister, setIsRegister] = useState(true);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/login", {
//         email,
//         password,
//       });

//       const { token, user } = res.data;
//       login(user, token); // Update context and localStorage
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err.response?.data || "Login failed");
//       console.log(res.data)
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//         <div className="flex flex-col gap-4">
//           {/* Social Buttons */}
//           <button className="flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-100 transition ">
//             <FcGoogle size={20} />
//             Continue with Google
//           </button>
//           {/* <button className="flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-100 transition">
//             <FaGithub size={20} />
//             Continue with GitHub
//           </button> */}

//           {/* Divider */}
//           <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-2">
//             <span className="border-t flex-1"></span>
//             <span className="uppercase">or {isRegister ? 'Register' : 'Login'} with email</span>
//             <span className="border-t flex-1"></span>
//           </div>

//           {/* Input Fields */}
//           <form className='flex flex-col gap-4'>
//             {isRegister && (
//               <div className="relative">
//                 <LuUser className="absolute top-3.5 left-3 text-gray-400" size={18} />
//                 <input
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   type="text"
//                   placeholder="User Name"
//                   className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             )}

//             <div className="relative">
//               <MdOutlineEmail className="absolute top-3.5 left-3 text-gray-400" size={18} />
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 placeholder="Enter your email"
//                 className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             {/* Action Button */}
//             <button type='submit' className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-full transition">
//               {isRegister ? 'Register' : 'Login'}
//             </button>
//           </form>


//           {/* Toggle Link */}
//           <p className="text-center text-sm text-gray-500 mt-2">
//             {isRegister ? (
//               <>
//                 Already have an account?{' '}
//                 <button
//                   className="text-indigo-600 hover:underline"
//                   onClick={() => setIsRegister(false)}
//                 >
//                   Login
//                 </button>
//               </>
//             ) : (
//               <>
//                 Don’t have an account?{' '}
//                 <button
//                   className="text-indigo-600 hover:underline"
//                   onClick={() => setIsRegister(true)}
//                 >
//                   Register
//                 </button>
//               </>
//             )}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';
import { LuUser } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { useAuth } from "../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";// Import the OTP component
import OTPDemo from '../components/Otp';

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isRegister) {
      // For registration, open OTP popup
      setIsOTPOpen(true);
      setVerificationResult("");
    } else {
      // For login, proceed with normal login
      try {
        const res = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });

        const { token, user } = res.data;
        login(user, token);
        navigate("/dashboard");
      } catch (err) {
        console.error(err.response?.data || "Login failed");
      }
    }
  };

  const handleOTPComplete = async (otp) => {
    setIsLoading(true);
    setVerificationResult("🔄 Verifying OTP...");

    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setVerificationResult("✅ OTP verified successfully!");
        setIsOTPOpen(false);
        
        // After successful OTP verification, proceed with registration
        try {
          const registerRes = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          });

          const registerData = await registerRes.json();
          
          if (registerRes.ok) {
            const { token, user } = registerData;
            login(user, token);
            navigate("/dashboard");
          } else {
            setVerificationResult("❌ Registration failed. Please try again.");
          }
        } catch (err) {
          setVerificationResult("❌ Registration failed.");
        }
      } else {
        setVerificationResult("❌ Invalid OTP. Please try again.");
      }
    } catch (err) {
      setVerificationResult("❌ Verification failed.");
    }

    setIsLoading(false);
  };

  const handleResend = async () => {
    if (!email) {
      setVerificationResult("❗ Email is required to resend OTP");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to send OTP");

      setVerificationResult("📨 OTP sent successfully!");
      return Promise.resolve();
    } catch (err) {
      setVerificationResult("❌ Failed to send OTP.");
      return Promise.reject(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col gap-4">
          {/* Social Buttons */}
          <button className="flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-100 transition ">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-2">
            <span className="border-t flex-1"></span>
            <span className="uppercase">or {isRegister ? 'Register' : 'Login'} with email</span>
            <span className="border-t flex-1"></span>
          </div>

          {/* Input Fields */}
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            {isRegister && (
              <div className="relative">
                <LuUser className="absolute top-3.5 left-3 text-gray-400" size={18} />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="User Name"
                  className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}

            <div className="relative">
              <MdOutlineEmail className="absolute top-3.5 left-3 text-gray-400" size={18} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Action Button */}
            <button 
              type='submit' 
              className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-full transition"
              disabled={isLoading}
              
            >
              {isLoading ? 'Processing...' : (isRegister ? 'Sign Up' : 'Login')}
            </button>
          </form>

          {/* Verification Result */}
          {verificationResult && (
            <div
              className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                verificationResult.includes("✅")
                  ? "bg-green-100 text-green-800"
                  : verificationResult.includes("❌")
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {verificationResult}
            </div>
          )}

          {/* Toggle Link */}
          <p className="text-center text-sm text-gray-500 mt-2">
            {isRegister ? (
              <>
                Already have an account?{' '}
                <button
                  className="text-indigo-600 hover:underline"
                  onClick={() => setIsRegister(false)}
                  type="button"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  className="text-indigo-600 hover:underline"
                  onClick={() => setIsRegister(true)}
                  type="button"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* OTP Popup */}
      
    </div>
  );
};

export default AuthForm;