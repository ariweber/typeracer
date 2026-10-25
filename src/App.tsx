import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import GamePage from "./pages/GamePage";
import SetsPage from "./pages/SetsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<GamePage />} />
        <Route path="/sets" element={<SetsPage />} />
      </Route>
    </Routes>
  );
}
