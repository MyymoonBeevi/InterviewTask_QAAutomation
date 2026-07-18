# Playwright Automation Assignment — Email Campaign Dashboard

A robust E2E test automation framework designed with Playwright, TypeScript, and the Page Object Model (POM) to validate the core features of the Email Campaign Dashboard application.

## 🚀 Features Covered
* **Authentication Rules:** Verification of valid credentials, error validation messages, and empty form handling.
* **Drafts Lifecycle:** Verifying created campaign drafts maintain exact structural data integrity when reopened.
* **Time & Date Scheduling Constraints:** Validating forward scheduling with correct date-time input parameters and enforcing restrictions against scheduling back-dated/past campaigns.
* **Real-time Dispatching:** Validating the "Send Now" workflow transition logic.
* **Aggregated Reporting:** Dynamic row-by-row isolation metrics ensuring accurate status logging (`Draft`, `Scheduled`, `Sent`).

---

## 🛠️ Setup Instructions

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (comes bundled with Node.js)

### 2. Installation
Clone or navigate to your project directory and execute the following commands to install dependencies and required automation browsers:

```bash
# Install all framework dependencies listed in package.json
npm install

# Download and install the specific Playwright browser binaries
npx playwright install chromium
