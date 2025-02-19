import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { auth, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for logout confirmation popup
    const navigate = useNavigate();

    // Show confirmation modal
    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    // Confirm logout and sign out user
    const handleLogoutConfirm = async () => {
        try {
            await signOut(auth);
            navigate("/Samplesignup");
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setShowLogoutConfirm(false);
        }
    };

    return (
        <div className="flex">
            {/* Toggle Button */}
            <button
                className="absolute top-5 left-5 md:hidden text-white text-2xl z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-600 to-purple-700 text-white p-6 shadow-lg transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}>
                <h1 className="text-3xl font-extrabold mb-6 text-center">My Sidebar</h1>
                <ul className="space-y-4">
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
                        <FaHome />
                        <button onClick={() => navigate("/")}>Home</button>
                    </li>
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
                        <FaInfoCircle />
                        <a href="#">About</a>
                    </li>
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
                        <FaServicestack />
                        <a href="#">Services</a>
                    </li>
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
                        <FaEnvelope />
                        <a href="#">Contact</a>
                    </li>
                    {/* Logout Button with Confirmation Popup */}
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-white hover:text-red-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer" onClick={handleLogoutClick}>
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>

            {/* Main Content (Push content right when sidebar is open) */}
            <div className={`flex-grow p-6 transition-all duration-300 md:ml-64 ${isOpen ? "ml-64" : "ml-0"}`}>
                {/* Your main content here */}
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to logout?</h2>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleLogoutConfirm}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Yes, Logout
                            </button>
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;

