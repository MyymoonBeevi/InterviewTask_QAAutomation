import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CampaignPage } from '../pages/CampaignPage';
import { DraftsPage } from '../pages/DraftPage';
import { SchedulePage } from '../pages/SchedulePage';
import { ReportsPage } from '../pages/ReportPage';
import { campaignTestData } from '../test-data/campaignData';

test.describe('Section 3 - Time and Date Scheduling Constraints', () => {
  let loginPage: LoginPage;
  let campaignPage: CampaignPage;
  let draftsPage: DraftsPage;
  let schedulePage: SchedulePage;
  let reportsPage: ReportsPage;

  // Unique campaign name string to isolate our execution pass cleanly
  const diagnosticCampaignName = `Campaign_${Date.now()}`;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    campaignPage = new CampaignPage(page);
    draftsPage = new DraftsPage(page);
    schedulePage = new SchedulePage(page);
    reportsPage = new ReportsPage(page);

    await loginPage.navigate();
    await loginPage.login('qa@example.com', 'Password@123');
  });

  test('Verify full workflow: Create Draft -> Open Draft -> Schedule -> Validate Report', async ({ page }) => {
    // 1. Create a campaign and save it as a draft
    await campaignPage.newCampaignTabBtn.click();
    await campaignPage.fillCampaignForm({
      ...campaignTestData.validCampaign,
      name: diagnosticCampaignName
    });
    await campaignPage.selectContactList(1);
    await campaignPage.saveDraftButton.click();

    // 2. Click the Drafts tab and verify the saved campaign is present
    await draftsPage.draftsTabBtn.click();
  
    // Explicitly target the draft row attribute to resolve the strict mode violation
    const targetedDraftRow = page.locator(`tr[data-testid="draft-row"]:has-text("${diagnosticCampaignName}")`);
    await expect(targetedDraftRow).toBeVisible();

    // 3. Open the draft campaign from the table list view
    await targetedDraftRow.getByRole('button', { name: 'Open' }).click();
    
    // Verify the draft details reloaded into the creation pane correctly
    await expect(campaignPage.campaignNameInput).toHaveValue(diagnosticCampaignName);

    // 4. Go to Schedule tab, select the draft by index 1, pick time, and schedule it
    // FIXED: Changed first argument from string to index number (1) to match our clean SchedulePage method signature
    await schedulePage.scheduleCampaign(1, '2026-07-18T20:57');
    
    // Assert success banner appears perfectly
    await expect(schedulePage.successBanner).toBeVisible();

    // 5. Click the Reports tab and confirm the campaign reflects as "Scheduled"
    await reportsPage.reportsTabBtn.click();
    
    // Find our specific item line in the metrics table summary
    const reportCampaignRow = page.locator(`tr:has-text("${diagnosticCampaignName}")`);
    await expect(reportCampaignRow).toBeVisible();
    
    // Confirm the status column reflects "Scheduled" style badge
    const statusCell = reportCampaignRow.locator('text=Scheduled');
    await expect(statusCell).toBeVisible();
  });
});