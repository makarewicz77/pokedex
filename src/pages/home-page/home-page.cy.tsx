import React from "react";
import { mount } from "@cypress/react18";
import HomePage from "./home-page";

it("renders home page component", () => {
  mount(<HomePage />);
  cy.get("h3").contains("Welcome in POKEDEX!");
});
