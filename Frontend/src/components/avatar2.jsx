import React, { useEffect, useState } from "react";
import CustomAvatar2 from "./customAvatar";
import { auth, db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore"; // Import Firestore functions

const Avatar2 = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        
        // Real-time listener for changes in Firestore
        const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserName(docSnap.data().username || "User");
          } else {
            setUserName("User"); // Default if no username found
          }
        });

        return () => unsubscribeSnapshot(); // Cleanup Firestore listener
      }
    });

    return () => unsubscribe(); // Cleanup auth listener
  }, []);

  return (
    <nav className="flex justify-center items-center bg-gray-1200 text-white p-4">
      <CustomAvatar2 name={userName} />
    </nav>
  );
};

export default Avatar2;
