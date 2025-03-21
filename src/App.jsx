import { useContext } from "react";
import Selection from "./components/Selection";
import { DataContext } from "./context/DataContext";
import Dashboard from "./components/Dashboard";

export default function App() {
  const { today, selecting } = useContext(DataContext);
  return selecting ? <Selection /> : <Dashboard />;
}
