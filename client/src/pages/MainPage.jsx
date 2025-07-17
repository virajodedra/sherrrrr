import React, { useEffect, useRef, useState } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import Avatar from "../components/Avatar";
import Otp from "../components/Otp";
import { useAuth } from "../contexts/AuthContexts";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "../contexts/AuthContexts";
import { FaGlobe } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
// import TranslateWidget from "../components/GoogleTranslate";
import GoogleTranslate from "../components/GoogleTranslate";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

// ✅ Inline component for Google One Tap
const GoogleOneTapLogin = ({ setUserProp, login }) => {
    const { user, token } = useAuth();
    const isLoggedIn = !!user && !!token;

    useGoogleOneTapLogin({
        onSuccess: (credentialResponse) => {
            if (isLoggedIn) return;

            const payload = decodeJwt(credentialResponse.credential);

            const userToSave = {
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                google_id: payload.sub,
            };

            setUserProp({
                userName: userToSave.name,
                email: userToSave.email,
                sub: userToSave.google_id,
                picture: userToSave.picture,
            });

            axios
                .post("http://localhost:7100/api/Google_login", userToSave)
                .then((response) => {
                    login(response.data.user, response.data.token);
                })
                .catch((error) => {
                    console.error("Error saving user:", error);
                });
        },
        onError: () => {
            console.log("One Tap Login Failed");
        },
    });

    return null;
};

const MainPage = ({ userProp, setUserProp }) => {
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();
    const { login, user, token } = useAuth();
    const [showTranslate, setShowTranslate] = useState(false);
    const translateRef = useRef();
    const isLoggedIn = !!user && !!token;

    const goToAbout = () => {
        navigate("/login");
    };

    const toggleTranslate = () => {
        setShowTranslate((prev) => !prev);
    };

    // useEffect(() => {
    //     if (!showTranslate) return;

    //     const script = document.createElement("script");
    //     script.src =
    //         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    //     script.async = true;
    //     document.body.appendChild(script);

    //     window.googleTranslateElementInit = () => {
    //         new window.google.translate.TranslateElement(
    //             {
    //                 pageLanguage: "en",
    //                 layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    //             },
    //             "google_translate_element"
    //         );
    //     };
    // }, [showTranslate]);

    // const googleTranslateElementInit = () => {
    //     new window.google.translate.TranslateElement(
    //         {
    //             pageLanguage: "en",
    //             autoDisplay: false
    //         },
    //         "google_translate_element"
    //     );
    // };
    // useEffect(() => {
    //     var addScript = document.createElement("script");
    //     addScript.setAttribute(
    //         "src",
    //         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    //     );
    //     document.body.appendChild(addScript);
    //     window.googleTranslateElementInit = googleTranslateElementInit;
    // }, []);

    // return (
    //     <div>
    //         <div className="App">
    //             <nav style={{
    //                 display: "flex",
    //                 justifyContent: "space-between",
    //                 alignItems: "center",
    //                 padding: "1rem",
    //                 background: "#222",
    //                 color: "#fff"
    //             }}>
    //                 <h3 style={{ margin: 0 }}>Code Conquerors 💪🏻</h3>
    //                 <div className="flex gap-10">
    //                     {/* <div style={{ position: 'relative' }}>
    //                         <FaGlobe
    //                             size={24}1
    //                             onClick={() => setShowTranslate(!showTranslate)}
    //                             style={{ cursor: 'pointer' }}
    //                             title="Translate this page"
    //                         />
    //                         {showTranslate && <TranslateWidget />}
    //                     </div> */}
    //                     {/* {!showTranslate && <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    //                         {!showTranslate && <FaGlobe
    //                             size={20}
    //                             onClick={() => setShowTranslate(true)}
    //                             style={{ cursor: "pointer" }}
    //                             title="Translate"
    //                         />}
    //                         {showTranslate && (
    //                             <div>
    //                                 {/* <div id="google_translate_element" className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-white/20 transition duration-300" style={{ fontSize: "14px"}} /> */}
    //                     {/* <div id="google_translate_element" className="ml-2 text-sm inline-block rounded-md overflow-hidden bg-white shadow-md px-2 py-1" style={{ fontSize: "14px" }} />
    //                                 <button onClick={toggleTranslate}>Close</button>
    //                             </div> */}
    //                     {/* )} */}
    //                     {/* <div className="relative">
    //                         {showTranslate ? (
    //                             <div id="google_translate_element" className="ml-2 text-sm inline-block rounded-md overflow-hidden bg-white shadow-md px-2 py-1" style={{ fontSize: "14px" }}>
    //                             </div>
    //                         ) : (
    //                             <FaGlobe
    //                             size={20}
    //                             onClick={() => setShowTranslate(true)}
    //                             className="cursor-pointer"
    //                         />
    //                         )}

    //                     </div> */}
    //                     {
    //                         isLoggedIn
    //                             ? <Avatar userData={userProp} />
    //                             : <div className="flex flex-row gap-4">
    //                                 <button onClick={() => setShowLogin(true)} className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-white/20 transition duration-300">
    //                                     Login
    //                                 </button>
    //                             </div>
    //                     }
    //                 </div>
    //             </nav>

    //             {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} setUserData={setUserProp} />}

    //             <ToastContainer />

    //             {/* ✅ Google One Tap only renders when not logged in */}
    //             {!isLoggedIn && <GoogleOneTapLogin setUserProp={setUserProp} login={login} />}
    //         </div>

    //         <div style={{ position: 'fixed', bottom: '90px', right: '20px', backgroundColor: '#333', color: '#fff', padding: '6px 10px', borderRadius: '6px' }}>
    //             💬 Hi! Need Help?
    //         </div>
    //     </div>
    // );

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} userData={userProp} setShowLogin={setShowLogin} />
            {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} setUserData={setUserProp} />}
            {!isLoggedIn && <GoogleOneTapLogin setUserProp={setUserProp} login={login} />}
            <ToastContainer />
            <HeroSection />
            <Footer />
        </div>
    )
};

export default MainPage;
