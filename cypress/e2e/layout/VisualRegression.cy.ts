import { formsPage } from "../../PageObject/FormsPageObject";
import { helpers } from "../../PageObject/Helpers/Helpers"
import { percyHelper } from "../../PageObject/Helpers/PercyHelper";
import { URL } from '../../global'

describe('Percy Visual Test Demo', () => {
    it('First Test', () => {
        helpers.openUrl("http://localhost:4200/pages/forms/layouts")
        percyHelper.createSnapshot('Homepage')
        formsPage.typeUsingTheGridEmail('asdasd@asdasd.com')
        percyHelper.createSnapshot('check email')
        formsPage.typeUsingTheGridPassword('1234123')
        percyHelper.createSnapshot('check email + password')
    });
});