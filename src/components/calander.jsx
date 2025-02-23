import React, { useState, useEffect } from "react";
import { auth, db, collection, addDoc, doc, getDoc, setDoc } from "../firebase";

const Calendar = ({ darkMode }) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState({});
    const [user, setUser] = useState(null);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                const userTasksRef = doc(db, "tasks", user.uid);
                const userTasksSnap = await getDoc(userTasksRef);
                if (userTasksSnap.exists()) {
                    setTasks(userTasksSnap.data());
                }
            }
        });
    }, []);
    
    const handleDateClick = (date) => {
        setSelectedDate(date);
        setTask(tasks[date] || "");
    };
    
    const handleSaveTask = async () => {
        if (!selectedDate || !user) return;
        const updatedTasks = { ...tasks, [selectedDate]: task };
        setTasks(updatedTasks);
        await setDoc(doc(db, "tasks", user.uid), updatedTasks);
        setSelectedDate(null);
    };
    
    const handleTaskComplete = async (date) => {
        if (!user) return;
        const updatedTasks = { ...tasks };
        delete updatedTasks[date];
        setTasks(updatedTasks);
        await setDoc(doc(db, "tasks", user.uid), updatedTasks);
    };
    
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const days = [...Array(getDaysInMonth(currentMonth, currentYear)).keys()].map(i => i + 1);
    
    return (
        <div className="flex flex-col items-center">
   <div className="group">
    <h3 className="text-xl font-bold drop-shadow-lg mb-4">
        <span className="relative inline-block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Add your task with just one click!
            <span className="absolute left-0 bottom-[-5px] w-full h-[3px] bg-gradient-to-r from-green-400 to-blue-500 
                            scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
        </span>
    </h3>
</div>

            <div className={`p-4 rounded-lg shadow-lg w-80 border ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                <div className="flex justify-between mb-4">
                    <button onClick={() => setCurrentMonth(prev => prev - 1)} disabled={currentMonth === 0}>&lt;</button>
                    <span className="font-semibold">{months[currentMonth]} {currentYear}</span>
                    <button onClick={() => setCurrentMonth(prev => prev + 1)} disabled={currentMonth === 11}>&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                    {days.map(day => {
                        const dateKey = `${day}-${currentMonth}-${currentYear}`;
                        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

                        return (
                            <div
                                key={day}
                                onClick={() => handleDateClick(dateKey)}
                                className={`p-2 rounded-md cursor-pointer border 
                                    ${isToday ? "bg-blue-500 text-white font-bold" : ""}
                                    ${tasks[dateKey] ? "border-red-500 text-red-500" : ""}
                                `}
                            >
                                {day}
                                {tasks[dateKey] && <span className="block text-xs">Task</span>}
                            </div>
                        );
                    })}
                </div>
                {selectedDate && (
                    <div className="mt-4 p-4 bg-gray-200 rounded">
                        <h3>Task for {selectedDate}</h3>
                        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} className="w-full p-2 text-black border" />
                        <button onClick={handleSaveTask} className="bg-blue-500 text-white p-2 mt-2">Save Task</button>
                        <button onClick={() => setSelectedDate(null)} className="bg-gray-400 text-white p-2 mt-2 ml-2">Cancel</button>
                    </div>
                )}
                <div className="mt-4">
                    {Object.entries(tasks).map(([date, task]) => (
                        <div key={date} className="p-2 border mt-2">
                            <p>{date}: {task}</p>
                            <button onClick={() => handleTaskComplete(date)} className="bg-green-500 text-black p-1 mt-1">Task Completed</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;


