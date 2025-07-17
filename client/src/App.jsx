import React, { useEffect, useState } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import UserProfile from "./pages/UserProfile";
import OTPDemo from "./components/Otp";
import { useAuth } from "./contexts/AuthContexts";
import UserProfilePage from "./pages/UserProfilePage";


// import user from "../../../Backend_Demo/models/user";

function App() {
  const { user, token } = useAuth();
  const isLoggedIn = !!user && !!token;

  const [userProp, setUserProp] = useState({
    userName:"",
    email:"",
    sub: "",
    picture: ""
  })  

  useEffect(() => {
    if (isLoggedIn) {
      setUserProp({
        userName: user.userName,
        email: user.email,
        sub: "",
        picture: user.picture
      });
    }
  }, [isLoggedIn, user]);
  

  return (
    <Routes>
      <Route path="/" element={<MainPage userProp={userProp} setUserProp={setUserProp} />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/otp" element={<OTPDemo />} />
    </Routes>
  );
}

export default App;
