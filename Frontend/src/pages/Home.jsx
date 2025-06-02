import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore"; // ✅ updated from getDocs to getDoc
import Sidebar from "../components/SideBar";
import Calendar from "../components/calander";
import CodeButton from "../components/Codebutton";

const Home = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("User");
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                try {
                    const userDocRef = doc(db, "users", currentUser.uid); // ✅ access document by UID
                    const userSnap = await getDoc(userDocRef);

                    if (userSnap.exists()) {
                        setUsername(userSnap.data().username || "User");
                    } else {
                        setUsername(currentUser.displayName || "User");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUsername(currentUser.displayName || "User");
                }

            } else {
                navigate("/Samplesignup");
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        document.body.className = darkMode ? "bg-gray-900 text-white" : "bg-white text-black";
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-xl font-semibold">Checking authentication...</h2>
            </div>
        );
    }

    const programmingLanguages = [
        { name: "JavaScript", image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png", route: "/codeeditor" },
        { name: "Python", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", route: "/pycodeeditor" },
        { name: "Java", image: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg", route: "/javaeditor" },
        { name: "C++", image: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg", route: "/cppeditor" },
        { name: "C", image: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png", route: "/c-editor" },
        { name: "C#", image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png", route: "/Csharpeditor" },
        { name: "TypeScript", image: "https://www.typescriptlang.org/icons/icon-48x48.png", route: "/typescripteditor" }
    ];

    return (
        <div className={`w-screen min-h-screen flex items-center overflow-x-hidden ${
            darkMode
                ? "bg-[#010e28] bg-[linear-gradient(to_bottom,_#082740_1px,_transparent_1px),_linear-gradient(to_right,_#082740_1px,_transparent_1px)] [background-size:30px_30px] bg-center animate-bgmove"
                : "bg-white bg-[linear-gradient(to_bottom,_#d0cece_1px,_transparent_1px),_linear-gradient(to_right,_#f0f0f0_1px,_transparent_1px)] [background-size:30px_30px] bg-center animate-bgmove"
        }`}>

            {/* Sidebar */}
            <div className="w-64 min-h-screen">
                <Sidebar toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center flex-grow p-6">
                
                {/* Welcome Message */}
                <div className="absolute top-6 left-72">
                    <div className="flex flex-col items-start p-4">
                        <p className="text-gray-600 text-lg">
                            {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 
                text-transparent bg-clip-text drop-shadow-md relative 
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] 
                after:bg-gradient-to-r from-blue-500 to-purple-600 after:transition-all after:duration-500 
                hover:after:w-full">
                            Welcome, {username}!
                        </h1>
                    </div>
                </div>

                {/* Create Notes Button */}
                <div className="absolute top-32 left-72 flex flex-col items-center">
                    <h2 className="text-xl font-bold text-gray-400 dark:text-white mb-3">
                        Create Notes
                    </h2>
                    <button 
                        onClick={() => navigate("/createnotes")} 
                        className="w-40 h-30 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg rounded-2xl 
                                shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                    >
                        + Create
                    </button>
                </div>

                {/* Language Selection Heading */}
                <div className="absolute top-64 left-[46.1%] transform -translate-x-1/2 text-center">
                    <div className="group">
                        <h3 className="text-3xl md:text-4xl lg:text-3xl font-bold drop-shadow-lg text-white">
                            <span className="relative inline-block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                Choose Your Language & Start Coding
                                <span className="absolute left-0 bottom-[-5px] w-full h-[3px] bg-gradient-to-r from-green-400 to-blue-500 
                                scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                            </span> 
                            <br />
                            <span className="relative inline-block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                Instantly!
                                <span className="absolute left-0 bottom-[-5px] w-full h-[3px] bg-gradient-to-r from-green-400 to-blue-500 
                                scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                            </span>
                        </h3>
                    </div>
                </div>

                {/* Code Buttons */}
                <div className="absolute top-50 left-[46%] transform -translate-x-1/2 grid grid-cols-2 gap-4 w-full max-w-2xl p-6 rounded-lg">
                    {programmingLanguages.map((lang) => (
                        <CodeButton 
                            key={lang.name}
                            name={lang.name}
                            image={lang.image}
                            onClick={() => navigate(lang.route)}
                            darkMode={darkMode} 
                        />
                    ))}
                </div>
            </div>

            {/* Tagline Below */}
            <div className="absolute top-[calc(50px+100%)] left-[50%] transform -translate-x-1/2 text-center w-full max-w-2xl mt-16 pb-16">
                <div className="w-full max-w-xl text-center mx-auto">
                    <div className="group">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug drop-shadow-lg">
                            <span className="relative inline-block bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                                The best place to build, test, and learn
                                <span className="absolute left-0 bottom-[-5px] w-full h-[3px] bg-gradient-to-r from-indigo-400 to-pink-400 
                                scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                            </span>
                            <br />
                            <span className="relative inline-block bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                                coding from start.
                                <span className="absolute left-0 bottom-[-5px] w-full h-[3px] bg-gradient-to-r from-indigo-400 to-pink-400 
                                scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                            </span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div className="absolute bottom-1.5 right-1">
                <Calendar darkMode={darkMode} toggleDarkMode={setDarkMode} />
            </div>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 w-full text-center py-3 bg-gray-500 text-white">
                <h2 className="text-lg md:text-xl font-semibold">BufferDevs</h2>
            </footer>
        </div>
    );
};

export default Home;
