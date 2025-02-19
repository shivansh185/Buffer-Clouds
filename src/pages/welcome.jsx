import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate(); 
    const words = ["WELCOME TO BUFFER CLOUDS"];
    const [currentWord, setCurrentWord] = useState(""); 
    const [isDeleting, setIsDeleting] = useState(false); // Flag to handle deletion
    const [index, setIndex] = useState(0); // Index to manage which word is being typed
    const [letterIndex, setLetterIndex] = useState(0); // Letter index to control typing and deleting

    // Typewriter Effect
    useEffect(() => {
        const type = () => {
            if (isDeleting) {
                setCurrentWord(prev => prev.substring(0, letterIndex - 1));
                setLetterIndex(prev => prev - 1);

                if (letterIndex === 0) {
                    setIsDeleting(false);
                    setIndex(prev => (prev + 1) % words.length); // Loop back to the start
                }
            } else {
                setCurrentWord(words[index].substring(0, letterIndex + 1));
                setLetterIndex(prev => prev + 1);

                if (letterIndex === words[index].length) {
                    setIsDeleting(true);
                }
            }
        };

        const typingSpeed = 100; // Speed of typing
        const deletingSpeed = 50; // Speed of deleting
        const delayBetweenWords = 1000; // Delay before starting next word

        const timer = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);

        if (letterIndex === 0 && !isDeleting) {
            setTimeout(() => {}, delayBetweenWords);
        }

        return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }, [letterIndex, isDeleting, index, words]);
    

    return (
        	
<div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="text-center mt-20">
                <div className="w-full h-full flex justify-center items-center">
                    <h1 id="typewriter" className="text-4xl font-bold">{currentWord}</h1>
                </div>
                <p className="text-lg opacity-80 max-w-2xl mx-auto animate-slideUp">
                    Experience the best CLOUD IDE with modern technologies and a seamless user interface.
                </p>
                <button
                    onClick={() => navigate("/Samplesignup")} // Redirect to /home on click
                    className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Welcome;
