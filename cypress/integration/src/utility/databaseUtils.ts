export const pgQuery = (queryMessage) :Cypress.Chainable<queryResponse> => {
    return cy.task("dbQuery", { query: queryMessage })
}

interface queryResponse {
    // Define the expected response properties here
  }