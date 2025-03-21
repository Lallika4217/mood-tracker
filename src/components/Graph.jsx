import React, { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DataContext } from "../context/DataContext";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define numerical values for moods
const moodValues = {
  rad: 5,
  good: 4,
  meh: 3,
  bad: 2,
  awful: 1,
};

const moodColors = {
  rad: "rgba(13, 202, 240, 0.6)", // Teal
  good: "rgba(40, 167, 69, 0.6)", // Green
  meh: "rgba(255, 193, 7, 0.6)", // Yellow
  bad: "rgba(255, 87, 34, 0.6)", // Orange
  awful: "rgba(220, 53, 69, 0.6)", // Red
};

const Graph = () => {
  const { moodHistory } = useContext(DataContext);
  const [viewMode, setViewMode] = useState("individual"); // Toggle state

  if (!moodHistory.length) {
    return (
      <div className="text-white text-center p-4">
        <p>No mood data available. Start logging to see trends!</p>
      </div>
    );
  }

  // Group mood occurrences by date
  const moodTrends = {};
  moodHistory.forEach(({ date, mood }) => {
    if (!moodTrends[date]) moodTrends[date] = [];
    moodTrends[date].push(moodValues[mood]); // Store mood scores
  });

  // Extract unique dates in order
  const labels = Object.keys(moodTrends).sort();

  // Compute average mood score per day
  const averageMoodScores = labels.map((date) => {
    const scores = moodTrends[date];
    return scores.reduce((sum, value) => sum + value, 0) / scores.length;
  });

  // Individual mood datasets (Same as before)
  const individualDatasets = Object.keys(moodValues).map((mood) => ({
    label: mood.charAt(0).toUpperCase() + mood.slice(1),
    data: labels.map((date) => {
      const scores = moodTrends[date] || [];
      return scores.filter((value) => value === moodValues[mood]).length;
    }),
    borderColor: moodColors[mood],
    backgroundColor: moodColors[mood],
    tension: 0.4,
    fill: false,
  }));

  // Combined average dataset (New)
  const combinedDataset = {
    label: "Average Mood Score",
    data: averageMoodScores,
    borderColor: "rgba(255, 255, 255, 0.8)", // White line for combined graph
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    tension: 0.4,
    fill: false,
  };

  return (
    <div className="p-4 mt-12 bg-gray-900 rounded-lg shadow-lg shadow-gray-700 m-4">
      <h2 className="text-white text-2xl font-bold text-center mb-4">
        Mood Trends Over Time
      </h2>

      {/* Toggle Button */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mx-2 font-bold rounded-lg ${
            viewMode === "individual"
              ? "bg-green-500 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setViewMode("individual")}
        >
          Individual Moods
        </button>
        <button
          className={`px-4 py-2 mx-2 font-bold rounded-lg ${
            viewMode === "combined"
              ? "bg-green-500 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setViewMode("combined")}
        >
          Combined Average
        </button>
      </div>

      {/* Render Graph Based on Selected View */}
      <Line
        data={{
          labels,
          datasets:
            viewMode === "individual" ? individualDatasets : [combinedDataset],
        }}
        options={{
          scales: {
            y: {
              ticks: {
                stepSize: 1,
                callback: (value) =>
                  value === 5
                    ? "😆 Rad"
                    : value === 4
                    ? "😊 Good"
                    : value === 3
                    ? "😐 Meh"
                    : value === 2
                    ? "☹️ Bad"
                    : "😢 Awful",
                color: "white",
              },
            },
            x: {
              ticks: { color: "white" },
            },
          },
          plugins: {
            legend: { labels: { color: "white" } },
          },
        }}
      />
    </div>
  );
};

export default Graph;
