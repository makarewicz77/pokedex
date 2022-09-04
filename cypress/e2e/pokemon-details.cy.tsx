describe("Pokemon Details Page", () => {
  it("renders pokemon details component", () => {
    cy.visit("/pokemon-details/xy8-40");
    cy.get("h3").contains("Pokemon Details");
  });
});
