// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('assertLoggedIn', () => {
    cy.window().its('localStorage.fantasy-token').should('be.a', 'string')
})

Cypress.Commands.add('assertLoggedOut', () => {
    cy.window().its('localStorage.fantasy-token').should('be.undefined')
})

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/')
    // @ts-ignore
    cy.assertLoggedOut()
    cy.get('[placeholder="Email"]')
        .type(email)
        .get('[placeholder="Password"]')
        .type(password)
        .get('.text-lg')
        .should('not.have.class', 'pointer-events-none')
        .click()
    // @ts-ignore
    cy.assertLoggedIn()
})
