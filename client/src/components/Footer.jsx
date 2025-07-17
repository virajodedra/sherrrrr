import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import JobFitLogo from "../assets/JobFit2.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand and Social Links */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              {/* <div className="w-full h-full bg-purple-500 rounded-full flex items-center justify-center">
                <img src={JobFitLogo} alt="JobFit Logo" className="h-8" />
              </div> */}
              <img src={JobFitLogo} alt="JobFit Logo" className="h-8" />
              {/* <span className="text-2xl font-bold text-purple-500 dark:text-purple-400">JobFit Pro</span> */}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">Connect with us</h3>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 1 - About */}
          <div>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">About us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">For Employers</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Sitemap</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Column 2 - Help */}
          <div>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Help center</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Report issue</a></li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Privacy policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Trust & safety</a></li>
            </ul>
          </div>
        </div>

        {/* App Download Section */}
        {/* <div className="mb-8">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Optimize on the go</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Get real-time ATS scores and job updates on our App</p>
            <div className="flex space-x-4">
              <a href="#" className="block">
                <div className="bg-gray-900 dark:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </a>
              <a href="#" className="block">
                <div className="bg-gray-900 dark:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.17 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div> */}

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            {/* Copyright and Legal */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">JP</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>All trademarks are the property of their respective owners</p>
                  <p>All rights reserved © 2025 JobFit Pro. All rights reserved.</p>
                </div>
              </div>
            </div>

            {/* Partner Services */}
            <div className="flex items-center space-x-6x">
              <span className="text-sm text-gray-500 dark:text-gray-400">Our services</span>
              <div className="flex items-center space-x-6">
                <div className="text-purple-500 dark:text-purple-400 font-bold text-lg">Resume</div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  <span className="text-blue-600 dark:text-blue-400">ATS</span>Score
                </div>
                <div className="text-purple-500 dark:text-purple-400 font-bold">
                  Job<span className="text-grayx-700 dark:text-gray-300">Match</span>
                </div>
                <div className="text-blue-500 dark:text-blue-400 font-bold">
                  Hire<span className="text-gray-700 dark:text-gray-300">Pro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       <footer className="blue-bg text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-200">© 2025 JobFit Pro. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-200 hover:text-purple-500 dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-200 hover:text-purple-500 dark:hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-200 hover:text-purple-500 dark:hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer> 
    </footer>
  );
};

export default Footer;