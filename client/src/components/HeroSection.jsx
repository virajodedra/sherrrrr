// src/pages/Main.jsx
import React from "react";
import Navbar from "../components/Navbar";

const HeroSection = () => {
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-gray-200">
            <div className="mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                {/* Hero Section */}
                <section className="mx-auto px-4 py-16 text-center hero-bg">
                    <h1 className="text-4xl md:text-5xl font-bold text-purple-500 dark:text-white mb-4">
                        Optimize Your Resume for Your Dream Job
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Upload your resume, get an ATS score, and receive tailored feedback to land interviews faster.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="px-6 py-3 purple-bg text-white rounded-lg hover:purple-bg">
                            Get Started as Job Seeker
                        </button>
                        <button className="px-6 py-3 blue-bg text-white rounded-lg hover:blue-bg">
                            Hire Talent
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="section-transition py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-purple-500 dark:text-white text-center mb-12">
                            Why Choose JobFit?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "ATS Score Analysis",
                                    description: "Upload your resume and get a detailed ATS score to see how it matches job descriptions.",
                                },
                                {
                                    title: "Actionable Feedback",
                                    description: "Receive specific suggestions to improve keywords, skills, and formatting for better ATS performance.",
                                },
                                {
                                    title: "Recruiter Tools",
                                    description: "Post jobs and evaluate candidates with ATS scores to streamline hiring.",
                                },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border card-border"
                                >
                                    <h3 className="text-xl font-semibold text-purple-500 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 py-16 text-center bg-white dark:bg-gray-900">
                    <h2 className="text-3xl font-bold text-purple-500 dark:text-white mb-4">
                        Ready to Boost Your Job Search?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Join JobFit Pro today and optimize your resume for success.
                    </p>
                    <button className="px-6 py-3 purple-bg text-white rounded-lg hover:purple-bg">
                        Sign Up Now
                    </button>
                </section>

                {/* Footer */}
                {/* <footer className="blue-bg text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-200">© 2025 JobFit Pro. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-200 hover:text-purple-500 dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-200 hover:text-purple-500 dark:hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-200 hover:text-purple-500 dark:hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer> */}
            </div>
        </div>

    );
};

export default HeroSection;