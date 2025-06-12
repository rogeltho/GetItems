import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getHeaderLogoText(): Promise<string> {
    return element(by.css('app-root header .logo')).getText();
  }
}
