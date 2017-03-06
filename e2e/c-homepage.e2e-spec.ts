import {by, element, browser} from "protractor";
describe('Home page - general', () => {
  beforeAll(() => {
    let inputMail = element.all(by.css('#maillogin'));
    let inputPass = element.all(by.css('#passlogin'));
    let btnLogin = element(by.id('btn-login'));
    browser.get('');
    inputMail.all(by.tagName('input')).first().sendKeys("runtrackminds2017@gmail.com");
    inputPass.all(by.tagName('input')).first().sendKeys("Team102017");

    expect(inputMail.all(by.tagName('input')).first().getAttribute('value')).toEqual("runtrackminds2017@gmail.com");
    expect(inputPass.all(by.tagName('input')).first().getAttribute('value')).toEqual("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
    });
  });

  //Other parts already tested in loginpage.e2e
  it('should have a correct navbar title & button new isTracking', () => {
    let navBarTitle = element.all(by.css('ion-title')).get(1);
    expect(navBarTitle.isPresent()).toBeTruthy();
    expect(navBarTitle.getText()).toBe('Home');
    let btn = element(by.tagName('button'));
    expect(btn.isPresent()).toBeTruthy();
  });
});

