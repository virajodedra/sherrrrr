import React, { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { Search } from "lucide-react";
import JobFitLogo from "../assets/JobFit2.png";
import Avatar from "./Avatar";

const Navbar = ({ isLoggedIn, userData, setShowLogin }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [query, setQuery] = useState("");

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
        setDarkMode(!darkMode);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", query);
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md">
            <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* Logo + Search */}
                <div className="flex items-center space-x-6">
                    {/* Logo */}
                    <img src={JobFitLogo} alt="JobFit Logo" className="h-8" />
                    {/* <div className="text-2xl font-bold text-purple-500 dark:text-white">
          JobFit
        </div> */}
                    {/* Search bar */}

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-4 py-1 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-purple-400 w-full md:w-64 ..."
                    >
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search jobs..."
                            className="bg-transparent outline-none px-4 text-sm text-gray-700 dark:text-gray-200 w-1000 md:w-64"
                        />
                        <button type="submit" className="text-purple-600 dark:text-purple-300 hover:text-purple-800">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                {/* Nav Links & Buttons */}
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-white px-4 py-2">Home</a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-white px-4 py-2">About</a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-white px-4 py-2">Features</a>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full transition-all duration-300 ease-in-out
              bg-gradient-to-r from-purple-600 to-purple-800 
              hover:from-purple-700 hover:to-purple-900 
              hover:scale-105 hover:ring-2 hover:ring-purple-300
              text-white shadow-md shadow-purple-500/30
              flex items-center justify-center"
                        aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {darkMode ? (
                            <FiSun className="w-5 h-5 text-yellow-300" />
                        ) : (
                            <FiMoon className="w-5 h-5 text-white" />
                        )}
                    </button>

                    {/* Login Button */}
                    {
                        isLoggedIn
                            ? <Avatar userData={userData} />
                            : <div className="flex flex-row gap-4">
                                <button onClick={() => setShowLogin(true)} className="px-4 py-2 purple-bg text-white rounded-full hover:purple-bg">
                                    Login
                                </button>
                            </div>
                    }

                </div>
            </nav>
        </header>
    );
};

export default Navbar;