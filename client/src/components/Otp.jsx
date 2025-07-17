// import React, { useState, useRef, useEffect } from "react";

// // OTPPopup Component
// const OTPPopup = ({
//     isOpen = false,
//     onClose,
//     length = 6,
//     onComplete,
//     onResend,
//     timeLimit = 60,
//     disabled = false,
//     title = "Enter OTP",
//     subtitle = "We've sent a {length}-digit code to your registered device",
//     email
// }) => {
//     const [otp, setOtp] = useState(Array(length).fill(""));
//     const [errors, setErrors] = useState({});
//     const [isResending, setIsResending] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(timeLimit);
//     const [canResend, setCanResend] = useState(false);
//     const inputRefs = useRef([]);
//     const modalRef = useRef();

//     useEffect(() => {
//         if (isOpen && timeLeft > 0) {
//             const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
//             return () => clearTimeout(timer);
//         } else if (timeLeft === 0) {
//             setCanResend(true);
//         }
//     }, [timeLeft, isOpen]);

//     useEffect(() => {
//         if (isOpen) {
//             setOtp(Array(length).fill(""));
//             setErrors({});
//             setTimeLeft(timeLimit);
//             setCanResend(false);
//             setTimeout(() => {
//                 inputRefs.current[0]?.focus();
//             }, 100);
//         }
//     }, [isOpen, length, timeLimit]);

//     useEffect(() => {
//         const escHandler = (e) => {
//             if (e.key === "Escape" && isOpen) handleClose();
//         };
//         document.addEventListener("keydown", escHandler);
//         return () => document.removeEventListener("keydown", escHandler);
//     }, [isOpen]);

//     const handleClose = () => onClose && onClose();

//     const handleChange = (el, idx) => {
//         const val = el.value;
//         if (!/^\d*$/.test(val)) {
//             setErrors((prev) => ({ ...prev, [idx]: "Only numbers are allowed" }));
//             return;
//         }

//         const newOtp = [...otp];
//         newOtp[idx] = val;
//         setOtp(newOtp);

//         setErrors((prev) => {
//             const updated = { ...prev };
//             delete updated[idx];
//             return updated;
//         });

//         if (val && idx < length - 1) inputRefs.current[idx + 1]?.focus();

//         if (newOtp.every((digit) => digit !== "")) {
//             onComplete && onComplete(newOtp.join(""));
//         }
//     };

//     const handleKeyDown = (e, idx) => {
//         if (e.key === "Backspace") {
//             const newOtp = [...otp];
//             if (otp[idx]) {
//                 newOtp[idx] = "";
//                 setOtp(newOtp);
//             } else if (idx > 0) {
//                 newOtp[idx - 1] = "";
//                 setOtp(newOtp);
//                 inputRefs.current[idx - 1]?.focus();
//             }
//         } else if (e.key === "ArrowLeft" && idx > 0) {
//             inputRefs.current[idx - 1]?.focus();
//         } else if (e.key === "ArrowRight" && idx < length - 1) {
//             inputRefs.current[idx + 1]?.focus();
//         }
//     };

//     const handlePaste = (e) => {
//         e.preventDefault();
//         const pasteData = e.clipboardData.getData("text");
//         if (!/^\d+$/.test(pasteData)) {
//             setErrors({ general: "Please paste only numbers" });
//             return;
//         }

//         const pasteArray = pasteData.slice(0, length).split("");
//         const newOtp = [...otp];
//         pasteArray.forEach((digit, i) => (newOtp[i] = digit));
//         setOtp(newOtp);
//         setErrors({});

//         const next = Math.min(pasteArray.length, length - 1);
//         inputRefs.current[next]?.focus();

//         if (newOtp.every((digit) => digit !== "")) {
//             onComplete && onComplete(newOtp.join(""));
//         }
//     };

//     const handleResend = async () => {
//         if (!email) {
//             setVerificationResult("❗ Email is required to resend OTP");
//             return;
//         }

//         try {
//             const res = await fetch("http://localhost:5000/api/send-otp", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email }),
//             });

//             if (!res.ok) throw new Error("Failed to send OTP");

//             setVerificationResult("📨 OTP sent successfully!");
//         } catch (err) {
//             setVerificationResult("❌ Failed to send OTP.");
//         }
//     };

