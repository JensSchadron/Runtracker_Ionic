/**
 * Created by stijnergeerts on 20/02/17.
 */
import {by, element, browser} from "protractor";
describe('Ranking-page', () => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false);

    let btnMenuNavDrawer = element(by.tagName('ion-navbar')).all(by.css('button')).get(1);
    btnMenuNavDrawer.click().then(() => {
      browser.driver.sleep(2000);
      let btnRanking = element(by.className('list')).all(by.tagName('button')).get(4);
      btnRanking.click().then(() =>{
        console.log("Ranking button clicked.");
        browser.driver.sleep(2000);
      });
    });
  });

  it('should have a correct title', () => {
    let title = element(by.tagName('h1'));
    expect(title.isPresent()).toBeTruthy();
    expect(title.getText()).toContain('Ranking');
  });

  it('should have buttons, input & header ', () => {
    let btnWorld = element(by.id('button-world'));
    let btnFriends = element(by.id('button-friends'));
    let selectSort = element(by.id('orderby-select'));
    let header = element(by.tagName('h1'));
    let colHeader = element(by.className('ranking-header'));
    expect(btnWorld.isPresent()).toBeTruthy();
    expect(btnFriends.isPresent()).toBeTruthy();
    expect(selectSort.isPresent()).toBeTruthy();
    expect(header.isPresent()).toBeTruthy();
    expect(header.isPresent()).toBeTruthy();
  });

  afterAll(() => {
    browser.waitForAngularEnabled(true);

    /*let btnMenuNavDrawer = element(by.tagName('ion-navbar')).all(by.css('button')).get(1);
    btnMenuNavDrawer.click().then(() => {
      browser.driver.sleep(2000);
      let btnLogout = element(by.tagName('ion-menu')).element(by.tagName('ion-list')).all(by.tagName('button')).last();
      btnLogout.click().then(() => console.log("Log out button clicked."));
    });*/
  });

});
