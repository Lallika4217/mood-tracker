import { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie"; // Install with: npm install react-lottie

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
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  // State to track which mood has been selected
  const [selectedMood, setSelectedMood] = useState(null);

  // Lottie options – here we use the lottieUrl from the mood object
  const getLottieOptions = (lottieUrl) => ({
    loop: false,
    autoplay: true,
    path: lottieUrl, // use the URL from the mood object
  });

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

      {/* Emoji Mood Selector */}
      <div className="flex gap-6 mt-12">
        {moods.map((mood, index) => (
          <div
            key={mood.label}
            onClick={() => setSelectedMood(mood.label)}
            className="cursor-pointer"
          >
            {selectedMood === mood.label ? (
              // Render Lottie animation when this mood is selected.
              <Lottie
                options={getLottieOptions(mood.lottieUrl)}
                height={100}
                width={100}
              />
            ) : (
              // Render the wave animation if this mood is not selected.
              <motion.div
                className={`flex flex-col items-center ${mood.color} text-xl`}
                animate={{
                  y: [0, -40, 0, 0], // Wave effect
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                  repeatDelay: 3,
                }}
              >
                <span className="text-6xl">{mood.emoji}</span>
                <span>{mood.label}</span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selection;
src/components/Selection.jsx