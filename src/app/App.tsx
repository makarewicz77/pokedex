import { Grid, styled } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/header/header";
import HomePage from "../pages/home-page/home-page";
import PokemonDetails from "../pages/pokemon-details/pokemon-details";
import PokemonList from "../pages/pokemon-list/pokemon-list";

const AppContainer = styled(Grid)(() => ({
  marginTop: "80px",
}));

function App() {
  return (
    <div id="app">
      <Router>
        <header>
          <Header />
        </header>
        <AppContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon-list" element={<PokemonList />} />
            <Route
              path="/pokemon-details/:cardId"
              element={<PokemonDetails />}
            />
          </Routes>
        </AppContainer>
      </Router>
    </div>
  );
}

export default App;
