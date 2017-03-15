import {by, element, browser} from "protractor";
describe('Home page - general', () => {
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
      browser.driver.sleep(6000);
    });
  });

  //Other parts already tested in loginpage.e2e
  it('should have a correct navbar title', () => {
    let navBarTitle = element.all(by.css('ion-title')).get(1);
    expect(navBarTitle.isPresent()).toBeTruthy();
    expect(navBarTitle.getText()).toBe('Home');
  });

  it('should have greeting, distance, speed and competitions cards', () => {
    let greetingCard = element(by.id('greeting-card'));
    let distanceCard = element(by.id('distance-card'));
    let speedCard = element(by.id('speed-card'));
    let competitionsCard = element(by.id('competitions-card'));
    expect(greetingCard.isPresent()).toBeTruthy();
    expect(distanceCard.isPresent()).toBeTruthy();
    expect(speedCard.isPresent()).toBeTruthy();
    expect(competitionsCard.isPresent()).toBeTruthy();

  });

  it('should have \'new tracking\' button', () => {
    let btn = element(by.tagName('button'));
    expect(btn.isPresent()).toBeTruthy();
  });

  afterAll(() => {
    let btnMenuNavDrawer = element(by.tagName('ion-navbar')).all(by.css('button')).get(1);
    btnMenuNavDrawer.click().then(() => {
      browser.driver.sleep(2000);

      let btnLogout = element(by.tagName('ion-menu')).all(by.tagName('button')).last();
      btnLogout.click().then(() => {
        browser.driver.sleep(6000);

        browser.waitForAngularEnabled(true);
      });
    });
  });
});
