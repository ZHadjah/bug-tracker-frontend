const { test, expect } = require("@playwright/test");
const users = require("../Helpers/usersEntityTestHelpers");
const { expectActionButtonOnTablePage } = require("../Helpers/ticketsEntityTestHelpers");

test.describe("Users Page", () => {

    //users need to authenticate to access the dashboard page,
    //so I will set a token in local storage before each test
    test.beforeEach(async ({ page }) => {
        await page.route("https://localhost:7110/Users", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ $values: users }),
            })
        );
        await page.addInitScript(() =>
            localStorage.setItem("user_token", "playwright-test-token")
        );
        await page.goto("/Users");
    });

    test('should display page title', async ({ page }) => {
        await expect(page).toHaveTitle("Internal Issues");
    });

    test('should display users table', async ({ page }) => {
        const usersTable = page.getByRole("main");
        await expect(usersTable).toBeVisible();
    });

    test('should have a edit button for every entry in the users table', async ({ page }) => {
        const result = await expectActionButtonOnTablePage(page, {
            tableName: "Users",
            actionName: "Edit",
            expectedRowCount: users.length,
        });

        expect(result.pageCount).toBeGreaterThan(0);
        expect(result.checkedRowCount).toBe(result.expectedRowCount);
        expect(result.rowsMissingAction).toEqual([]);
    });

    test('should have a delete button for every entry in the users table', async ({ page }) => {
        const result = await expectActionButtonOnTablePage(page, {
            tableName: "Users",
            actionName: "Delete",
            expectedRowCount: users.length,
        });

        expect(result.pageCount).toBeGreaterThan(0);
        expect(result.checkedRowCount).toBe(result.expectedRowCount);
        expect(result.rowsMissingAction).toEqual([]);
    });
});