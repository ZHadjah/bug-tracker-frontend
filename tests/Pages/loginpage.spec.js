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
});