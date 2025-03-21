import React, { useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DataContext } from "../context/DataContext";
import "../styles/CalendarDark.css"; // Custom dark theme styles

// Define mood emojis
const moods = {
  rad: "😆",
  good: "😊",
  meh: "😐",
  bad: "☹️",
  awful: "😢",
};

// Function to get most selected emoji per date
const getMoodByDate = (moodHistory) => {
  const moodCount = {};

  moodHistory.forEach(({ date, mood }) => {
    if (!moodCount[date]) {
      moodCount[date] = {};
    }
    moodCount[date][mood] = (moodCount[date][mood] || 0) + 1;
  });

  const mostSelectedMoods = {};
  Object.keys(moodCount).forEach((date) => {
    const sortedMoods = Object.entries(moodCount[date]).sort(
      (a, b) => b[1] - a[1]
    );
    mostSelectedMoods[date] = moods[sortedMoods[0][0]] || ""; // Map mood to emoji
  });

  return mostSelectedMoods;
};

const EmojiCalendar = () => {
  const { moodHistory } = useContext(DataContext);
  const moodByDate = getMoodByDate(moodHistory);

  return (
    <div className="p-4 m-4 bg-gray-900 rounded-lg shadow-lg shadow-gray-700">
      <h2 className="text-white text-center text-2xl font-bold mb-4">
        Mood Calendar
      </h2>

      <Calendar
        tileContent={({ date }) => {
          const dateKey = date.toLocaleDateString("en-CA"); // Fix for timezone issue
          const emoji = moodByDate[dateKey] || "";
          return <div className="text-2xl">{emoji}</div>;
        }}
        className="calendar-dark w-full shadow-lg border-none"
      />
    </div>
  );
};

export default EmojiCalendar;
