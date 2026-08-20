import { TopicsPage } from '../support/pages/TopicsPage';
import { SubjectPage } from '../support/pages/SubjectPage';
import { FlashcardGamePage } from '../support/pages/FlashcardGamePage';

describe('3. React Flashcards Game', () => {
  const topicsPage = new TopicsPage();
  const subjectPage = new SubjectPage();
  const flashcardPage = new FlashcardGamePage();

  it('should navigate from Topics to React and launch React Flashcards game', () => {
    // 1. Visit Topics page
    topicsPage.visit();
    topicsPage.verifyLoaded();

    // 2. Select React subject
    topicsPage.clickSubject('React');
    cy.url().should('include', '/subject/react-subject');
    subjectPage.verifyLoaded('React');

    // 3. Launch React Flashcards game
    subjectPage.clickGame('React Flashcards');
    cy.url().should('include', '/game/react-flashcards');

    // 4. Verify game interface is displayed
    flashcardPage.verifyLoaded('React Flashcards');
  });

  it('should show front face first, flip card on click, and navigate cards', () => {
    // Direct navigation to React flashcards
    flashcardPage.visit('react-flashcards');
    flashcardPage.verifyLoaded('React Flashcards');

    // 1. Validate initial state: Card 1 of 3, Front displays "useState"
    flashcardPage.getCardCounter().should('contain.text', 'Cartão 1 de 3');
    flashcardPage.verifyFrontText('useState');

    // 2. Click card to flip and verify definition on back
    flashcardPage.flipCard();
    flashcardPage.verifyBackText('Hook para gerenciar estado em componentes funcionais.');

    // 3. Mark as "Já Sei!" (positive score) -> waits for transition to Card 2
    flashcardPage.markAsKnown();
    flashcardPage.getCardCounter().should('contain.text', 'Cartão 2 de 3');
    flashcardPage.verifyFrontText('useEffect');

    // 4. Flip Card 2 and mark for study ("Estudar Mais") -> waits for transition to Card 3
    flashcardPage.flipCard();
    flashcardPage.verifyBackText('Hook para executar efeitos colaterais em componentes funcionais.');
    flashcardPage.markForStudy();

    // 5. Card 3: useContext -> flip and mark as "Já Sei!"
    flashcardPage.getCardCounter().should('contain.text', 'Cartão 3 de 3');
    flashcardPage.verifyFrontText('useContext');
    flashcardPage.flipCard();
    flashcardPage.verifyBackText('Hook para acessar dados globais de contexto.');
    flashcardPage.markAsKnown();

    // 6. Verify Session Completion screen
    flashcardPage.verifyCompletion(2, 3);
  });

  it('should allow restarting the flashcard session', () => {
    flashcardPage.visit('react-flashcards');
    flashcardPage.verifyLoaded('React Flashcards');

    // Complete cards step by step waiting for each card transition
    flashcardPage.getCardCounter().should('contain.text', 'Cartão 1 de 3');
    flashcardPage.markAsKnown();
    flashcardPage.getCardCounter().should('contain.text', 'Cartão 2 de 3');
    flashcardPage.markAsKnown();
    flashcardPage.getCardCounter().should('contain.text', 'Cartão 3 de 3');
    flashcardPage.markAsKnown();

    // Verify completion screen and restart button
    flashcardPage.getCompletionHeading().should('be.visible');
    flashcardPage.getRestartButton().should('be.visible');
  });
});
