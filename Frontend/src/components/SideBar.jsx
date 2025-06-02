import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope,FaRegStickyNote,FaCommentDots, FaBars, FaTimes, FaSignOutAlt, FaMoon, FaSun, FaUserTimes } from "react-icons/fa";
import { auth, deleteUser, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";
import Avatar2 from "../components/avatar2"; 

const Sidebar = ({ toggleDarkMode, darkMode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

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

    const handleDeleteAccountClick = () => {
        setShowDeleteConfirm(true);
    };

    const handleDeleteAccountConfirm = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await deleteUser(user);
                navigate("/Samplesignup");
            }
        } catch (error) {
            console.error("Account deletion failed", error);
        } finally {
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div>
            <button
                className="absolute top-5 left-5 md:hidden text-white text-2xl z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`fixed top-0 left-0 h-screen w-64 p-4 shadow-lg border-r transition-all duration-300 z-40 ${darkMode ? "bg-slate-800 text-white border-gray-600" : "bg-gradient-to-b from-blue-600 to-purple-700 text-white border-gray-300"}`}>
            <h1 className="text-4xl font-extrabold mb-6 text-center drop-shadow-lg ">
<div className="SiteName cursor-pointer " onClick={()=>navigate("/")} >
<span className="text-purple-500 ">Buffer</span>
<span className="text-blue-500 ">Clouds</span>
</div>
</h1>


                <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-lg font-medium hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer ml-7"
                onClick={()=>navigate("/userprofile")}>
                        <Avatar2 /> 
                    </li>
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-700 hover:text-white px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
                        <FaHome />
                        <button onClick={() => navigate("/")}>Home</button>
                    </li>
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-700 hover:text-white px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
                        <FaInfoCircle />
                        <a><button onClick={()=>navigate("/about")}>About</button></a>
                    </li>
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-700 hover:text-white px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
    <FaCommentDots />
    <button onClick={() => navigate(`/chatroom?darkMode=${darkMode}`)}>Create Chat</button>
</li>
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-700 hover:text-white px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
                    <FaRegStickyNote />
                        <a ><button onClick={()=>navigate("/createnotes")}>Notes</button></a>
                    </li>
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-700 hover:text-red-400 px-4 py-2 rounded-lg transition duration-300 cursor-pointer" onClick={handleLogoutClick}>
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </li>
                    <li className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-700 hover:text-red-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer" onClick={handleDeleteAccountClick}>
                        <FaUserTimes />
                        <span>Delete Account</span>
                    </li>
                </ul>

                <button onClick={toggleDarkMode} className="absolute bottom-6 right-6 flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-full shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-300 hover:border-white">
                    {darkMode ? <FaSun className="text-yellow-400 text-2xl" /> : <FaMoon className="text-gray-300 text-2xl" />}
                </button>
            </div>

            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center w-80">
                        <h2 className="text-black font-semibold mb-4">Are you sure you want to logout?</h2>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleLogoutConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Yes, Logout</button>
                            <button onClick={() => setShowLogoutConfirm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center w-80">
                        <h2 className="text-black font-semibold mb-4">Are you sure you want to delete your account permanently?</h2>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleDeleteAccountConfirm} className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition">Yes, Delete</button>
                            <button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;



