import { Page, Locator } from '@playwright/test';

export class DraftsPage {
  private page: Page;
  readonly draftsTabBtn: Locator;
  readonly draftRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.draftsTabBtn = page.getByTestId('tab-drafts');
    this.draftRows = page.locator('.draft-item, tr:has-text("Draft")'); 
  }

  async openDraftByName(name: string) {
    await this.draftsTabBtn.click();
    await this.page.locator(`tr:has-text("${name}")`).locator('button:has-text("Open"), .open-draft-btn').click();
  }
}