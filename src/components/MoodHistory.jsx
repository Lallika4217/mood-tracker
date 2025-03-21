import { useContext } from "react";src/components/MoodHistory.jsx
import { DataContext } from "../context/DataContext";

const MoodHistory = () => {
  const { moodHistory } = useContext(DataContext);
  if (moodHistory?.length === 0) return null; // Hide if no history
  return (
    <div className="mt-8 p-4 w-full max-w-md bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold mb-2 text-green-300">
        Mood History
      </h2>
      <ul className="space-y-2">
        {moodHistory
          ?.slice()
          .reverse()
          .map((entry, index) => (
            <li key={index} className="text-sm text-gray-300">
              {entry.date} at {entry.time} →{" "}
              <span className="font-bold text-green-400">{entry.mood}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MoodHistory;
