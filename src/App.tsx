import { Routes, Route } from "react-router-dom";
import PokemonHome from "./pages/PokemonHome";
import PokemonTeam from "./pages/PokemonTeam";
import AppBar from "./layouts/AppBar";

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<PokemonHome />} />
        <Route path="/team" element={<PokemonTeam />} />
        {/* <Route path="/team" element={<Team />} /> */}
        {/* <Route path="/projects" element={<Projects />} /> */}
        {/* <Route path="/calendar" element={<Calendar />} /> */}
      </Routes>
    </>
  );
}

export default App;
