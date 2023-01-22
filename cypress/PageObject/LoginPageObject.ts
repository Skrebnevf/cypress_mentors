class LoginPageObject {

    private loginPageSelectors = {
        inputEmail: () => cy.get('#input-email'),
        inputPassword: () => cy.get('#input-password'),
        loginButton: () => cy.get('.appearance-filled'),
        loginErrorMessage: () => cy.get('.caption'),
    }

    public typeLogin(login: string) {
        cy.log('Ввести логин')
        this.loginPageSelectors.inputEmail().clear().type(login)
        return this
    }

    public typePassword(password: string) {
        cy.log('Ввести пароль')
        this.loginPageSelectors.inputPassword().clear().type(password)
        return this
    }

    public clickLoginButton() {
        cy.log('Кликнуть на кнопку')
        this.loginPageSelectors.loginButton().click()
        return this
    }

    /**
     * @param color rgb
     * @returns 
     */
    public checkBorderColor(color: string) {
        cy.log('Проверить цвет границ')
        this.loginPageSelectors.inputEmail().should('have.css', 'border-color', color)
        return this
    }
}

export const loginPageObject = new LoginPageObject()