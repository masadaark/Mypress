export const defaultHeader: object = {
  userId: 1
}
export const callApiGet = (url: string, apiHeader: object = defaultHeader)
  : Cypress.Chainable<any> => {
  return cy.request({
    failOnStatusCode: false,
    method: 'GET',
    url: url,
    headers: apiHeader
  })
}

export const callApiPost = (url: string, body: any[] | object, apiHeader: object = defaultHeader)
  : Cypress.Chainable<any> => {
  return cy.request({
    failOnStatusCode: false,
    method: 'POST',
    url: url,
    headers: apiHeader,
    body: body
  })
}

export const callApiPatch = (url: string, body: any[] | object, apiHeader: object = defaultHeader)
  : Cypress.Chainable<any> => {
  return cy.request({
    failOnStatusCode: false,
    method: 'PATCH',
    url: url,
    headers: apiHeader,
    body: body
  })
}

export const callApiDelete = (url: string, body: any[] | object, apiHeader: object = defaultHeader)
  : Cypress.Chainable<any> => {
  return cy.request({
    failOnStatusCode: false,
    method: 'DELETE',
    url: url,
    headers: apiHeader,
    body: body
  })
}