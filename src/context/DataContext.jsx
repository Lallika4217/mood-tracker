import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Retrieve stored data from localStorage or initialize an empty array
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("moodRecords")) || [];
  });

  // Save mood history to localStorage when state updates
  useEffect(() => {
    localStorage.setItem("moodRecords", JSON.stringify(moodHistory));
  }, [moodHistory]);

  // Function to save a new mood entry
  const saveMood = (mood, date, time) => {
    const newEntry = { date, time, mood };
    setMoodHistory((prevHistory) => [...prevHistory, newEntry]);
    setSelectedMood(null); // Reset selection after saving
  };

  return (
    <DataContext.Provider
      value={{ selectedMood, setSelectedMood, moodHistory, saveMood }}
    >
      {children}
    </DataContext.Provider>
  );
};
