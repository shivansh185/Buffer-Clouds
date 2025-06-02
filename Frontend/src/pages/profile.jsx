import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import { Card, CardContent } from "../components/cards";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { FaLinkedin, FaInstagram, FaGithub, FaClock, FaFolder, FaEdit } from "react-icons/fa";
import { auth, db } from "../firebase"; // Ensure correct import
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function UserProfile() {
    const navigate = useNavigate(); // Hook for redirection

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        profession: "",
        linkedin: "",
        instagram: "",
        github: "",
    });

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingLinks, setIsEditingLinks] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const [projectsCreated, setProjectsCreated] = useState(5);
    const [userId, setUserId] = useState(null);

    // Track time spent on page
    useEffect(() => {
        const interval = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    // Fetch user profile from Firestore on authentication change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                setUserId(authUser.uid);
                const userRef = doc(db, "users", authUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUser(userSnap.data());
                } else {
                    // Save new user with default data
                    await setDoc(userRef, { ...user, email: authUser.email });
                }
            }
        });

        return () => unsubscribe();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Save updated profile and redirect
    const handleSaveProfile = async () => {
        if (userId) {
            try {
                await setDoc(doc(db, "users", userId), user, { merge: true });
                setIsEditingProfile(false);
                setIsEditingLinks(false);
                navigate("/home"); // Redirect to /home
            } catch (error) {
                console.error("Error saving profile:", error);
            }
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-500 to-blue-500 p-6">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Profile Card */}
                <Card className="relative flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-xl">
                    <div className="relative w-24 h-24 flex items-center justify-center bg-gray-300 text-gray-800 text-2xl font-bold rounded-full mb-4">
                        {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <h2 className="text-xl font-bold">{user.name || "User"}</h2>
                    <p className="text-gray-600">{user.profession || "Profession"}</p>
                    <p className="text-gray-500">{user.address || "Address"}</p>

                   
                </Card>

                {/* User Information */}
                <Card className="relative col-span-2 bg-white shadow-lg rounded-xl p-6">
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-2">User Details</h3>

                        {!isEditingProfile ? (
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>Address:</strong> {user.address}</p>
                                <p><strong>Profession:</strong> {user.profession}</p>
                            </div>
                        ) : (
                            <>
                                {["name", "phone", "address", "profession"].map((field) => (
                                    <div key={field} className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </label>
                                        <Input type="text" name={field} value={user[field] || ""} onChange={handleChange} />
                                    </div>
                                ))}
                            </>
                        )}

                        <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <Button className="p-2 bg-blue-500 text-white rounded-full" onClick={() => setIsEditingProfile(!isEditingProfile)}>
                                <FaEdit />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Social Links Card */}
                <Card className="relative col-span-3 transition-all duration-300 bg-white shadow-lg rounded-xl p-6">
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-2">Social Profiles</h3>

                        {!isEditingLinks ? (
                            <div className="flex space-x-4 mt-3 justify-center">
                                {user.linkedin && <a href={user.linkedin} target="_blank" className="text-blue-600 text-2xl"><FaLinkedin /></a>}
                                {user.instagram && <a href={user.instagram} target="_blank" className="text-pink-600 text-2xl"><FaInstagram /></a>}
                                {user.github && <a href={user.github} target="_blank" className="text-gray-800 text-2xl"><FaGithub /></a>}
                            </div>
                        ) : (
                            <>
                                {["linkedin", "instagram", "github"].map((platform) => (
                                    <div key={platform} className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                        </label>
                                        <Input type="text" name={platform} placeholder={`Enter ${platform} URL`} value={user[platform] || ""} onChange={handleChange} />
                                    </div>
                                ))}
                            </>
                        )}

                        <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <Button className="p-2 bg-blue-500 text-white rounded-full" onClick={() => setIsEditingLinks(!isEditingLinks)}>
                                <FaEdit />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats & Save Button */}
                <Card className="col-span-3 text-center p-6 bg-white shadow-lg rounded-xl">
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
                        <div className="flex justify-around items-center text-gray-700 text-lg">
                            <div className="flex flex-col items-center">
                                <FaClock className="text-blue-500 text-3xl mb-1" />
                                <span className="font-bold">{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</span>
                                <span className="text-sm">Time Spent</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaFolder className="text-green-500 text-3xl mb-1" />
                                <span className="font-bold">{projectsCreated}</span>
                                <span className="text-sm">Projects Created</span>
                            </div>
                        </div>
                        <Button className="mt-4 bg-green-500 text-white p-2 rounded" onClick={handleSaveProfile}>Save Profile</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
