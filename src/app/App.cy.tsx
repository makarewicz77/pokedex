import React from "react";
import { mount } from "@cypress/react18";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

it("renders app component with header", () => {
  mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  cy.get("a").contains("Pokemon List");
  cy.get("a").contains("POKEDEX");
  cy.get("button").contains("Menu");
});