//     const handleOTPComplete = async (otp) => {
//         setIsLoading(true);
//         setVerificationResult("🔄 Verifying OTP...");

//         try {
//             const res = await fetch("http://localhost:5000/api/verify-otp", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, otp }),
//             });

//             const data = await res.json();

//             if (res.ok && data.success) {
//                 setVerificationResult("✅ OTP verified successfully!");
//                 setIsOTPOpen(false);
//             } else {
//                 setVerificationResult("❌ Invalid OTP. Please try again.");
//             }
//         } catch (err) {
//             setVerificationResult("❌ Verification failed.");
//         }

//         setIsLoading(false);
//     };


//     const clearOTP = () => {
//         setOtp(Array(length).fill(""));
//         setErrors({});
//         inputRefs.current[0]?.focus();
//     };

//     const formatTime = (sec) =>
//         $`{Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;

//     if (!isOpen) return null;

//     return (
//         <div
//             ref={modalRef}
//             onClick={(e) => e.target === modalRef.current && handleClose()}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
//         >
//             <div
//                 onClick={(e) => e.stopPropagation()}
//                 className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-2xl transform transition-all duration-300 scale-100"
//             >
//                 <button
//                     onClick={handleClose}
//                     className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor">
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                         />
//                     </svg>
//                 </button>

//                 <div className="text-center mb-6">
//                     <div className="mb-4">
//                         <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//                             <svg
//                                 className="w-8 h-8 text-blue-600"
//                                 fill="none"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                                 />
//                             </svg>
//                         </div>
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
//                     <p className="text-gray-600 mt-2">
//                         {subtitle.replace("{length}", length)}
//                     </p>
//                 </div>

//                 <div className="flex justify-center gap-3 mb-6">
//                     {otp.map((digit, idx) => (
//                         <input
//                             key={idx}
//                             ref={(el) => (inputRefs.current[idx] = el)}
//                             type="text"
//                             inputMode="numeric"
//                             maxLength={1}
//                             value={digit}
//                             onChange={(e) => handleChange(e.target, idx)}
//                             onKeyDown={(e) => handleKeyDown(e, idx)}
//                             onPaste={idx === 0 ? handlePaste : undefined}
//                             disabled={disabled}
//                             className={`w-12 h-12 text-xl font-bold text-center tracking-wider border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
//                 ${errors[idx]
//                                     ? "border-red-500 bg-red-50 focus:ring-red-500"
//                                     : digit
//                                         ? "border-green-500 bg-green-50 focus:ring-green-500"
//                                         : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
//                                 } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
//                         />
//                     ))}
//                 </div>

//                 {Object.values(errors).map((err, i) => (
//                     <p key={i} className="text-sm text-center text-red-500 mb-2">
//                         {err}
//                     </p>
//                 ))}

//                 <div className="text-center mb-6">
//                     {canResend ? (
//                         <button
//                             onClick={handleResend}
//                             disabled={isResending}
//                             className="text-blue-600 hover:text-blue-800 font-semibold underline disabled:opacity-50 transition-colors"
//                         >
//                             {isResending ? "Resending..." : "Resend OTP"}
//                         </button>
//                     ) : (
//                         <p className="text-gray-600">
//                             Resend OTP in{" "}
//                             <span className="text-blue-600 font-semibold">
//                                 {formatTime(timeLeft)}
//                             </span>
//                         </p>
//                     )}
//                 </div>

//                 <div className="flex gap-3">
//                     <button
//                         onClick={clearOTP}
//                         disabled={disabled}
//                         className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
//                     >
//                         Clear
//                     </button>
//                     <button
//                         onClick={() => onComplete?.(otp.join(""))}
//                         disabled={disabled || otp.some((digit) => digit === "")}
//                         className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         Verify
//                     </button>
//                 </div>

//                 <p className="mt-4 text-sm text-gray-500 text-center">
//                     Didn't receive the code? Check your spam folder or try resending.
//                 </p>
//             </div>
//         </div>
//     );
// };

// // Enhanced Demo Component with Better Button Visibility
// const OTPDemo = () => {
//     const [isOTPOpen, setIsOTPOpen] = useState(false);
//     const [verificationResult, setVerificationResult] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [email, setEmail] = useState("")
//     const [error, setError] = useState("")


//     const handleOTPComplete = (otp) => {
//         console.log("Entered OTP:", otp);
//         setIsLoading(true);
//         setVerificationResult("🔄 Verifying OTP: ${otp}");

