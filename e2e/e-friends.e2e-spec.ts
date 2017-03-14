/**
 * Created by stijnergeerts on 20/02/17.
 */
import {by, element, browser} from "protractor";
describe('Friends-page', () => {
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

  beforeEach(() => {
    let btnMenuNavDrawer = element(by.tagName('ion-navbar')).all(by.css('button')).get(1);
    btnMenuNavDrawer.click().then(() => {
      browser.driver.sleep(2000);
      let btnFriends= element(by.className('list')).all(by.tagName('button')).get(2);
      btnFriends.click().then(() =>{
        console.log("Friends button clicked.");
        browser.driver.sleep(15000);
      });
    });
  });

  it('should have tabbar, tabs, header & title ', () => {

    let tabBar = element(by.tagName("ion-tabs"))
    let tabFriend= element(by.className("tab-friend"));
    let tabRequest= element(by.className("tab-request"));
    let title = element(by.id('tab-title'));
    expect(tabBar.isPresent()).toBeTruthy();
    expect(tabFriend.isPresent()).toBeTruthy();
    expect(tabRequest.isPresent()).toBeTruthy();
    expect(title.isPresent()).toBeTruthy();
    expect(title.getText()).toBe('Friends');

  });

  it('should have friend lists', () => {

    browser.driver.sleep(6000);
    let searchBar = element(by.tagName('ion-searchbar'));
    let listOnlineFriends = element(by.id('online-friends'));
    let listOfflineFriends = element(by.id('offline-friends'));
    expect(searchBar.isPresent()).toBeTruthy();
    expect(listOnlineFriends.isPresent()).toBeTruthy();
    expect(listOnlineFriends.getText()).toBe('Online');
    expect(listOfflineFriends.isPresent()).toBeTruthy();
    expect(listOfflineFriends.getText()).toBe('Offline');
  });

  /*
  it('should have add friends button', () => {

    let tabRequest= element.all(by.className("tab-requests")).get(0);
    tabRequest.click().then(()=>{
        console.log('Request button clicked');
        browser.sleep(2000);
      }
    );
    let btnAddNewFriends = element(by.id('button-addfriends'));
    expect(btnAddNewFriends.isPresent()).toBeTruthy();
    btnAddNewFriends.click().then(()=>{
        console.log('Add new friends button clicked');
        browser.sleep(2000);
      }
    );
    let searchBar = element(by.tagName('ion-searchbar'));
    let listsAddNewFriends = element(by.id('add-new-friends'));
    expect(searchBar.isPresent()).toBeTruthy();
    expect(listsAddNewFriends.isPresent()).toBeTruthy();
    expect(listsAddNewFriends.getText()).toBe('Add New Friends');

  });

*/
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
