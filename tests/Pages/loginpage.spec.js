/**
 * Login Page Tests
 * Tests for the login page using Playwright
 */

//import the test and expect functions from Playwright
const { test, expect } = require("@playwright/test");


test.describe("Login Page", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/auth/Login");
    });

    test('should display page title', async ({ page }) => {
        await expect(page).toHaveTitle("Internal Issues");
    });

    for (const viewport of [
        { width: 320, height: 568 },
        { width: 360, height: 640 },
        { width: 844, height: 390 },
        { width: 1280, height: 500 },
        { width: 1920, height: 1080 },
    ]) {
        test(`should show both login cards within the viewport at ${viewport.width}x${viewport.height}`, async ({ page }) => {
            await page.setViewportSize(viewport);
            await page.goto("/auth/Login");

            for (const card of [page.locator("#loginSection"), page.locator('[aria-labelledby="demo-login-heading"]')]) {
                const box = await card.boundingBox();
                expect(box).not.toBeNull();
                expect(box.y).toBeGreaterThanOrEqual(0);
                expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
            }
        });
    }

    test('should display logo inside Login div', async ({ page }) => {
        const logo = page.locator('img[alt="Internal Issues Ticket"]');
        await expect(logo).toBeVisible();
    });

    test('should display logo position in the middle and above all other elements', async ({ page }) => {
        const logo = page.locator('img[alt="Internal Issues Ticket"]');
        await expect(logo).toHaveClass(/mx-auto/);

        const loginSection = page.locator("#loginSection");
        await expect(loginSection).toBeVisible();
        await expect(logo).toBeVisible();

        const logoBox = await logo.boundingBox();
        expect(logoBox).not.toBeNull();

        const elementsBelowLogo = [
            page.getByRole("heading", { name: "Sign in" }),
            page.getByLabel("Email"),
            page.getByLabel("Password"),
            page.getByRole("button", { name: "Submit", exact: true }),
        ];

        for (const element of elementsBelowLogo) {
            await expect(element).toBeVisible();
            const elementBox = await element.boundingBox();
            expect(elementBox).not.toBeNull();
            expect(elementBox.y).toBeGreaterThanOrEqual(logoBox.y + logoBox.height);
        }
    });

    test('should display email and password input labels and fields', async ({ page }) => {
        const emailLabel = page.getByLabel('Email');
        const passwordLabel = page.getByLabel('Password');
        await expect(emailLabel).toBeVisible();
        await expect(passwordLabel).toBeVisible();

        const emailInput = page.locator('input[name="email"]');
        const passwordInput = page.locator('input[name="password"]');
        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
    });

    test('should display email and password submit button', async ({ page }) => {
        const submitButton = page.getByRole('button', { name: 'Submit', exact: true });
        await expect(submitButton).toBeVisible();
    });

    test('should navigate to the Register page from the Register button', async ({ page }) => {
        await page.getByRole('button', { name: 'Register', exact: true }).click();

        await expect(page).toHaveURL(/\/auth\/Register$/);
    });

    test('should display Admin, PM, Dev, and Submitter Demo buttons', async ({ page }) => {
        const adminDemoButton = page.getByRole('button', { name: 'Demo Admin', exact: true });
        const pmDemoButton = page.getByRole('button', { name: 'Demo PM', exact: true });
        const devDemoButton = page.getByRole('button', { name: 'Demo Dev', exact: true });
        const submitterDemoButton = page.getByRole('button', { name: 'Demo Sub', exact: true });

        await expect(adminDemoButton).toBeVisible();
        await expect(pmDemoButton).toBeVisible();
        await expect(devDemoButton).toBeVisible();
        await expect(submitterDemoButton).toBeVisible();
    });

    test("should send demo login to the local API during development", async ({ page }) => {
        let requestUrl;
        await page.route("**/Authentication/Login", async (route) => {
            requestUrl = route.request().url();
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    token: "playwright-demo-token",
                    user: { fullName: "Demo Admin" },
                }),
            });
        });

        await page.getByRole("button", { name: "Demo Admin", exact: true }).click();

        await expect.poll(() => requestUrl).toBe("https://localhost:7110/Authentication/Login");
        await expect(page).toHaveURL("/");
    });
});