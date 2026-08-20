export class HomePage {
  visit(): this {
    cy.visit('/');
    return this;
  }

  verifyLoaded(): this {
    this.getHeaderTitle().should('be.visible').and('contain.text', 'Memorização Pro');
    this.getHeroTitle().should('be.visible').and('contain.text', 'Domine o Conhecimento');
    this.getHeroDescription().should('be.visible');
    this.getStartButton().should('be.visible');
    this.getFeatureCards().should('have.length', 3);
    return this;
  }

  getHeaderTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('header').contains('span', 'Memorização Pro');
  }

  getHeroTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('h1').contains('Domine o Conhecimento');
  }

  getHeroDescription(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('p').contains('Uma plataforma gamificada');
  }

  getStartButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('a', 'Começar Agora');
  }

  getHeaderHomeLink(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('header nav').contains('a', 'Início');
  }

  getHeaderTopicsLink(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('header nav').contains('a', 'Tópicos');
  }

  getFeatureCards(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.grid.grid-cols-1.md\\:grid-cols-3 > div');
  }

  clickStart(): void {
    this.getStartButton().click();
  }

  navigateToTopics(): void {
    this.getHeaderTopicsLink().click();
  }
}
