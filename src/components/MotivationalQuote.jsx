import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const staticQuote = {
  quote:
    "The only limit to our realization of tomorrow is our doubts of today.",
  author: "Franklin D. Roosevelt",
};

const MotivationalQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      const apiKey = import.meta.env.VITE_QUOTE_API;
      const currentDate = new Date().toISOString().split("T")[0];

      try {
        // Check localStorage for a cached quote
        const cachedQuote = localStorage.getItem("dailyQuote");
        const lastUpdated = localStorage.getItem("lastUpdated");

        if (cachedQuote && lastUpdated === currentDate) {
          const storedQuote = JSON.parse(cachedQuote);
          setQuote(storedQuote.quote);
          setAuthor(storedQuote.author);
          return;
        }

        // Fetch new quote from API
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/quotes",
          {
            headers: { "X-Api-Key": apiKey },
          }
        );

        const newQuote = response.data[0];

        // Save the new quote in localStorage
        localStorage.setItem("dailyQuote", JSON.stringify(newQuote));
        localStorage.setItem("lastUpdated", currentDate);

        setQuote(newQuote.quote);
        setAuthor(newQuote.author);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
        setQuote(staticQuote.quote);
        setAuthor(staticQuote.author);
      }
    };

    fetchQuote();
  }, []); // Runs only once when the component mounts

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
      <motion.h2
        className="text-2xl font-bold mb-4 text-green-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Emotomate
      </motion.h2>

      <motion.p
        className="text-lg text-center italic"
        key={quote}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        "{quote}"
      </motion.p>

      <motion.p
        className="mt-2 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        - {author}
      </motion.p>
    </div>
  );
};

export default MotivationalQuote;
