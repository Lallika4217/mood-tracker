import { useState, useContext } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { DataContext } from "../context/DataContext";

const moods = [
  {
    label: "rad",
    color: "text-teal-400",
    emoji: "😆",
    lottieUrl:
      "https://fonts.gstatic.com/s/e/notoemoji/latest/1f606/lottie.json",
  },
  {
    label: "good",
    color: "text-green-400",
    emoji: "😊",
    lottieUrl:
      "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60a/lottie.json",
  },
  {
    label: "meh",
    color: "text-blue-400",
    emoji: "😐",
    lottieUrl:
      "https://fonts.gstatic.com/s/e/notoemoji/latest/1f610/lottie.json",
  },
  {
    label: "bad",
    color: "text-orange-400",
    emoji: "☹️",
    lottieUrl:
      "https://fonts.gstatic.com/s/e/notoemoji/latest/2639_fe0f/lottie.json",
  },
  {
    label: "awful",
    color: "text-red-400",
    emoji: "😢",
    lottieUrl:
      "https://fonts.gstatic.com/s/e/notoemoji/latest/1f622/lottie.json",
  },
];

const Selection = () => {
  const { selectedMood, setSelectedMood, saveMood, moodHistory } =
    useContext(DataContext);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [isAnimating, setIsAnimating] = useState(true); // Controls wave animation

  // Lottie options
  const getLottieOptions = (lottieUrl) => ({
    loop: false,
    autoplay: true,
    path: lottieUrl,
  });

  const handleMoodClick = (mood) => {
    if (selectedMood === mood) {
      setSelectedMood(null);
      setIsAnimating(true);
    } else {
      setSelectedMood(mood);
      setIsAnimating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-3xl font-bold mb-4">How are you?</h1>

      {/* Date and Time Inputs */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-transparent border-b border-green-400 text-green-400 text-lg outline-none"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-transparent border-b border-green-400 text-green-400 text-lg outline-none"
        />
      </div>

      {/* Wave Animation for Moods */}
      <div className="flex gap-6 mt-12">
        {moods.map((mood, index) => (
          <motion.div
            key={mood.label}
            onClick={() => handleMoodClick(mood.label)}
            className="cursor-pointer"
            animate={isAnimating ? { y: [0, -40, 0] } : { y: 0 }}
            transition={{
              duration: 3, // Animation duration
              repeat: isAnimating ? Infinity : 0, // Keep repeating if animation is active
              ease: "easeInOut", // Smooth transition
              delay: index * 0.2, // Staggered start for wave effect
              repeatDelay: 2, // Delay after each complete cycle
            }}
          >
            {selectedMood === mood.label ? (
              <Lottie
                options={getLottieOptions(mood.lottieUrl)}
                height={100}
                width={100}
              />
            ) : (
              <div
                className={`flex flex-col items-center ${mood.color} text-xl`}
              >
                <span className="text-6xl">{mood.emoji}</span>
                <span>{mood.label}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Save Selection Button */}
      {selectedMood && (
        <button
          className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg"
          onClick={() => saveMood(selectedMood, date, time)}
        >
          Save Selection
        </button>
      )}

      {/* Mood History Section */}
      {moodHistory.length > 0 && (
        <div className="mt-8 p-4 w-full max-w-md bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-green-300">
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
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Selection;
