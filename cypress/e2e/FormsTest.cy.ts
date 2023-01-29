import { formsPage } from "../PageObject/FormsPageObject";
import { helpers } from "../PageObject/Helpers/Helpers";
import { navigationPage } from "../PageObject/NavigationPageObject";
import { URL } from "../global";

describe('template spec', { testIsolation: false }, () => {

  before(() => {
    helpers.openUrl(URL.BASE_URL)
  })

  it('passes', () => {
    //Шаг 1
    cy.log('Шаг 1')
    navigationPage.openForms()
    navigationPage.openFormLayout()
    formsPage.typeUsingTheGridEmail('test@test.com')
    formsPage.typeUsingTheGridPassword('1234')

    //Шаг 2
    cy.log('Шаг 2')
    formsPage.typeUsingTheGridEmail('test@test.com')
    formsPage.typeUsingTheGridPassword('1234')
  })

  it.only('Position Hover', () => {
    cy.get('a.ng-tns-c7-7 > .menu-title').click();
    cy.get('.ng-tns-c7-10 > .menu-title').click();
    cy.wait(1000)
    cy.get('[nbpopoverplacement="left"]').then($el => {
      cy.wrap($el).click()
      cy.contains('Hello, how are you today?')
    })
    cy.get('.nb-overlay-left').should('be.exist')
  })
})