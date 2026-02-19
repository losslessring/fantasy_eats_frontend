describe('Create Account', () => {
    it.skip('should see email input error with wrong email', () => {
        cy.visit('/')
            .contains('Create an Account')
            .click()
            .get('[placeholder="Email"]')
            .type('wrong@email')
            .get('.text-red-500')
            .should('have.text', 'Please enter a valid email')
    })
    it.skip('should see email input error with blank email', () => {
        cy.visit('/create-account')
            .get('[placeholder="Email"]')
            .type('1')
            .clear()
            .get('.text-red-500')
            .should('have.text', 'Email is required')
    })
    it.skip('should see email input error with blank email', () => {
        cy.visit('/create-account')
            .get('[placeholder="Email"]')
            .type('correct@email.com')
            .get('[placeholder="Password"]')
            .type('1')
            .clear()
            .get('.text-red-500')
            .should('have.text', 'Password is required')
    })
    it.skip('should be able to create an account and login', () => {
        cy.intercept('http://localhost:4000/graphql', (req) => {
            const { operationName } = req.body

            if (operationName && operationName === 'createAccountMutation') {
                console.log(operationName)
                req.reply((res) => {
                    res.send({
                        data: {
                            createAccount: {
                                ok: true,
                                error: null,
                                __typename: 'CreateAccountOutput',
                            },
                        },
                    })
                })
            }
        })

        cy.visit('/create-account')
            .get('[placeholder="Email"]')
            .type('test@email.com')
            .get('[placeholder="Password"]')
            .type('12345')
            .get('.text-lg')
            .click()
            .wait(1000)
            .title()
            .should('eq', 'Login | Fantasy Eats')
            .get('[placeholder="Email"]')
            .type('test@email.com')
            .get('[placeholder="Password"]')
            .type('12345')
            .get('.text-lg')
            .click()
            .window()
            .its('localStorage.fantasy-token')
            .should('be.a', 'string')
    })
})
