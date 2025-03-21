import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selecting, setSelecting] = useState(false); // Tracks selection state
  const [moodHistory, setMoodHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("moodRecords")) || [];
  });

  // Check if a mood is already selected for today
  const todayDate = new Date().toISOString().split("T")[0];
  const today = moodHistory.some((entry) => entry.date === todayDate);

  // Save mood history to localStorage when state updates
  useEffect(() => {
    localStorage.setItem("moodRecords", JSON.stringify(moodHistory));
  }, [moodHistory]);

  // Function to save a new mood entry
  const saveMood = (mood, date, time) => {
    const newEntry = { date, time, mood };
    setMoodHistory((prevHistory) => [...prevHistory, newEntry]);
    setSelectedMood(null); // Reset selection after saving
    setSelecting(false); // Stop selecting after saving
  };

  return (
    <DataContext.Provider
      value={{
        selectedMood,
        setSelectedMood,
        moodHistory,
        saveMood,
        today, // Whether a mood is already selected today
        selecting,
        setSelecting, // Controls mood selection state
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
