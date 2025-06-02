import React from "react";
export function Input({ type = "text", name, value, onChange, placeholder }) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
    );
}