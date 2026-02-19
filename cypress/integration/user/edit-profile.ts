describe('Edit profile', () => {
    it('can go to edit profile using the icon', () => {
        //@ts-ignore
        cy.login('customer_email_1@gmail.com', '12345')
            .get('a[href="/edit-profile"]')
            .click()
            .title()
            .should('eq', 'Edit Profile | Fantasy Eats')
    })
})
