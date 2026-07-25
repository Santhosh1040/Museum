import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Artists from "./pages/Artists";
import Artworks from "./pages/Artworks";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artworks" element={<Artworks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;