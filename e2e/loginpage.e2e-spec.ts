import {by, element, browser} from "protractor";
describe('Login page - general', () => {
  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Login');
  });

  it('should have navbar', () => {
    let navBar = element(by.tagName('ion-navbar'));
    expect(navBar.isPresent()).toBeTruthy();
  });

  it('test navbar title', () => {
    let navBarTitle = element.all(by.css('ion-title')).get(1);

    expect(navBarTitle.isPresent()).toBeTruthy();
    expect(navBarTitle.getText()).toBe('Login');
  });
});

describe('Login page - login form', () => {
  beforeEach(() => {
    browser.get('');
  });

  let btnAuthGoogle = element(by.id('authGoogle'));
  it('has google login button', () => {
    expect(btnAuthGoogle.isPresent()).toBeTruthy();
  });

  it('test google login authentication', () => {
    btnAuthGoogle.click().then(() => {
      browser.driver.sleep(2000); // wait for page redirect
      expect(browser.navigate()).toBeTruthy();
    });
  });

  let btnAuthFacebook = element(by.id('authFacebook'));
  it('has facebook login button', () => {
    expect(btnAuthFacebook.isPresent()).toBeTruthy();
  });

  it('test facebook login authentication', () => {
    btnAuthFacebook.click().then(() => {
      browser.driver.sleep(2000); // wait for page redirect
      expect(browser.navigate()).toBeTruthy();
    });
  });

  let inputMail = element.all(by.css('ion-input')).get(0);
  let inputPass = element.all(by.css('ion-input')).get(1);
  it('has mail/pass login field', () => {
    expect(inputMail.isPresent()).toBeTruthy();
    expect(inputPass.isPresent()).toBeTruthy();
  });

  let btnLogin = element(by.id('btn-login'));
  it('should have login button', () => {
    expect(btnLogin.isPresent()).toBeTruthy();
    expect(btnLogin.getText()).toBe('LOGIN');
  });

  it('test login mail/pass authentication', () => {
    inputMail.all(by.tagName('input')).first().sendKeys("runtrackminds2017@gmail.com");
    inputPass.all(by.tagName('input')).first().sendKeys("Team102017");

    expect(inputMail.all(by.tagName('input')).first().getAttribute('value')).toEqual("runtrackminds2017@gmail.com");
    expect(inputPass.all(by.tagName('input')).first().getAttribute('value')).toEqual("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
      expect(element.all(by.css('ion-title')).get(1).getText()).toBe("Home");
    });
  });
});
