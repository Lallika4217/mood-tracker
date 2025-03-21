import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const MoodHistory = () => {
  const { moodHistory } = useContext(DataContext);

  if (moodHistory.length === 0) return null;

  return (
    <div className="p-4 w-full bg-gray-900 md:m-4 rounded-lg shadow-lg shadow-gray-700">
      <h2 className="text-lg font-semibold mb-2 text-green-400">
        Mood History
      </h2>
      <ul className="space-y-2">
        {moodHistory
          .slice()
          .reverse()
          .map((entry, index) => (
            <li key={index} className="text-sm text-gray-300">
              {entry.date} at {entry.time} →{" "}
              <span className="font-bold text-green-400">{entry.mood}</span>
              {entry.note && (
                <p className="text-gray-400 mt-1 italic">"{entry.note}"</p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MoodHistory;
