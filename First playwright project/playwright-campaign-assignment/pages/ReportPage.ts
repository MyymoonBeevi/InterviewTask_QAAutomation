import { Page, Locator } from '@playwright/test';

export class ReportsPage {
  private page: Page;
  readonly reportsTabBtn: Locator;
  readonly totalCampaignsMetric: Locator;
  readonly draftsCountMetric: Locator;

  constructor(page: Page) {
    this.page = page;
    this.reportsTabBtn = page.getByTestId('tab-reports');
    this.totalCampaignsMetric = page.locator('.metric-card:has-text("Total Campaigns") h1, #total-campaigns');
    this.draftsCountMetric = page.locator('.metric-card:has-text("Drafts") h1, #drafts-count');
  }
}