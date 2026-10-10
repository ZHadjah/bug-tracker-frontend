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

    test("should use a sticky Bootstrap navbar", async ({ page }) => {
        const navbar = page.getByRole("banner");

        await expect(navbar).toHaveClass(/navbar/);
        await expect(navbar).toHaveClass(/sticky-top/);
        await expect(navbar).toHaveCSS("position", "sticky");
    });

    test("should simplify the mobile navbar and align controls to the inline end", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        const header = page.getByRole("banner");
        const hamburger = page.getByRole("button", { name: "Open navigation menu" });
        const branding = header.locator(".header-brand");
        const actions = header.locator(".header-actions");
        const logout = header.getByRole("button", { name: "Logout", exact: true });
        const notifications = header.getByRole("button", { name: /Notifications/ });

        await expect(hamburger).toBeVisible();
        await expect(branding).toBeHidden();
        await expect(logout).toBeVisible();
        await expect(notifications).toBeVisible();

        const alignment = await header.evaluate((element) => {
            const headerBox = element.getBoundingClientRect();
            const hamburgerBox = element.querySelector(".header-start").getBoundingClientRect();
            const actionsBox = element.querySelector(".header-actions").getBoundingClientRect();
            const isRtl = getComputedStyle(element).direction === "rtl";
            return isRtl
                ? hamburgerBox.right <= headerBox.right && actionsBox.left >= headerBox.left
                : hamburgerBox.left >= headerBox.left && actionsBox.right <= headerBox.right;
        });

        expect(alignment).toBe(true);

        await page.locator("html").evaluate((element) => {
            element.setAttribute("dir", "rtl");
        });

        const rtlActionsAtInlineEnd = await actions.evaluate((element) => {
            const headerBox = element.closest("header").getBoundingClientRect();
            const actionsBox = element.getBoundingClientRect();
            return actionsBox.left >= headerBox.left;
        });
        expect(rtlActionsAtInlineEnd).toBe(true);
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