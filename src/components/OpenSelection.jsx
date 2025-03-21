import React, { useContext } from "react";
import { motion } from "framer-motion";
import { DataContext } from "../context/DataContext";

const OpenSelection = () => {
  const { setSelecting } = useContext(DataContext);

  return (
    <div className="flex flex-col items-center w-full max-w-screen m-4 mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg shadow-gray-700">
      <motion.h2
        className="text-2xl font-bold mb-4 text-green-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How do you feel?
      </motion.h2>

      <motion.button
        onClick={() => setSelecting(true)}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-md transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Log Mood
      </motion.button>
    </div>
  );
};

export default OpenSelection;
