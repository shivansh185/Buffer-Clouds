import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Import Firestore
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"; // Firestore functions

const Createnotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const currentUser  = auth.currentUser ;
      if (currentUser ) {
        const notesCollection = collection(db, "notes");
        const notesSnapshot = await getDocs(notesCollection);
        const userNotes = notesSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(note => note.uid === currentUser .uid);
        setNotes(userNotes);
      }
    };

    fetchNotes();
  }, []);

  const handleNewNote = () => {
    setShowModal(true);
  };

  const handleSaveNote = async () => {
    const currentUser  = auth.currentUser ;
    if (noteTitle.trim() && currentUser ) {
      const newNote = { title: noteTitle, content: "", uid: currentUser .uid };
      await addDoc(collection(db, "notes"), newNote);
      setNotes([...notes, newNote]);
      navigate("/note", { state: { noteTitle } });
      setShowModal(false);
      setNoteTitle("");
    }
  };

  const openNote = (note) => {
    navigate("/note", { state: { noteTitle: note.title, noteContent: note.content || "" } });
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  const handleDeleteNote = async () => {
    const noteToDelete = notes[deleteIndex];
    await deleteDoc(doc(db, "notes", noteToDelete.id));
    const updatedNotes = notes.filter((_, i) => i !== deleteIndex);
    setNotes(updatedNotes);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold">Your Notes</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <div
                key={note.id}
                className="p-4 bg-white text-black rounded-lg shadow-lg flex flex-col justify-between relative hover:scale-105 transition duration-300 cursor-pointer"
                onClick={() => openNote(note)}
              >
                <h2 className="font-bold text-xl">{note.title}</h2>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {note.content.slice(0, 100) || "No content"}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(index);
                  }}
                  className="absolute top-2 right-2 p-2 text-red-600 hover:text-red-800 transition"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No notes available. Create one!</p>
          )}
        </div>
      </div>

      <button
        onClick={handleNewNote}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 hover:scale-110"
      >
        <FaPencilAlt />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-black">
            <h2 className="text-lg font-semibold mb-2">Enter Note Title</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Note title..."
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-black">
            <h2 className="text-lg font-semibold text-red-600">Delete Note?</h2>
            <p className="mt-2 text-gray-700">This action is irreversible. Do you want to proceed?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleDeleteNote}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Createnotes;