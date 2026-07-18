import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CampaignPage } from '../pages/CampaignPage';

test('E2E Campaign Flow via Enhanced Page Object Model', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const campaignPage = new CampaignPage(page);

  const campaign1 = 'Campaign 501';
  const campaign2 = 'Campaign 502';

  // Login
  await loginPage.navigate();
  await loginPage.login('qa@example.com', 'Password@123');

  // 1. Create Draft 1
  await campaignPage.createCampaignDraft({
    name: campaign1,
    email: 'campaign501@gmail.com',
    subject: campaign1,
    content: 'Just for testing'
  });

  // 2. Create Draft 2
  await campaignPage.createCampaignDraft({
    name: campaign2,
    email: 'campaign502@gmail.com',
    subject: campaign2,
    content: 'Just for testing'
  });

  
// 3. Verify on Drafts Tab with unique data-testid locators
  await campaignPage.draftsTabBtn.click();
  await expect(page.locator(`td[data-testid="draft-name"]:has-text("${campaign1}")`)).toBeVisible();
  await expect(page.locator(`td[data-testid="draft-name"]:has-text("${campaign2}")`)).toBeVisible();
  // 4. Schedule Campaign 1 (Future)
  await campaignPage.scheduleCampaignWithDate(campaign1, '2026-07-18T18:12');
  // 5. Send Campaign 2 (Now)
  await campaignPage.sendCampaignNow(campaign2);

  // 6. Verify Reports Tab Output
  await campaignPage.reportsTabBtn.click();
  await expect(page.locator(`tr:has-text("${campaign1}")`)).toContainText('Scheduled');
  await expect(page.locator(`tr:has-text("${campaign2}")`)).toContainText('Sent');
});