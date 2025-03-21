import React from "react";
import MoodHistory from "./MoodHistory";
import EmojiCalendar from "./EmojiCalendar";
import MotivationalQuote from "./MotivationalQuote";
import OpenSelection from "./OpenSelection";
import Graph from "./Graph";

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-evenly min-h-screen h-full bg-black">
      <div>
        <MotivationalQuote />
      </div>
      <div className="flex flex-col md:flex-row md:justify-evenly">
        <EmojiCalendar />
        <MoodHistory />
      </div>
      <Graph />
      <OpenSelection />
    </div>
  );
};

export default Dashboard;
