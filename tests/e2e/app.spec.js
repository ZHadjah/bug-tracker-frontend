//import test and expect funcions from playwright
const { test, expect } = require("@playwright/test");

test("login page is available", async ({ page }) => {
  await page.goto("/auth/Login");

  await expect(page.getByRole("button", { name: "Demo Admin" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});
