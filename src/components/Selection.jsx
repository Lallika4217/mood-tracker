import { useState } from "react";
import { motion } from "framer-motion";

const moods = [
  { label: "rad", color: "text-teal-400", emoji: "😆" },
  { label: "good", color: "text-green-400", emoji: "😊" },
  { label: "meh", color: "text-blue-400", emoji: "😐" },
  { label: "bad", color: "text-orange-400", emoji: "☹️" },
  { label: "awful", color: "text-red-400", emoji: "😢" },
];

const Selection = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

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

      {/* Emoji Mood Selector with Wave Animation */}
      <div className="flex gap-6 mt-12">
        {moods.map((mood, index) => (
          <motion.div
            key={mood.label}
            className={`flex flex-col items-center ${mood.color} text-xl`}
            animate={{
              y: [0, -40, 0, 0], // Higher jump and return to normal
            }}
            transition={{
              duration: 3, // Wave effect lasts 4 seconds
              repeat: Infinity, // Loop forever
              ease: "easeInOut",
              delay: index * 0.2, // Stagger effect for wave
              repeatDelay: 3, // Wait 3 seconds after each wave
            }}
          >
            <span className="text-6xl">{mood.emoji}</span>
            <span>{mood.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Selection;
