import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";
import Fashion from "./pages/Fashion";
import Games from "./pages/Games";
import Internet from "./pages/Internet";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/music" element={<Music />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/games" element={<Games />} />
        <Route path="/internet" element={<Internet />} />
      </Route>
    </Routes>
  );
}
