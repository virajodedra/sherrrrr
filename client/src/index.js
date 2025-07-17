import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContexts";

// import { Provider } from "@/components/ui/provider"
// 

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <GoogleOAuthProvider clientId="436675208249-cm6q15nhrqrr54eol7vrnaqih1bsr5ot.apps.googleusercontent.com">
            <BrowserRouter>
                <AuthProvider >
                    <App />
                    {/* <OTPDemo /> */}
                </AuthProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    // </React.StrictMode>
)   