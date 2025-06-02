import React from "react";
export function Button({ children, variant = "default", onClick }) {
    const baseStyles = "px-4 py-2 font-semibold rounded-lg transition-all";
    const variants = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
    };

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant] || variants.default}`}>
            {children}
        </button>
    );
}
