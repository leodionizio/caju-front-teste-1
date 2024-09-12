describe("Registration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it("Should create a new registration", () => {
    cy.get('button[name="newRegistrationButton"]').click();

    cy.url().should("include", "/new-registration");

    cy.get('input[name="employeeName"]').type("Leonardo Dionizio");
    cy.get('input[name="email"]').type("leonardo.dionizio@caju.com.br");
    cy.get('input[name="cpf"]').type("41649864841");
    cy.get('input[name="admissionDate"]').type("2024-10-12");

    cy.get('button[type="submit"]').click();

    cy.contains("Admissão criada com sucesso!").should("be.visible");

    cy.contains("Pronto para revisar")
      .parent()
      .find('[data-testid="registration-card"]')
      .should("contain", "Leonardo Dionizio")
      .should("contain", "leonardo.dionizio@caju.com.br")
      .should("contain", "2024-10-12");
  });


  it("Should change registration status to APPROVED", () => {
    cy.contains("Pronto para revisar")
      .parent()
      .find('[data-testid="registration-card"]')
      .within(() => {
        cy.contains("Aprovar").click();
      });

    cy.contains("Confirmar").click();

    cy.contains("Aprovado")
      .parent()
      .find('[data-testid="registration-card"]')
      .should("contain", "Leonardo Dionizio");

    cy.contains("Admissão atualizada com sucesso!").should("be.visible");
  });

  it("Should change registration status to REPROVED", () => {
    cy.contains("Aprovado")
      .parent()
      .find('[data-testid="registration-card"]')
      .within(() => {
        cy.contains("Reprovar").click();
      });

    cy.contains("Confirmar").click();

    cy.contains("Reprovado")
      .parent()
      .find('[data-testid="registration-card"]')
      .should("contain", "Leonardo Dionizio");

    cy.contains("Admissão atualizada com sucesso!").should("be.visible");
  });

  it("Should change registration status to REVIEW", () => {
    cy.contains("Reprovado")
      .parent()
      .find('[data-testid="registration-card"]')
      .within(() => {
        cy.contains("Revisar novamente").click();
      });

    cy.contains("Confirmar").click();

    cy.contains("Pronto para revisar")
      .parent()
      .find('[data-testid="registration-card"]')
      .should("contain", "Leonardo Dionizio");

    cy.contains("Admissão atualizada com sucesso!").should("be.visible");
  });

  it("Should delete registration", () => {
    cy.contains("Pronto para revisar")
      .parent()
      .find('[data-testid="registration-card"]')
      .within(() => {
        cy.get('[data-testid="delete-icon"]').click();
      });

    cy.contains("Confirmar").click();

    cy.contains("Pronto para revisar")
      .parent()
      .find('[data-testid="registration-card"]')
      .should("not.exist");

    cy.contains("Admissão deletada com sucesso!").should("be.visible");
  });
});
