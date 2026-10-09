const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  //will find and run all spec.js files 
  testDir: "./tests",

  //Run tests in parallel
  fullyParallel: true,

  //Controls how Playwright prints test results in the terminal.
  reporter: [
    ["list"],
    ["html"]
  ],

  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",

    //Take video and screenshot on failure or on first retry
    video: "on-first-retry",
    screenshot: "only-on-failure",
  },
  
  //configure projects for major browsers
  projects: [
    //Configure project for desktop browsers
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "edge",
      use: { ...devices["Desktop Chrome"], channel: "msedge" },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    
    //Configure project for mobile browsers
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"]},
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 14"]},
    },
  ],

  //Run local dev server before tests
  webServer: {
    command: "npm.cmd start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
