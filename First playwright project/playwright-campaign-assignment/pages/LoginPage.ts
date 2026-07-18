import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly globalMessageBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.loginButton = page.getByTestId('login-button');
    this.globalMessageBanner = page.locator('.alert, [role="alert"], #message-banner'); // Fallback alert container
  }

  async navigate() {
    await this.page.goto('/qa.html');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}