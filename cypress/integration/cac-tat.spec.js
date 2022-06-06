/// <reference types="Cypress"/>

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("src/index.html");
  });

  //first test
  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  //exerc extra 1
  it("preenche os campos obrigatorios e envia o formulario", () => {
    const longTest =
      "	Cubilia lobortis dolor ut himenaeos ut est arcu, quisque ultrices libero in tellus eget metus, tincidunt egestas placerat at turpis pellentesque. hendrerit nibh sollicitudin tempus posuere consequat senectus euismod consectetur, eleifend semper litora nostra duis ";

    cy.get("#firstName").type("gustavo");
    cy.get("#lastName").type("alef");
    cy.get("#email").type("gusta@email.com");
    cy.get("#open-text-area").type(longTest, { delay: 0 }); //<-- como se fosse um ctrl+v
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  //exerc extra 2
  it("exibe mensagem de erro ao subrmeter email com formatação errada", () => {
    cy.get("#firstName").type("gustavo");
    cy.get("#lastName").type("alef");
    cy.get("#email").type("gusta@email,com");
    cy.get("#open-text-area").type("exercicio extra 3");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  //exerc extra 3
  it("campo telefone continua vazio quando preenchido com valor nao numerico", () => {
    cy.get("#phone").type("qweasdqwe").should("have.value", "");
  });

  //exerc extra 4
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("gustavo");
    cy.get("#lastName").type("alef");
    cy.get("#email").type("gusta@email.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("exercicio extra 4");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  //exerc extra 5
  it("preenche e limpa os campos nome, sobrenome", () => {
    cy.get("#firstName")
      .type("gustavo")
      .should("have.value", "gustavo")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("alef")
      .should("have.value", "alef")
      .clear()
      .should("have.value", "");
  });

  //exerec extra 7
  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get("input[type='radio'][value='feedback']")
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    //seleciona varios elementos e interage com eles de uma so vez
    cy.get("input[type='radio']").each(($radio) => {
      cy.wrap($radio).check();
      cy.wrap($radio).should("be.checked");
    });
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("input[type='file']")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("input[type='file']")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("arquivoExemplo");
    cy.get("input[type='file']")
      .selectFile("@arquivoExemplo")
      .should(($input) => {
        //navegando nas propriedades do elemento e capturando o name
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicanco no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing").should("be.visible");
  });

  it("preenche os campos obrigatorios e envia o formulario usando cyClock e cyTick", () => {
    const longTest = "Cubilia lobortis dolor ut himenaeos ut est arcu ";

    cy.clock();

    cy.get("#firstName").type("gustavo");
    cy.get("#lastName").type("alef");
    cy.get("#email").type("gusta@email.com");
    cy.get("#open-text-area").type(longTest, { delay: 0 }); //<-- como se fosse um ctrl+v
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");

    cy.tick(3000);
    cy.get(".success").should("not.be.visible");
  });
});
