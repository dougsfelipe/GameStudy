import { TopicsPage } from '../support/pages/TopicsPage';
import { SubjectPage } from '../support/pages/SubjectPage';
import { MatchingGamePage } from '../support/pages/MatchingGamePage';

describe('2. Hibernate Matching Game', () => {
  const topicsPage = new TopicsPage();
  const subjectPage = new SubjectPage();
  const matchingPage = new MatchingGamePage();

  it('should navigate from Topics to JPA/Hibernate and launch the Mapeamento ORM game', () => {
    // 1. Visit topics page
    topicsPage.visit();
    topicsPage.verifyLoaded();

    // 2. Select JPA/Hibernate subject
    topicsPage.clickSubject('JPA/Hibernate');
    cy.url().should('include', '/subject/jpa-hibernate-subject');
    subjectPage.verifyLoaded('JPA/Hibernate');

    // 3. Launch "Mapeamento ORM" game
    subjectPage.clickGame('Mapeamento ORM');
    cy.url().should('include', '/game/jpa-matching');

    // 4. Verify game interface is displayed properly
    matchingPage.verifyLoaded('Mapeamento ORM');
  });

  it('should handle incorrect and correct pair selections with visual feedback', () => {
    // Navigate directly to JPA matching game
    matchingPage.visit('jpa-matching');
    matchingPage.verifyLoaded('Mapeamento ORM');

    // Verify initial state: term buttons & definition buttons are present
    matchingPage.getTermButton('@Entity').should('be.visible').and('not.be.disabled');
    matchingPage.getDefinitionButton('Marca a classe como uma entidade persistente.').should('be.visible');

    // 1. Simulate incorrect match attempt
    // Click @Entity, then click wrong definition (e.g. "Marca o campo como a Chave Primária.")
    matchingPage.verifyWrongAttempt('@Entity', 'Marca o campo como a Chave Primária.');

    // Assert that after wrong attempt, error state resets and buttons are still playable
    cy.wait(1100); // Allow shake animation timeout to complete cleanly
    matchingPage.getTermButton('@Entity').should('not.have.class', 'bg-red-100');

    // 2. Simulate correct match: @Entity + "Marca a classe como uma entidade persistente."
    matchingPage.matchPair('@Entity', 'Marca a classe como uma entidade persistente.');

    // 3. Assert matched pair has green styling, checkmark icon, and is disabled
    matchingPage.verifyPairMatched('@Entity', 'Marca a classe como uma entidade persistente.');

    // 4. Match a second pair: @Id + "Marca o campo como a Chave Primária."
    matchingPage.matchPair('@Id', 'Marca o campo como a Chave Primária.');
    matchingPage.verifyPairMatched('@Id', 'Marca o campo como a Chave Primária.');
  });

  it('should allow user to navigate back from Hibernate game to subject page', () => {
    matchingPage.visit('jpa-matching');
    matchingPage.verifyLoaded('Mapeamento ORM');

    matchingPage.goBack();
    // Should navigate back cleanly without errors
    cy.url().should('not.include', '/game/jpa-matching');
  });
});
