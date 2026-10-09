const AxeBuilder = require("@axe-core/playwright").default;
const { test, expect } = require("@playwright/test");

test.describe("Accessibility Tests for Login Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/auth/Login");
    });

    test("has no detected accessibility violations", async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});

test.describe("Accessibility Tests for Dashboard Page", () => {
    //users need to authenticate to access the dashboard page,
    //so I will set a token in local storage before each test
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() =>
            localStorage.setItem("user_token", "playwright-test-token")
        );
        await page.goto("/");
    });

    test("has no detected accessibility violations", async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});