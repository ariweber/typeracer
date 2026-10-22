import { Route, Routes } from "react-router";
import GamePage from "./pages/GamePage";
import SetsPage from "./pages/SetsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GamePage />} />
      <Route path="/sets" element={<SetsPage />} />
    </Routes>
  );
}
