const { test, expect } = require("@playwright/test");

test("sidebar items can each be reached with Tab", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("user_token", "playwright-test-token"));
  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(navigation).toBeVisible();

  for (const groupName of ["Tickets", "Projects", "Users"]) {
    await navigation.locator(".ant-menu-submenu-title").filter({ hasText: groupName }).click();
  }

  const visibleMenuItems = navigation.locator(".ant-menu-item:visible, .ant-menu-submenu-title:visible");
  const itemCount = await visibleMenuItems.count();

  for (let index = 0; index < itemCount; index += 1) {
    await expect(visibleMenuItems.nth(index)).toHaveAttribute("tabindex", "0");
  }

  await visibleMenuItems.first().focus();
  for (let index = 1; index < itemCount; index += 1) {
    await page.keyboard.press("Tab");
    await expect(visibleMenuItems.nth(index)).toBeFocused();
  }
});
