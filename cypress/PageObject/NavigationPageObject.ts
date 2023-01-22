class NavigationPageObject {

    private navigationSelectors = {
        navigationForms: () => cy.get('a.ng-tns-c7-4 > .menu-title'),
        navigationFormLayout: () => cy.get('.ng-tns-c7-5 > .menu-title')
    }

    public openForms() {
        cy.log('Открыть формы')
        this.navigationSelectors.navigationForms().click()
        return this
    }

    public openFormLayout() {
        cy.log('Открыть Form Layout')
        this.navigationSelectors.navigationFormLayout().click()
    }
}

export const navigationPage = new NavigationPageObject()