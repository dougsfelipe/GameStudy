// Import commands.ts using ES2015 syntax:
import './commands';

// Prevent uncaught exceptions from failing tests if needed
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // on harmless third-party exceptions
  return false;
});
