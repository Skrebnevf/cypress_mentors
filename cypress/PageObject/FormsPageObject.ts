class FormsPageObject {

    private formsSelectors = {
        usingTheGridEmail: () => cy.get('[data-cy="inputEmail1"]'),
        usingTheGridPassword: () => cy.get('[data-cy="inputPassword1"]'),
    }

    public typeUsingTheGridEmail(email: string) {
        cy.log('Ввести Email в Using The Grid')
        this.formsSelectors.usingTheGridEmail().type(email)
        return this
    }

    public typeUsingTheGridPassword(password: string) {
        cy.log('Ввести Password в Using The Grid')
        this.formsSelectors.usingTheGridPassword().type(password)
        return this
    }
}

export const formsPage = new FormsPageObject()