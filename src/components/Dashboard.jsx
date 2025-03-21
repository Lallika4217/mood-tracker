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
        <OpenSelection />
      </div>
      <div className="flex flex-row justify-evenly">
        <EmojiCalendar />
        <MoodHistory />
      </div>
      <Graph />
    </div>
  );
};

export default Dashboard;