//         setTimeout(() => {
//             setIsLoading(false);
//             if (otp === "123456") {
//                 setVerificationResult("✅ OTP verified successfully!");
//                 setIsOTPOpen(false);
//                 setTimeout(() => setVerificationResult(""), 3000);
//             } else {
//                 setVerificationResult("❌ Invalid OTP. Please try again.");
//                 setTimeout(() => setVerificationResult(""), 3000);
//             }
//         }, 2000);
//     };

//     const handleResend = () => {
//         setVerificationResult("📨 New OTP sent to your device");
//         setTimeout(() => setVerificationResult(""), 3000);
//         return new Promise((resolve) => setTimeout(resolve, 1000));
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
//             <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
//                 <div className="mb-6">
//                     <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
//                         <svg
//                             className="w-10 h-10 text-white"
//                             fill="none"
//                             stroke="currentColor"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                         </svg>
//                     </div>
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                         OTP Verification
//                     </h1>
//                     <p className="text-gray-600">
//                         Secure your account with OTP verification
//                     </p>
//                 </div>

//                 <div className="space-y-4">
//                     <button
//                         onClick={() => {
//                             setIsOTPOpen(true);
//                             setVerificationResult("");
//                         }}
//                         className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                     >
//                         🔐 Open OTP Verification
//                     </button>

//                     <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
//                         <p className="font-medium">💡 Demo Tip:</p>
//                         <p>
//                             Use OTP:{" "}
//                             <span className="font-mono bg-white px-2 py-1 rounded">
//                                 123456
//                             </span>{" "}
//                             for successful verification
//                         </p>
//                     </div>
//                 </div>

//                 {verificationResult && (
//                     <div
//                         className={`mt-6 p-4 rounded-lg text-center font-medium ${verificationResult.includes("✅")
//                                 ? "bg-green-100 text-green-800"
//                                 : verificationResult.includes("❌")
//                                     ? "bg-red-100 text-red-800"
//                                     : "bg-blue-100 text-blue-800"
//                             }`}
//                     >
//                         {verificationResult}
//                     </div>
//                 )}

//                 <div className="mt-6 text-xs text-gray-400">
//                     <p>Click the button above to start OTP verification</p>
//                 </div>
//             </div>

//             <OTPPopup
//                 isOpen={isOTPOpen}
//                 onClose={() => setIsOTPOpen(false)}
//                 length={6}
//                 onComplete={handleOTPComplete}
//                 onResend={handleResend}
//                 timeLimit={60}
//                 disabled={isLoading}
//                 title="Verify Your Identity"
//                 subtitle="We've sent a {length}-digit code to your registered phone number"
//             />
//         </div>
//     );
// };

// export default OTPDemo;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

// import { useNavigate } from "react-router-dom";

