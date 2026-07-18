import { Page, Locator } from '@playwright/test';

export class SchedulePage {
  private page: Page;
  readonly scheduleTabBtn: Locator;
  readonly campaignDraftDropdown: Locator; 
  readonly dateTimeInput: Locator;
  readonly scheduleSubmitBtn: Locator; // This will hold our updated unique locator
  readonly successBanner: Locator;         

  constructor(page: Page) {
    this.page = page;
    this.scheduleTabBtn = page.getByTestId('tab-schedule');
    this.campaignDraftDropdown = page.getByTestId('schedule-campaign'); 
    this.dateTimeInput = page.locator('input[type="datetime-local"]');
    
    // FIXED: Changed from text selection to dedicated test id selector
    this.scheduleSubmitBtn = page.getByTestId('schedule-button');
    
    this.successBanner = page.locator('text=Campaign scheduled successfully');
  }

  /**
   * Complete the scheduling flow using the dynamic dropdown index selection
   */
  async scheduleCampaign(index: number = 1, dateTimeValue: string) {
    await this.scheduleTabBtn.click();
    await this.campaignDraftDropdown.selectOption({ index: index });
    await this.dateTimeInput.fill(dateTimeValue);
    await this.scheduleSubmitBtn.click();
  }
}