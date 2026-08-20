export class MatchingGamePage {
  visit(gameId: string): this {
    cy.visit(`/game/${gameId}`);
    return this;
  }

  verifyLoaded(expectedTitle?: string): this {
    this.getBackButton().should('be.visible');
    if (expectedTitle) {
      this.getGameTitle().should('be.visible').and('contain.text', expectedTitle);
    } else {
      this.getGameTitle().should('be.visible');
    }
    this.getScoreBadge().should('be.visible');
    this.getTermsHeading().should('be.visible').and('contain.text', 'Termos');
    this.getDefinitionsHeading().should('be.visible').and('contain.text', 'Definições');
    this.getTermButtons().should('have.length.at.least', 1);
    this.getDefinitionButtons().should('have.length.at.least', 1);
    return this;
  }

  getBackButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('button', 'Voltar');
  }

  getGameTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.max-w-4xl h1');
  }

  getScoreBadge(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.bg-yellow-100');
  }

  getTermsHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('h3', 'Termos');
  }

  getDefinitionsHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('h3', 'Definições');
  }

  getTermButtons(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.grid.grid-cols-1.md\\:grid-cols-2 > div:first-child button');
  }

  getDefinitionButtons(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.grid.grid-cols-1.md\\:grid-cols-2 > div:last-child button');
  }

  getTermButton(term: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getTermButtons().filter(`:contains("${term}")`);
  }

  getDefinitionButton(definition: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getDefinitionButtons().filter(`:contains("${definition}")`);
  }

  selectTerm(term: string): void {
    this.getTermButton(term).click();
  }

  selectDefinition(definition: string): void {
    this.getDefinitionButton(definition).click();
  }

  matchPair(term: string, definition: string): void {
    this.selectTerm(term);
    this.selectDefinition(definition);
  }

  verifyPairMatched(term: string, definition: string): void {
    this.getTermButton(term).should('be.disabled').and('have.class', 'bg-green-100');
    this.getDefinitionButton(definition).should('be.disabled').and('have.class', 'bg-green-100');
  }

  verifyWrongAttempt(term: string, wrongDefinition: string): void {
    this.selectTerm(term);
    this.selectDefinition(wrongDefinition);
    this.getTermButton(term).should('have.class', 'bg-red-100');
    this.getDefinitionButton(wrongDefinition).should('have.class', 'bg-red-100');
  }

  goBack(): void {
    this.getBackButton().click();
  }
}
