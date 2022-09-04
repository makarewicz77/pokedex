import React from "react";
import { mount } from "@cypress/react18";
import PokemonList from "./pokemon-list";
import { BrowserRouter } from "react-router-dom";

it("renders pokemon list component", () => {
  mount(
    <BrowserRouter>
      <PokemonList />
    </BrowserRouter>
  );
  cy.get("h3").contains("Pokemon List");
});
