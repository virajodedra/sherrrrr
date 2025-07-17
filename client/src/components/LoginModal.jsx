// // components/LoginModal.js
// import { useMemo, useState } from 'react';
// import Modal from './Modal';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContexts';
// import { FcGoogle } from 'react-icons/fc';
// import { LuUser } from 'react-icons/lu';
// import { MdOutlineEmail } from 'react-icons/md';
// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import OTPDemo from './Otp';
// import { useNavigate } from 'react-router-dom';

// export default function LoginModal({ isOpen, onClose, setUserData }) {
//     const [isRegister, setIsRegister] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     // const [email, setEmail] = useState("");
//     // const [userName, setUserName] = useState("");
//     const { login, user, token } = useAuth();
//     const [showOtp, setShowOtp] = useState(false);
//     const navigate = useNavigate()

//     // const onSubmit = async (data) => {
//     //     // preventDefault();
//     //     try {
//     //         // const res = await axios.post("http://localhost:5000/login", {
//     //         //     userName: data.userName,
//     //         //     email: data.email
//     //         // });

//     //         console.log(data);



//     //         // const { token, user } = res.data;
//     //         // login(user, token); // Update context and localStorage
//     //         //   navigate("/dashboard");
//     //         onClose();
//     //     } catch (err) {
//     //         console.error(err.response?.data || "Login failed");
//     //     }
//     // };

//     const onSubmit = async (data) => {
//         try {
//             if (isRegister) {
//                 //  <OTPDemo/>
//                 // axios.post("http://localhost:7100/api/signup", data)
//                 //     .then(response => {
//                 //         console.log('User saved:', response.data);
//                 //         // login(response.data.user, response.data.token);
//                 //         // setUserData({
//                 //         //     userName: response.data.userName,
//                 //         //     email: response.data.email
//                 //         // })
//                 //     })
//                 //     .catch(error => {
//                 //         console.error('Error saving user:', error);
//                 //     })
//                 // handle user, token, login(), etc.

//             } else {
//                 axios.post("http://localhost:7100/api/login", data)
//                     .then(response => {
//                         console.log('User saved:', response.data);
//                         login(response.data.user, response.data.token);
//                         setUserData({
//                             userName: response.data.user.userName,
//                             email: response.data.user.email
//                         })
//                     })
//                     .catch(error => {
//                         console.error('Error saving user:', error);
//                     })
//                 // handle login
//             }
//             // setUserData({
//             //     userName: getValues("userName"), // backchodii 
//             //     email: getValues("email")
//             // })
//             onClose();
//         } catch (err) {
//             console.error(err.response?.data || "Authentication failed");
//         }
//     };

//     // const handleSuccess = (credentialResponse) => {
//     //     const token = credentialResponse.credential;
//     //     console.log("Google token:", token);

//     //     // 👉 Send token to your backend to verify and create a session
//     // };

//     const handleSuccess = useGoogleLogin({
//         onSuccess: async (tokenResponse) => {
//             console.log("Google token:", tokenResponse.access_token);
//             // 🔐 Optional: Send this token to your backend to verify and create a session

//             try {
//                 const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//                     headers: {
//                         Authorization: `Bearer ${tokenResponse.access_token}`,
//                     },
//                 });

//                 const userInfo = res.data;
//                 console.log("User Info:", userInfo);

//                 const userToSave = {
//                     name: userInfo.name,
//                     email: userInfo.email,
//                     picture: userInfo.picture,
//                     google_id: userInfo.sub
//                 };

//                 axios.post('http://localhost:7100/api/Google_login', userToSave)
//                     .then(response => {
//                         console.log('User saved:', response.data);
//                         login(response.data.user, response.data.token)
//                     })
//                     .catch(error => {
//                         console.error('Error saving user:', error);
//                     });

//                 // Now you have:
//                 // userInfo.email
//                 // userInfo.name
//                 // userInfo.picture

