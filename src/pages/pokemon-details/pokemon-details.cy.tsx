import React from "react";
import { mount } from "@cypress/react18";
import PokemonDetails from "./pokemon-details";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("Pokemon Details Page", () => {
  it("renders pokemon details component", () => {
    mount(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    cy.visit("/pokemon-details/xy8-40");

    cy.intercept(
      {
        method: "GET",
        url: "/card/*",
      },
      {
        fixture: "mock-card.json",
      }
    ).as("getCard");

    // cy.stub(PokemonDetails, "useParams").returns({
    //   cardId: "xy8-40",
    // });

    cy.get("h3").contains("Pokemon details");
  });
});
