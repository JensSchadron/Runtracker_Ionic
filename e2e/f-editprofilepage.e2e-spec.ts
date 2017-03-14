import {by, element, browser} from "protractor";
describe('EditProfile-page', () => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false);

    let inputMail = element.all(by.css('#maillogin'));
    let inputPass = element.all(by.css('#passlogin'));
    let btnLogin = element(by.id('btn-login'));
    browser.get('');
    inputMail.all(by.tagName('input')).first().sendKeys("runtrackminds2017@gmail.com");
    inputPass.all(by.tagName('input')).first().sendKeys("Team102017");

    expect(inputMail.all(by.tagName('input')).first().getAttribute('value')).toEqual("runtrackminds2017@gmail.com");
    expect(inputPass.all(by.tagName('input')).first().getAttribute('value')).toEqual("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(10000);
    });


    let btnMenuNavDrawer = element(by.tagName('ion-navbar')).all(by.css('button')).get(1);
    btnMenuNavDrawer.click().then(() => {
      browser.driver.sleep(2000);
      let btnEditProf= element(by.className('list')).all(by.tagName('button')).get(3);
      btnEditProf.click().then(() =>{
        console.log("Profile button clicked.");
        browser.driver.sleep(15000);
      });
    });

  });


  it('should have ion-avatar,core-info, title & save changes button', () => {

    let saveChanges = element(by.id("save-changes"));
    let avatar= element(by.id("avatar"));
    let title = element(by.id("title"));
    let coreInfo= element(by.id("core-info"));

    expect(saveChanges.isPresent()).toBeTruthy();
    expect(avatar.isPresent()).toBeTruthy();
    expect(coreInfo.isPresent()).toBeTruthy();
    expect(title.isPresent()).toBeTruthy();
    expect(title.getText()).toBe('Edit profile');

  });

  afterAll(() => {
    browser.waitForAngularEnabled(true);

    let btnMenuNavDrawer = element(by.tagName('ion-navbar')).all(by.css('button')).get(1);
    btnMenuNavDrawer.click().then(() => {
      browser.driver.sleep(2000);
      let btnLogout = element(by.tagName('ion-menu')).element(by.tagName('ion-list')).all(by.tagName('button')).last();
      btnLogout.click().then(() => console.log("Log out button clicked."));
    });
  });

});