//                 // 🔐 Optionally: send this to your backend
//                 // await axios.post("/api/auth/google", userInfo);
//                 setUserData({
//                     userName: userToSave.name,
//                     email: userToSave.email,
//                     sub: userToSave.google_id,
//                     picture: userToSave.picture
//                 })
//                 onClose()
//             } catch (err) {
//                 console.error("Failed to fetch user info", err);
//             }

//         },
//         onError: (errorResponse) => {
//             console.error("Google login error:", errorResponse);
//         },
//         flow: "implicit", // or "auth-code" if you use a backend to exchange code
//     });

//     const handleError = () => {
//         console.error("Login Failed");
//     };

//     const registerSchema = yup.object({
//         userName: yup.string().required("Username is required"),
//         email: yup.string().email("Invalid email").required("Email is required"),
//     });

//     const loginSchema = yup.object({
//         email: yup.string().email("Invalid email").required("Email is required"),
//     });

//     const schema = useMemo(() => {
//         return isRegister ? registerSchema : loginSchema;
//     }, [isRegister]);



//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({
//         resolver: yupResolver(schema),
//     });


//     return (
//         <div>
//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <h2 className="text-2xl font-semibold mb-4">{isRegister ? "Sign Up" : "Login"}</h2>

//                 {/* 👇 Paste your login form here */}
//                 {/* <form> */}
//                 {/* YOUR LOGIN FORM CODE */}
//                 {/* </form> */}

//                 <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//                     <div className="flex flex-col gap-4">
//                         {/* Social Buttons */}
//                         <button onClick={handleSuccess} className="flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-100 transition group cursor-pointer">
//                             <FcGoogle size={20} className='group-hover:animate-[spin_0.8s_ease-in-out]' />
//                             Continue with Google
//                         </button>
//                         {/* <GoogleLogin onSuccess={handleSuccess} onError={handleError} /> */}
//                         {/* <button className="flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-100 transition">
//                     <FaGithub size={20} />
//                     Continue with GitHub
//                   </button> */}

//                         {/* Divider */}
//                         <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-2">
//                             <span className="border-t flex-1"></span>
//                             <span className="uppercase">or {isRegister ? 'Sign Up' : 'Login'} with email</span>
//                             <span className="border-t flex-1"></span>
//                         </div>

//                         {/* Input Fields */}
//                         <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
//                             {isRegister && (
//                                 <div className="relative">
//                                     <LuUser className="absolute top-3.5 left-3 text-gray-400" size={18} />
//                                     <input
//                                         {...register("userName")}
//                                         type="text"
//                                         placeholder="User Name"
//                                         className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     />
//                                     {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
//                                 </div>
//                             )}

//                             <div className="relative">
//                                 <MdOutlineEmail className="absolute top-3.5 left-3 text-gray-400" size={18} />
//                                 <input
//                                     {...register("email")}
//                                     type="email"
//                                     placeholder="Enter your email"
//                                     className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 />
//                                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//                             </div>

//                             {/* Action Button */}
//                             <button type='submit' className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-full transition cursor-pointer">
//                                 {isRegister ? 'Sign Up' : 'Login'}
//                             </button>
//                         </form>



//                         {/* Toggle Link */}
//                         <p className="text-center text-sm text-gray-500 mt-2">
//                             {isRegister ? (
//                                 <>
//                                     Already have an account?{' '}
//                                     <button
//                                         className="text-indigo-600 hover:underline cursor-pointer"
//                                         onClick={() => setIsRegister(false)}
//                                     >
//                                         Login
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     Don’t have an account?{' '}
//                                     <button
//                                         className="text-indigo-600 hover:underline cursor-pointer"
//                                         onClick={() => {
//                                             setIsRegister(true);
//                                             // navigate("/otp");
//                                         }}
//                                     >
//                                         Sign Up
//                                     </button>

//                                 </>
//                             )}
//                         </p>
//                     </div>
//                 </div>
//             </Modal>

//             {isRegister
//                 && isAuthenticated
//                 && <Modal isOpen={showOtp} onClose={() => setShowOtp(false)}>