const OTPDemo = ({
    isOpen = false,
    onClose,
    onComplete,
    onCompleteOtp,
    length = 6,
    onResend,
    timeLimit = 60,
    disabled = false,
    title = "Enter OTP",
    subtitle = "We've sent a {length}-digit code to your registered device",
    email,
    userName,
    password,
    setIsRegister
}) => {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const [errors, setErrors] = useState({});
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);
    const modalRef = useRef();
    // const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setCanResend(true);
        }
    }, [timeLeft, isOpen]);

    useEffect(() => {
        if (isOpen) {
            setOtp(Array(length).fill(""));
            setErrors({});
            setTimeLeft(timeLimit);
            setCanResend(false);
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        }
    }, [isOpen, length, timeLimit]);

    useEffect(() => {
        const escHandler = (e) => {
            if (e.key === "Escape" && isOpen) handleClose();
        };
        document.addEventListener("keydown", escHandler);
        return () => document.removeEventListener("keydown", escHandler);
    }, [isOpen]);

    const handleClose = () => onClose && onClose();

    const handleChange = (el, idx) => {
        const val = el.value;
        if (!/^\d*$/.test(val)) {
            setErrors((prev) => ({ ...prev, [idx]: "Only numbers are allowed" }));
            return;
        }

        const newOtp = [...otp];
        newOtp[idx] = val;
        setOtp(newOtp);

        setErrors((prev) => {
            const updated = { ...prev };
            delete updated[idx];
            return updated;
        });

        if (val && idx < length - 1) inputRefs.current[idx + 1]?.focus();

        if (newOtp.every((digit) => digit !== "")) {
            onComplete && onComplete(newOtp.join(""));
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            if (otp[idx]) {
                newOtp[idx] = "";
                setOtp(newOtp);
            } else if (idx > 0) {
                newOtp[idx - 1] = "";
                setOtp(newOtp);
                inputRefs.current[idx - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        } else if (e.key === "ArrowRight" && idx < length - 1) {
            inputRefs.current[idx + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");
        if (!/^\d+$/.test(pasteData)) {
            setErrors({ general: "Please paste only numbers" });
            return;
        }

        const pasteArray = pasteData.slice(0, length).split("");
        const newOtp = [...otp];
        pasteArray.forEach((digit, i) => (newOtp[i] = digit));
        setOtp(newOtp);
        setErrors({});

        const next = Math.min(pasteArray.length, length - 1);
        inputRefs.current[next]?.focus();

        if (newOtp.every((digit) => digit !== "")) {
            onComplete && onComplete(newOtp.join(""));
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        try {
            await onResend();
            setTimeLeft(timeLimit);
            setCanResend(false);
        } catch (error) {
            console.error("Failed to resend OTP:", error);
        } finally {
            setIsResending(false);
        }
    };

    const clearOTP = () => {
        setOtp(Array(length).fill(""));
        setErrors({});
        inputRefs.current[0]?.focus();
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join("");
        try {
            const res = await axios.post("http://localhost:7100/api/auth/verify-otp", {
                email,
                otp: enteredOtp,
            });
            console.log("OTP verified:", res.data);
            // alert("OTP verified successfully!");

            if (res.data.message == "OTP verified successfully") {
                toast.success("Signup successfully!", {
                    autoClose: 1000, // time in milliseconds (1 second)
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });
                await axios.post("http://localhost:7100/api/signup", {
                    userName, email, password
                })

                console.log("Saved :", res.data)
            }

            // onComplete && onComplete(enteredOtp);
            onClose();
            setIsRegister(false);
            // onCompleteOtp();// Close OTP modal
            // navigate("/");
            //  onComplete(); // ✅ t;
            // navigate("/");// ✅ Close modal
        } catch (err) {
            toast.error("OTP verification failed.", {
                autoClose: 1000, // time in milliseconds (1 second)
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
            });
            console.error("OTP verification failed:", err.response?.data || err.message);
            // alert("Invalid OTP. Please try again.");
        }
    }

    const formatTime = (sec) =>
        `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            onClick={(e) => e.target === modalRef.current && handleClose()}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-2xl transform transition-all duration-300 scale-100"
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="text-center mb-6">
                    <div className="mb-4">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <p className="text-gray-600 mt-2">
                        {subtitle.replace("{length}", length)}
                    </p>
                </div>

                <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={(el) => (inputRefs.current[idx] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            onPaste={idx === 0 ? handlePaste : undefined}
                            disabled={disabled}
                            className={`w-12 h-12 text-xl font-bold text-center tracking-wider border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors[idx]
                                    ? "border-red-500 bg-red-50 focus:ring-red-500"
                                    : digit
                                        ? "border-green-500 bg-green-50 focus:ring-green-500"
                                        : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    ))}
                </div>

                {Object.values(errors).map((err, i) => (
                    <p key={i} className="text-sm text-center text-red-500 mb-2">
                        {err}
                    </p>
                ))}

                <div className="text-center mb-6">
                    {canResend ? (
                        <button
                            onClick={handleResend}
                            disabled={isResending}
                            className="text-blue-600 hover:text-blue-800 font-semibold underline disabled:opacity-50 transition-colors"
                        >
                            {isResending ? "Resending..." : "Resend OTP"}
                        </button>
                    ) : (
                        <p className="text-gray-600">
                            Resend OTP in{" "}
                            <span className="text-blue-600 font-semibold">
                                {formatTime(timeLeft)}
                            </span>
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={clearOTP}
                        disabled={disabled}
                        className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleVerifyOtp}
                        disabled={disabled || otp.some((digit) => digit === "")}
                        className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Verify
                    </button>
                </div>

                <p className="mt-4 text-sm text-gray-500 text-center">
                    Didn't receive the code? Check your spam folder or try resending.
                </p>
            </div>
        </div>
    );
};

export default OTPDemo;