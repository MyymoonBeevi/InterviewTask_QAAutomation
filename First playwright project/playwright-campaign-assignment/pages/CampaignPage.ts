import { Page, Locator } from '@playwright/test';

export class CampaignPage {
  private page: Page;
  
  // Existing Form Locators
  readonly newCampaignTabBtn: Locator;
  readonly campaignNameInput: Locator;
  readonly senderEmailInput: Locator;
  readonly subjectInput: Locator;
  readonly contactListDropdown: Locator;
  readonly emailContentTextArea: Locator;
  readonly saveDraftButton: Locator;
  readonly previewButton: Locator;
  readonly clearButton: Locator;
  readonly validationBanner: Locator;

  // Newly Discovered Tab & Section Locators
  readonly draftsTabBtn: Locator;
  readonly scheduleTabBtn: Locator;
  readonly reportsTabBtn: Locator;
  readonly scheduleCampaignDropdown: Locator;
  readonly scheduleDateInput: Locator;
  readonly scheduleSubmitBtn: Locator;
  readonly sendNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Core Form Assignments
    this.newCampaignTabBtn = page.locator('button:has-text("New Campaign"), #tab-new-campaign');
    this.campaignNameInput = page.getByTestId('campaign-name');
    this.senderEmailInput = page.getByTestId('sender-email');
    this.subjectInput = page.getByTestId('subject');
    this.contactListDropdown = page.getByTestId('contact-list');
    this.emailContentTextArea = page.getByTestId('content');
    this.saveDraftButton = page.getByTestId('save-draft-button');
    this.previewButton = page.getByTestId('preview-button');
    this.clearButton = page.getByTestId('clear-button');
    this.validationBanner = page.locator('.alert-danger, div:has-text("Cannot create campaign"), div:has-text("required")');

    // Navigation Tab Assignments
    this.draftsTabBtn = page.getByTestId('tab-drafts');
    this.scheduleTabBtn = page.getByTestId('tab-schedule');
    this.reportsTabBtn = page.getByTestId('tab-reports');

    // Schedule Engine Assignments
    this.scheduleCampaignDropdown = page.getByTestId('schedule-campaign');
    this.scheduleDateInput = page.getByTestId('schedule-date');
    this.scheduleSubmitBtn = page.getByTestId('schedule-button');
    this.sendNowButton = page.getByTestId('send-now-button');
  }

  // Helper method to fill out form fields
  async fillCampaignForm(details: { name: string; email: string; subject: string; content: string }) {
    await this.campaignNameInput.fill(details.name);
    await this.senderEmailInput.fill(details.email);
    await this.subjectInput.fill(details.subject);
    await this.emailContentTextArea.fill(details.content);
  }

  /// Helper method to select option lists
  async selectContactList(index: number) {
    await this.contactListDropdown.selectOption({ index: index });
  }

  /**
   * Complete a Campaign Draft Creation cycle in one step
   */
  async createCampaignDraft(details: { name: string; email: string; subject: string; content: string }, contactListIndex: number = 1) {
    await this.newCampaignTabBtn.click();
    await this.fillCampaignForm(details);
    await this.selectContactList(contactListIndex);
    await this.saveDraftButton.click();
  }

  /**
   * Selects a draft campaign from the dropdown and sets a calendar schedule time
   */
  async scheduleCampaignWithDate(campaignName: string, dateTimeValue: string) {
    await this.scheduleTabBtn.click();
    await this.scheduleCampaignDropdown.selectOption({ label: campaignName });
    await this.scheduleDateInput.fill(dateTimeValue);
    await this.scheduleSubmitBtn.click();
  }

  /**
   * Selects a draft campaign and triggers an immediate Send Now execution
   */
  async sendCampaignNow(campaignName: string) {
    await this.scheduleTabBtn.click();
    await this.scheduleCampaignDropdown.selectOption({ label: campaignName });
    await this.sendNowButton.click();
  }
}