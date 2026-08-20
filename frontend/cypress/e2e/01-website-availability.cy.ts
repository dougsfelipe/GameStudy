import { HomePage } from '../support/pages/HomePage';
import { TopicsPage } from '../support/pages/TopicsPage';
import { SubjectPage } from '../support/pages/SubjectPage';

describe('1. Website Availability & Navigation', () => {
  const homePage = new HomePage();
  const topicsPage = new TopicsPage();
  const subjectPage = new SubjectPage();

  it('should load the home page successfully with all core UI elements and branding', () => {
    // 1. Open application
    homePage.visit();

    // 2. Verify header branding and title
    homePage.verifyLoaded();

    // 3. Verify footer content
    cy.get('footer').should('be.visible').and('contain.text', 'Sistema de Aprendizado e Memorização');

    // 4. Confirm no application errors or error banners are displayed
    cy.get('body').should('not.contain.text', 'Erro 404');
    cy.get('body').should('not.contain.text', 'Failed to load');
  });

  it('should navigate to Topics page via CTA button and load topics hierarchy without errors', () => {
    homePage.visit();

    // Click "Começar Agora" button
    homePage.clickStart();

    // Verify URL and Topics Page content
    cy.url().should('include', '/topics');
    topicsPage.verifyLoaded();

    // Verify main topic and subtopics exist
    topicsPage.getTopicByName('Tecnologia da Informação').should('be.visible');
    topicsPage.getSubtopicByName('Desenvolvimento').should('be.visible');
    topicsPage.getSubtopicByName('Web Developer').should('be.visible');

    // Verify subjects exist
    topicsPage.getSubjectLink('Anotações de Java Spring & Data').should('be.visible');
    topicsPage.getSubjectLink('JPA/Hibernate').should('be.visible');
    topicsPage.getSubjectLink('React').should('be.visible');
  });

  it('should allow navigation between pages using navbar links and back buttons', () => {
    homePage.visit();

    // Navigate to topics via navbar
    homePage.navigateToTopics();
    cy.url().should('include', '/topics');
    topicsPage.verifyLoaded();

    // Click into React subject
    topicsPage.clickSubject('React');
    cy.url().should('include', '/subject/react-subject');
    subjectPage.verifyLoaded('React');

    // Go back to topics
    subjectPage.clickBack();
    cy.url().should('include', '/topics');
    topicsPage.verifyLoaded();

    // Go back to home via navbar
    homePage.getHeaderHomeLink().click();
    cy.url().should('eq', Cypress.config().baseUrl);
    homePage.verifyLoaded();
  });
});
