import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Sidebar from "../components/SideBar";

const Home = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("User");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Fetch the username from Firestore by matching UID
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("uid", "==", currentUser.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setUsername(querySnapshot.docs[0].data().username);
                } else {
                    setUsername(currentUser.displayName || "User");
                }
            } else {
                navigate("/Samplesignup"); // Redirect if not logged in
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-xl font-semibold">Checking authentication...</h2>
            </div>
        );
    }

    return (
        <div className="flex">
            {/* Sidebar - Fixed Position */}
            <div className="w-64 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-black fixed">
                <Sidebar />
            </div>

            {/* Main Content - Adjusted for Sidebar */}
            <div className="flex-grow p-6 ml-64">
                {/* Top Left - After Sidebar */}
                <div className="flex flex-col items-start p-4">
                    <p className="text-gray-600 text-lg">
                     {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-md">
                        Welcome, {username}!
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Home;
