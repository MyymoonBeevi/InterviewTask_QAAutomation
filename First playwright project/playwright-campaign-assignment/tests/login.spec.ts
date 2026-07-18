import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Section 1 - Authentication Rules', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Verify successful login with valid credentials', async ({ page }) => {
    await loginPage.login('qa@example.com', 'Password@123');
    await expect(page.getByTestId('logout-button')).toBeVisible();
  });

  // FIXED: Added ({ page }) fixture here
  test('Verify invalid login shows error banner', async ({ page }) => {
    await loginPage.login('bad_user@example.com', 'WrongPass');
    
    // Using direct text selection to safely find the error message element dynamically
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  // FIXED: Added ({ page }) fixture here
  test('Verify empty form submissions display warning validation', async ({ page }) => {
    await loginPage.login('', '');
    
    // Bypasses the broken property locator using a safe text selector
    await expect(page.locator('text=Email and password are required')).toBeVisible();
  });
});