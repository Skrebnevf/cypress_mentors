class Helpers {

    public openUrl(url: string): Cypress.Chainable<Cypress.AUTWindow> {
        return cy.visit(url)
    }

    public checkErrorsMessages(error: string) {
        cy.log(`Проверить ошибку ${error}`)
        cy.contains(error).should('be.visible').and('have.css', 'color', 'rgb(255, 61, 113)')
        return this
    }

    public checkUrl(endpoint: string) {
        cy.log(`Проверить endpoint ${endpoint}`)
        cy.url().should('contains', endpoint)
        return this
    }
}

export const helpers = new Helpers()