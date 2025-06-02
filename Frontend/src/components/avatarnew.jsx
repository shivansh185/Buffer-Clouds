import React from "react";

const Avatar = ({ username }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    return words
      .slice(0, 2) // Take the first two words
      .map((word) => word[0].toUpperCase()) // Get first letter of each word
      .join(""); // Combine the initials
  };

  return <>{getInitials(username)}</>;
};

export default Avatar;


