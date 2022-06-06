Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("gustavo");
  cy.get("#lastName").type("alef");
  cy.get("#email").type("gusta@email.com");
  cy.get("#open-text-area").type("exercicio extra 7");
  cy.get("button[type=submit]").click();
});
