import { browser, element, by } from 'protractor';

describe('Runtracker_Ionic login page', () => {
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
    let navBarTitle = element(by.tagName('ion-title'));

    expect(navBarTitle.isPresent()).toBeTruthy();
    expect(navBarTitle.getText()).toBe('Login');
  });

  it('should have login button', () => {
    let btnLogin = element(by.id('btn-login'));

    expect(btnLogin.isPresent()).toBeTruthy();
    expect(btnLogin.getText()).toBe('LOGIN');
    btnLogin.click();
  });


});
