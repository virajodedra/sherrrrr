import React, { useEffect, useState } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import Avatar from "../components/Avatar";
import Otp from "../components/Otp";
import { useAuth } from "../contexts/AuthContexts";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "../contexts/AuthContexts";
// import Demo from "../components/Otp";

const MainPage = ({ userProp, setUserProp }) => {
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();
    const { login, user, token, hasHydrated } = useAuth();
    // const hasRunOneTap = useRef(false); 
    const isLoggedIn = !!user && !!token;
    // const [userData, setUserData] = useState({
    //     userName: "",
    //     email: "",
    //     sub: "",
    //     picture: ""
    // });

    // useEffect(() => {
    //     setUserProp({
    //         userName: userData.userName,
    //         email: userData.email,
    //         sub: userData.sub,
    //         picture: userData.picture
    //     })
    // }, [userData])

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         window.google.accounts.id.cancel();
    //     }
    // }, [isLoggedIn]);


    // useGoogleOneTapLogin({
    //     onSuccess: (credentialResponse) => {
    //         if (isLoggedIn) {
    //             google.accounts.id.cancel();
    //             return;
    //         };

    //         const payload = decodeJwt(credentialResponse.credential);
    //         console.log("Decoded JWT Payload:", payload);
    //         // setUserData(payload);

    //         const userToSave = {
    //             name: payload.name,
    //             email: payload.email,
    //             picture: payload.picture,
    //             google_id: payload.sub
    //         };

    //         setUserProp({
    //             userName: payload.name,
    //             email: payload.email,
    //             sub: payload.sub,
    //             picture: payload.picture
    //         })

    //         setUserProp({
    //             userName: userToSave.name,
    //             email: userToSave.email,
    //             sub: userToSave.sub,
    //             picture: userToSave.picture
    //         })

    //         axios.post('http://localhost:7100/api/Google_login', userToSave)
    //             .then(response => {
    //                 console.log('User saved:', response.data);
    //                 login(response.data.user, response.data.token);
    //             })
    //             .catch(error => {
    //                 console.error('Error saving user:', error);
    //             });

    //     },
    //     onError: () => {
    //         console.log("One Tap Login Failed");
    //     },

    // });
    useGoogleOneTapLogin(
        hasHydrated && !isLoggedIn
            ? {
                onSuccess: (credentialResponse) => {
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
            }
            : {} // ✅ skip hook if not needed
    );

    const goToAbout = () => {
        navigate("/login");
    };

    return (
        <div>
            <div className={`App`}>
                <nav style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    background: "#222",
                    color: "#fff"
                }}>
                    <h3 style={{ margin: 0 }}>Code Conquerors 💪🏻</h3>
                    {/* <span>{userData ? `Welcome ${userData.name}` : "Guest"}</span> */}
                    {
                        isLoggedIn
                            ? <Avatar userData={userProp} />
                            : <div className="flex flex-row gap-4">
                                <button onClick={() => setShowLogin(true)} class="bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-white/20 transition duration-300">
                                    Login
                                </button>
                                {/* <button onClick={() => setShowLogin(true)} class="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                                    Button
                                </button> */}
                                {/* <button class="bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-white/20 transition duration-300">
                                    Sign In
                                </button> */}
                            </div>
                    }



                </nav>

                {/* <div style={{ padding: "2rem", textAlign: "center" }}>
                    {userData ? (
                        <div>
                            <h2 style={{ color: "green" }}>✅ Login Successful!</h2>
                            <h3>Welcome, {userData.name}</h3>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Google ID:</strong> {userData.sub}</p>
                            <p>Payload:{JSON.stringify(userData)}.</p>
                            <img
                                src={userData.picture}
                                alt={`${userData.name}'s Profile`}
                                referrerPolicy="no-referrer"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    marginTop: "1rem"
                                }}
                            />
                        </div>
                    ) : (
                        <h2>Please wait for Google One Tap Login...</h2>
                    )}
                </div> */}
                {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} setUserData={setUserProp} />}
                {/* <Otp/> */}
                <ToastContainer />

            </div>
            <div style={{ position: 'fixed', bottom: '90px', right: '20px', backgroundColor: '#333', color: '#fff', padding: '6px 10px', borderRadius: '6px' }}>
                💬 Hi! Need Help?
            </div>
        </div >
    )
}

export default MainPage