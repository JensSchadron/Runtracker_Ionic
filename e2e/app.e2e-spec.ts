import {browser, element, by} from 'protractor';

describe('General navigation', () => {
  beforeEach(() => {
    browser.get('');
  });

  it('should have {nav}', () => {
    expect(element(by.css('ion-navbar')).isPresent()).toBeTruthy();
  });
});
