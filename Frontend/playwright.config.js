// playwright.config.js
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  // Configure test directory
  testDir: "./tests",
  // Configure test timeout
  testMatch: "**/*.test.js", 
  timeout: 30000,
  // Configure retries
  retries: 1,
  // Configure report format
  reporter: [["list"], ["json", { outputFile: "test-results.json" }]],
  // Configure projects
 projects: [
    {
      name: 'chromium', // Default name for Chromium/Chrome
      use: {
        browserName: 'chromium', // You can specify 'chromium' here to use Chrome
      },
    },
],
});
