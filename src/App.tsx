import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./pages/home-page";
import PokemonDetails from "./pages/pokemon-details";
import PokemonList from "./pages/pokemon-list";

function App() {
  return (
    <div id="app">
      <Router>
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon-list" element={<PokemonList />} />
          <Route path="/pokemon-details/:cardId" element={<PokemonDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
