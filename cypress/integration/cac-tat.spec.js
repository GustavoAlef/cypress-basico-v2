/// <reference types="Cypress"/>

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it.only("preenche os campos obrigatorios e envia o formulario", () => {
    cy.get("#firstName").type("gustavo");
    cy.get("#lastName").type("alef");
    cy.get("#email").type("gusta@email.com");
    cy.get("#open-text-area").type("first test");
    cy.get("button[type=submit]").click();

    cy.get(".success").should("be.visible");
  });
});