//                 </Modal>
//             }
//         </div>
//     );
// }


// // import React from 'react';
// // import { useForm } from 'react-hook-form';
// // import { yupResolver } from '@hookform/resolvers/yup';
// // import * as yup from 'yup';

// // const schema = yup.object().shape({
// //   name: yup.string().required('Name is required'),
// //   email: yup.string().email('Invalid email').required('Email is required'),
// //   password: yup
// //     .string()
// //     .min(6, 'Password must be at least 6 characters')
// //     .required('Password is required'),
// // });

// // const RegisterForm = () => {
// //     const {
// //         register,
// //         handleSubmit,
// //         formState: { errors },
// //     } = useForm({
// //         resolver: yupResolver(schema),
// //     });

// //     const onSubmit = async (data) => {
// //         const res = await fetch('http://localhost:5000/api/register', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify(data),
// //         });

// //         const result = await res.json();
// //         alert(result.message);
// //     };

// //     return (
// //         <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
// //             <div>
// //                 <label className="block font-semibold">Name</label>
// //                 <input {...register('name')} className="w-full border px-3 py-2 rounded" />
// //                 <p className="text-red-500 text-sm">{errors.name?.message}</p>
// //             </div>
// //             <div>
// //                 <label className="block font-semibold">Email</label>
// //                 <input {...register('email')} className="w-full border px-3 py-2 rounded" />
// //                 <p className="text-red-500 text-sm">{errors.email?.message}</p>
// //             </div>
// //             <div>
// //                 <label className="block font-semibold">Password</label>
// //                 <input type="password" {...register('password')} className="w-full border px-3 py-2 rounded" />
// //                 <p className="text-red-500 text-sm">{errors.password?.message}</p>
// //             </div>
// //             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// //                 Register
// //             </button>
// //         </form>
// //     );
// // };

// // export default RegisterForm;

