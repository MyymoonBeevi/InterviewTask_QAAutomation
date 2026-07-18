export const campaignTestData = {
  validCampaign: {
    name: 'Automation Campaign Q3',
    email: 'marketing@example.com',
    subject: 'Playwright Verification Run',
    content: 'This is an automated structural validation verification.'
  },
  invalidEmailCampaign: {
    name: 'Email Validation Test',
    email: 'invalid-email-format', // Missing @ and domain
    subject: 'Testing Bad Email Input',
    content: 'Checking structural layout.'
  },
  duplicateCampaign: {
    name: 'Automation Campaign Q3', // Matches validCampaign to check duplicates
    email: 'marketing@example.com',
    subject: 'Second Run Campaign',
    content: 'Testing identical name handling.'
  }
};