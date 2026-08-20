export class SubjectPage {
  visit(subjectId: string): this {
    cy.visit(`/subject/${subjectId}`);
    return this;
  }

  verifyLoaded(expectedTitle?: string): this {
    this.getBackButton().should('be.visible');
    if (expectedTitle) {
      this.getSubjectHeading().should('be.visible').and('contain.text', expectedTitle);
    } else {
      this.getSubjectHeading().should('be.visible');
    }
    this.getActivitiesHeading().should('be.visible').and('contain.text', 'Atividades Disponíveis');
    this.getGameCards().should('have.length.at.least', 1);
    return this;
  }

  getBackButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('a', 'Voltar para Tópicos');
  }

  getSubjectHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('h1');
  }

  getSubjectDescription(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('p.text-indigo-100');
  }

  getActivitiesHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('h2', 'Atividades Disponíveis');
  }

  getGameCards(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.grid.grid-cols-1.md\\:grid-cols-2 > a');
  }

  getGameCard(gameTitle: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('h3', gameTitle).parents('a');
  }

  clickGame(gameTitle: string): void {
    this.getGameCard(gameTitle).click();
  }

  clickBack(): void {
    this.getBackButton().click();
  }
}
