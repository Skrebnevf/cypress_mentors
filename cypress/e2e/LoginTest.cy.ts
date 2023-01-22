import { helpers } from '../PageObject/Helpers/Helpers'
import { URL } from '../global';
import { loginPageObject } from '../PageObject/LoginPageObject';

describe('Login Page', {testIsolation: false}, () => {
    beforeEach(() => {
        helpers.openUrl(URL.BASE_URL+'/auth/login')
    })

    it('Valid login case', () => {
        loginPageObject.typeLogin('test@test.com')
        loginPageObject.typePassword('123445')
        loginPageObject.clickLoginButton()
        helpers.checkUrl('/pages')
    });

    it('Invalid Login', () => {
        loginPageObject.typeLogin('test@test')
        loginPageObject.typePassword('123445')
        helpers.checkErrorsMessages('Email should be the real one!')
        loginPageObject.checkBorderColor('rgb(255, 61, 113)')
    });
});