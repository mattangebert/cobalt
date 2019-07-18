import { browser, by, element } from 'protractor';

/**
 * AppPage
 * ================
 *
 * This class is used to display default pages
 */
export class AppPage {
  /**
   * Navigate to baseUrl
   * @return the Promise of the baseUrl
   */
  public navigateTo(): Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  /**
   * Get Title
   * @return the Titles string as Promise
   */
  public getTitleText(): Promise<string> {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
