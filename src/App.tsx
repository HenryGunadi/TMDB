import { Route, Routes, useLocation, useRoutes } from "react-router-dom";
import Home from "./components/Home";
import FilmDetail from "./components/FilmDetail";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CastDetail from "./components/CastDetails";
import SearchDetail from "./components/SearchDetail";
import GenreDetail from "./components/GenreDetail";
import { useState } from "react";
import "./css/App.css";

function App() {
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  return (
    <>
      <Navbar onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)} />
      <div className={`App ${isSearchFocused ? "searchFocused" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmDetail/:type/:id" element={<FilmDetail />} />
          <Route path="/castDetail/:castData" element={<CastDetail />} />
          <Route path="/searchDetail/:searchData" element={<SearchDetail />} />
          <Route path="/genre_detail/:id" element={<GenreDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
