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

  it('passes', () => {
    
  })
})