export class FlashcardGamePage {
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
    this.getCardCounter().should('be.visible');
    this.getFlashcardContainer().should('be.visible');
    this.getStudyMoreButton().should('be.visible');
    this.getKnowButton().should('be.visible');
    return this;
  }

  getBackButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('button', 'Voltar');
  }

  getGameTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.max-w-4xl h1');
  }

  getCardCounter(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains(/Cartão \d+ de \d+/);
  }

  getFlashcardContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.perspective-1000');
  }

  getFrontCard(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getFlashcardContainer().find('h3');
  }

  getBackCard(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getFlashcardContainer().find('p');
  }

  getFlipHint(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('Clique para virar');
  }

  getStudyMoreButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('button', 'Estudar Mais');
  }

  getKnowButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('button', 'Já Sei!');
  }

  getCompletionHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('h2', 'Sessão Concluída!');
  }

  getCompletionMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains(/Você memorizou \d+ de \d+ cartões\./);
  }

  getRestartButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('button', 'Jogar Novamente');
  }

  flipCard(): this {
    this.getFlashcardContainer().click();
    return this;
  }

  markAsKnown(): this {
    this.getKnowButton().click();
    return this;
  }

  markForStudy(): this {
    this.getStudyMoreButton().click();
    return this;
  }

  verifyFrontText(text: string): this {
    this.getFrontCard().should('be.visible').and('contain.text', text);
    return this;
  }

  verifyBackText(text: string): this {
    this.getBackCard().should('exist').and('contain.text', text);
    return this;
  }

  verifyCompletion(knownCount: number, totalCards: number): this {
    this.getCompletionHeading().should('be.visible');
    this.getCompletionMessage().should('contain.text', `Você memorizou ${knownCount} de ${totalCards} cartões.`);
    this.getRestartButton().should('be.visible');
    return this;
  }

  goBack(): void {
    this.getBackButton().click();
  }
}
