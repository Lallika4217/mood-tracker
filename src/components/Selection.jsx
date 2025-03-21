import { useState, useContext } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { DataContext } from "../context/DataContext";
import { X } from "lucide-react";

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
  const { selectedMood, setSelectedMood, saveMood, setSelecting } =
    useContext(DataContext);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [note, setNote] = useState(""); // New state for note-taking
  const [isAnimating, setIsAnimating] = useState(true);

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
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <button
        onClick={() => setSelecting(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-300"
      >
        <X className="w-6 h-6" />
      </button>

      <h1 className="text-3xl font-bold mb-4">How are you?</h1>

      {/* Date, Time Inputs */}
      <div className="flex items-center gap-4 mb-4">
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

      {/* Mood Selection */}
      <div className="flex gap-6 mt-6">
        {moods.map((mood, index) => (
          <motion.div
            key={mood.label}
            onClick={() => handleMoodClick(mood.label)}
            className="cursor-pointer"
            animate={isAnimating ? { y: [0, -40, 0] } : { y: 0 }}
            transition={{
              duration: 3,
              repeat: isAnimating ? Infinity : 0,
              ease: "easeInOut",
              delay: index * 0.2,
              repeatDelay: 2,
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

      {/* Note Input */}
      {selectedMood && (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note (optional)..."
          className="mt-4 w-full max-w-md p-2 bg-gray-800 text-white border border-gray-600 rounded-md resize-none"
        />
      )}

      {/* Save Button */}
      {selectedMood && (
        <button
          className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg"
          onClick={() => {
            setIsAnimating(true);
            saveMood(selectedMood, date, time, note); // Pass note to saveMood function
          }}
        >
          Save Selection
        </button>
      )}
    </div>
  );
};

export default Selection;
