import React, { useState, useRef } from "react";
import {
  FaSun, FaBold, FaItalic, FaUnderline, FaStrikethrough, FaSubscript, FaSuperscript,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaListUl, FaListOl, FaImage
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Import Firestore
import { addDoc, collection } from "firebase/firestore"; // Firestore functions

const Note = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { noteTitle, noteContent } = location.state || { noteTitle: "Untitled Note", noteContent: "" };
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [activeStyles, setActiveStyles] = useState({});
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const noteRef = useRef(null);

  const handleSave = async () => {
    const noteText = noteRef.current.innerHTML;
    const currentUser  = auth.currentUser ;
    
    if (currentUser ) {
      // Save note to Firestore
      await addDoc(collection(db, "notes"), {
        title: noteTitle,
        content: noteText,
        uid: currentUser .uid,
      });
      setShowSaveMessage(true);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const applyStyle = (command) => {
    document.execCommand(command, false, null);
    setActiveStyles((prev) => ({
      ...prev,
      [command]: !prev[command],
    }));
  };

  const insertImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl) {
      document.execCommand("insertImage", false, imageUrl);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center relative overflow-hidden ${
        isDarkMode ? "bg-black text-white" : "bg-gradient-to-r from-blue-500 to-purple-600 text-black"
      }`}
    >
      {/* Toolbar Box at the Top */}
      <div className="bg-white p-3 shadow-md fixed top-0 left-0 right-0 flex items-center justify-between z-50">
        <div className="flex flex-wrap gap-2">
          <button onClick={toggleDarkMode} className="bg-blue-500 text-white p-2 rounded-lg">
            <FaSun />
          </button>

          {/* Formatting Buttons with Rounded Corners and Smooth Animation */}
          {[
            { command: "bold", icon: <FaBold /> },
            { command: "italic", icon: <FaItalic /> },
            { command: "underline", icon: <FaUnderline /> },
            { command: "strikethrough", icon: <FaStrikethrough /> },
            { command: "subscript", icon: <FaSubscript /> },
            { command: "superscript", icon: <FaSuperscript /> },
            { command: "justifyLeft", icon: <FaAlignLeft /> },
            { command: "justifyCenter", icon: <FaAlignCenter /> },
            { command: "justifyRight", icon: <FaAlignRight /> },
            { command: "insertUnorderedList", icon: <FaListUl /> },
            { command: "insertOrderedList", icon: <FaListOl /> },
          ].map(({ command, icon }) => (
            <button
              key={command}
              onClick={() => applyStyle(command)}
              className={`p-2 rounded-lg transition-all duration-150 ease-in-out transform ${
                activeStyles[command] ? "scale-105 bg-blue-700" : "bg-blue-500 text-white"
              }`}
            >
              {icon}
            </button>
          ))}

          <button onClick={insertImage} className="bg-blue-500 text-white p-2 rounded-lg">
            <FaImage />
          </button>

          {/* Font Color Picker */}
          <input
            type="color"
            className="w-10 h-10 border-none cursor-pointer rounded-lg"
            value={selectedColor}
            onChange={(e) => {
              setSelectedColor(e.target.value);
              document.execCommand("foreColor", false, e.target.value);
            }}
          />
        </div>

        {/* Save Button at the Top-Right Corner */}
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg p-3 text-white text-lg font-bold rounded-lg hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      {/* Content Area */}
      <div className="w-3/4 max-w-5xl bg-white shadow-lg p-6 mt-20">
        <h1 className="pt-4 pb-4 font-bold text-6xl text-center text-black">
          {noteTitle}
        </h1>

        {/* Editable Note Section (No Rounded Corners) */}
        <div
          ref={noteRef}
          contentEditable
          suppressContentEditableWarning
          className="border p-4 shadow-md border-gray-300 w-full text-lg min-h-[500px] max-h-[700px] overflow-y-auto bg-white text-black"
          dangerouslySetInnerHTML={{ __html: noteContent }}
        />
      </div>

      {/* Save Message Box */}
      {showSaveMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold text-black">✅ Note Saved Successfully!</h2>
            <button
              onClick={() => setShowSaveMessage(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;