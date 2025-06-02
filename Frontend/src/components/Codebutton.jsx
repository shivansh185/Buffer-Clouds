import React from "react";

const CodeButton = ({ name, image, onClick, darkMode }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-5 py-3 text-lg font-semibold ${
                darkMode ? "text-white bg-gray-800" : "text-black bg-white/20"
            } backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-300 hover:border-white`}
        >
            <img 
                src={image} 
                alt={`${name} Logo`} 
                className="w-8 h-8 object-contain"
            />
            {name}
        </button>
    );
};

export default CodeButton;
