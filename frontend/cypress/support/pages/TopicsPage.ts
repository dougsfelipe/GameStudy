export class TopicsPage {
  visit(): this {
    cy.visit('/topics');
    return this;
  }

  verifyLoaded(): this {
    this.getPageHeading().should('be.visible').and('contain.text', 'Tópicos de Estudo');
    this.getTopicCards().should('have.length.at.least', 1);
    return this;
  }

  getPageHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('h1').contains('Tópicos de Estudo');
  }

  getTopicCards(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.space-y-8 > div');
  }

  getTopicByName(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('h2', name).parents('.space-y-8 > div');
  }

  getSubtopicByName(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('h3', name);
  }

  getSubjectLink(subjectName: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('a', subjectName);
  }

  clickSubject(subjectName: string): void {
    this.getSubjectLink(subjectName).click();
  }
}
