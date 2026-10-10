const { test, expect } = require("@playwright/test");

test.describe("Header ", () => {
    //users need to authenticate to access the dashboard page,
    //so I will set a token in local storage before each test
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() =>
            localStorage.setItem("user_token", "playwright-test-token")
        );
        await page.goto("/");
    });

    test('should have logo in the inline start of the header (top left for LTR, top right for RTL)', async ({ page }) => {
        
    });


    test('should have text: Internal Issues, next to the logo', async ({ page }) => {
        
    });


    test('should have logout button', async ({ page }) => {
        
    });

    test('should have a properly functioning logout button', async ({ page }) => {
        const logoutButton = page.getByRole("button", { name: "Logout", exact: true });

        await expect(logoutButton).toBeVisible();
        await expect(logoutButton).toHaveAccessibleName({ name: "Logout", exact: true });
        await logoutButton.click();

        await expect(page).toHaveURL(/\/auth\/Login$/);
        await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
        expect(await page.evaluate(() => localStorage.getItem("user_token"))).toBeNull();
    });


    test('should have should have notification button with notifications (for demo user only)', async ({ page }) => {
        
    });


    test('should have should have a properly functioning notification button with notifications (for demo user only)', async ({ page }) => {
        
    });
});