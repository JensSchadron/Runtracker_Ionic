/**
 * Created by stijnergeerts on 13/03/17.
 */
import {by, element, browser} from "protractor";
describe('Trackingchoice-page', () => {
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
      let btnEditProf = element(by.className('list')).all(by.tagName('button')).get(1);
      btnEditProf.click().then(() => {
        console.log("New tracking button clicked.");
        browser.driver.sleep(10000);
      });
    });

  });
  it('should have correct title', () => {

    let title = element(by.id("title"));

    expect(title.isPresent()).toBeTruthy();
    expect(title.getText()).toBe('Tracking Type');

  });

  it('should have solo-run-card & one-to-one-card', () => {

    let soloCard = element(by.id("solo-card"));
    let soloImg = element(by.id("solo-card-img"));
    let soloTitle = element(by.id("solo-card-title"));
    let oneToOneCard = element(by.id("one-to-one-card"));
    let oneToOneImg = element(by.id("one-to-one-card-img"));
    let oneToOneTitle = element(by.id("one-to-one-card-title"));

    expect(soloCard.isPresent()).toBeTruthy();
    expect(soloImg.isPresent()).toBeTruthy();
    expect(soloTitle.getText()).toBe('Solo Run');
    expect(oneToOneCard.isPresent()).toBeTruthy();
    expect(oneToOneImg.isPresent()).toBeTruthy();
    expect(oneToOneTitle.getText()).toBe('One to one');
  });

  it('should have current location, map and start button', () => {
    let soloCard = element(by.id("solo-card"));
    soloCard.click().then(() => {
      console.log("Solo Run clicked");
      browser.driver.sleep(10000);
    });
    let curloc = element(by.id("curloc"));
    let map = element(by.id("map"));
    let btnStartTracking = element(by.id("start-tracking"));
    expect(curloc.isPresent()).toBeTruthy();
    expect(map.isPresent()).toBeTruthy();
    expect(btnStartTracking.isPresent()).toBeTruthy();
    expect(btnStartTracking.getText()).toBe('START TRACKING');
  });

  it('should have realtime info card and stop button', () => {
    let btnStart = element(by.id("start-tracking"));
    btnStart.click().then(() => {
      console.log("Start tracking clicked");
      browser.driver.sleep(10000);
    });
    let infoCard = element(by.id("tracking"));
    let btnStopTracking = element(by.id("stop-tracking"));
    expect(infoCard.isPresent()).toBeTruthy();
    expect(btnStopTracking.isPresent()).toBeTruthy();
    expect(btnStopTracking.getText()).toBe('STOP TRACKING');
  });

  afterAll(() => {
    browser.waitForAngularEnabled(true);

    let btnMenuNavDrawer = element(by.tagName('ion-navbar')).all(by.css('button')).get(1);
    btnMenuNavDrawer.click().then(() => {
      browser.driver.sleep(2000);
      let btnLogout = element(by.tagName('ion-menu')).element(by.tagName('ion-list')).all(by.tagName('button')).last();
      btnLogout.click().then(() => {
        console.log("Log out button clicked.");
        browser.driver.sleep(6000);
      });
    });

});
});

