/**
 * Created by stijnergeerts on 20/02/17.
 */
import {by, element, browser} from "protractor";
describe('Home page - general', () => {
  beforeEach(() => {
    browser.get('');
  });
  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Home');
  });

  it('should have navbar', () => {
    let navBar = element(by.tagName('ion-navbar'));
    expect(navBar.isPresent()).toBeTruthy();
  });

  it('test navbar title', () => {
    let navBarTitle = element.all(by.css('ion-title')).get(1);

    expect(navBarTitle.isPresent()).toBeTruthy();
    expect(navBarTitle.getText()).toBe('Home');
  });

});