// components/LoginModal.js
import { useMemo, useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContexts';
import { FcGoogle } from 'react-icons/fc';
import { LuUser } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OTPDemo from './Otp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginModal({ isOpen, onClose, setUserData }) {
    const [isRegister, setIsRegister] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // LoginSignupPage.js or wherever you're handling modals
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const { login, user, token } = useAuth();
    const [showOtp, setShowOtp] = useState(false);
    const [otpEmail, setOtpEmail] = useState(false);
    const [otpUser, setOtpUser] = useState(false);
    const [otpPassword, setOtpPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            if (isRegister) {
                // ✅ Send OTP to backend
                const response = await axios.post("http://localhost:7100/api/auth/send-otp", {
                    email: data.email,
                });

                console.log(response.data);

                if (response.data.message === "User already exists") {
                    toast.error("Already have account!", {
                        autoClose: 900, // time in milliseconds (1 second)
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                    });
                    return;
                }

                setShowOtp(true);
                setOtpEmail(data.email);
                setOtpUser(data.userName);
                setOtpPassword(data.password);

                console.log("OTP sent response:", response.data);
                // ✅ Show OTP modal

            } else {
                // ✅ Login logic
                const response = await axios.post("http://localhost:7100/api/login", data);

                if (response.data.message === "Invalid credentials") {
                    toast.error("Login Failed!", {
                        autoClose: 900, // time in milliseconds (1 second)
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                    });
                    return;
                }

                if (response.data.message === "Login successful") {
                    toast.success("Login Successful!", {
                        autoClose: 900, // time in milliseconds (1 second)
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                    });
                }
                console.log('User saved:', response.data);

                login(response.data.user, response.data.token);
                setUserData({
                    userName: response.data.user.userName,
                    email: response.data.user.email
                });
                onClose();
            }
        } catch (err) {
            toast.error("Login failed!", {
                autoClose: 900, // time in milliseconds (1 second)
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
            });
            console.error("Error during auth/OTP:", err.response?.data || err.message);
        }
    };



    const handleSuccess = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("Google token:", tokenResponse.access_token);

            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });

                const userInfo = res.data;
                console.log("User Info:", userInfo);

                const userToSave = {
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture,
                    google_id: userInfo.sub
                };

                axios.post('http://localhost:7100/api/Google_login', userToSave)
                    .then(response => {
                        console.log('User saved:', response.data);
                        login(response.data.user, response.data.token);
                    })
                    .catch(error => {
                        console.error('Error saving user:', error);
                    });

                setUserData({
                    userName: userToSave.name,
                    email: userToSave.email,
                    sub: userToSave.google_id,
                    picture: userToSave.picture
                });
                onClose();
            } catch (err) {
                console.error("Failed to fetch user info", err);
            }
        },
        onError: (errorResponse) => {
            console.error("Google login error:", errorResponse);
        },
        flow: "implicit",
    });

    const handleError = () => {
        console.error("Login Failed");
    };

    // const registerSchema = yup.object({
    //     userName: yup.string().required("Username is required"),
    //     email: yup.string().email("Invalid email").required("Email is required"),
    // });

    const registerSchema = yup.object({
        userName: yup.string().required("Username is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain uppercase, lowercase, number, and special character"
            ),
    });

    const loginSchema = yup.object({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain uppercase, lowercase, number, and special character"
            ),
    });

    const schema = useMemo(() => {
        return isRegister ? registerSchema : loginSchema;
    }, [isRegister]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <h2 className="text-2xl font-semibold mb-4">{isRegister ? "Sign Up" : "Login"}</h2>

                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                    <div className="flex flex-col gap-4">
                        <button onClick={handleSuccess} className="flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-100 transition group cursor-pointer">
                            <FcGoogle size={20} className='group-hover:animate-[spin_0.8s_ease-in-out]' />
                            Continue with Google
                        </button>

                        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-2">
                            <span className="border-t flex-1"></span>
                            <span className="uppercase">or {isRegister ? 'Sign Up' : 'Login'} with email</span>
                            <span className="border-t flex-1"></span>
                        </div>

                        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                            {isRegister && (
                                <div className="relative">
                                    <LuUser className="absolute top-3.5 left-3 text-gray-400" size={18} />
                                    <input
                                        {...register("userName")}
                                        type="text"
                                        placeholder="User Name"
                                        className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
                                </div>
                            )}

                            <div className="relative">
                                <MdOutlineEmail className="absolute top-3.5 left-3 text-gray-400" size={18} />
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="relative flex">
                                {/* <MdOutlineEmail className="absolute top-3.5 left-3 text-gray-400" size={18} /> */}
                                {/* <FontAwesomeIcon icon="fa-light fa-lock" /> */}
                                <FaLock className="absolute top-3.5 left-3 text-gray-400" size={18} />
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-3.5 right-3 text-gray-400 cursor-pointer"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </span>
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <button type='submit' className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-full transition cursor-pointer">
                                {isRegister ? 'Sign Up' : 'Login'}
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-2">
                            {isRegister ? (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        className="text-indigo-600 hover:underline cursor-pointer"
                                        onClick={() => setIsRegister(false)}
                                    >
                                        Login
                                    </button>
                                </>
                            ) : (
                                <>
                                    Don’t have an account?{' '}
                                    <button
                                        className="text-indigo-600 hover:underline cursor-pointer"
                                        onClick={() => {
                                            setIsRegister(true);
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </Modal>

            {isRegister && showOtp && (
                <OTPDemo
                    isOpen={showOtp}
                    onClose={() => setShowOtp(false)}
                    onCompleteOtp={() => {
                        setShowOtpModal(false);        // ✅ close OTP popup
                        setShowSignupModal(false);      // ✅ close Signup/Login popup
                        navigate("/");                 // ✅ go to homepage
                    }}
                    email={otpEmail}
                    userName={otpUser}
                    password={otpPassword}
                    setIsRegister={setIsRegister}  // ✅ pass isRegister to OTPDemo
                />
            )}
        </div>
    );
}
