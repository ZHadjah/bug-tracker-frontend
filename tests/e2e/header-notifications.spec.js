const { test, expect } = require("@playwright/test");

test("notification button opens a panel that can be closed with Escape", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("user_token", "playwright-test-token"));
  await page.goto("/");

  const notificationButton = page.getByRole("button", { name: "Notifications, 20 unread" });
  await expect(notificationButton).toBeVisible();
  await notificationButton.focus();
  await page.keyboard.press("Enter");

  const panel = page.getByRole("region", { name: "Notifications" });
  await expect(panel).toBeVisible();
  await expect(panel).toContainText("20 unread notifications");

  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
});
