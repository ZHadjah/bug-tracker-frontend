const { test, expect } = require("@playwright/test");
const { tickets, expectActionButtonOnTablePage } = require("../Helpers/ticketsEntityTestHelpers");

test.describe("Tickets Page", () => {

    //users need to authenticate to access the dashboard page,
    //so I will set a token in local storage before each test
    test.beforeEach(async ({ page }) => {
        await page.route("https://localhost:7110/Tickets", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ $values: tickets }),
            })
        );
        await page.addInitScript(() =>
            localStorage.setItem("user_token", "playwright-test-token")
        );
        await page.goto("/tickets");
    });

    test('should display page title', async ({ page }) => {
        await expect(page).toHaveTitle("Internal Issues");
    });

    test('should display tickets table', async ({ page }) => {
        const ticketsTable = page.getByRole("main");
        await expect(ticketsTable).toBeVisible();
    });

    test('should have a edit button for every entry in the tickets table', async ({ page }) => {
        const result = await expectActionButtonOnTablePage(page, {
            tableName: "Tickets",
            actionName: "Edit",
            expectedRowCount: tickets.length,
        });

        expect(result.pageCount).toBeGreaterThan(0);
        expect(result.checkedRowCount).toBe(result.expectedRowCount);
        expect(result.rowsMissingAction).toEqual([]);
    });

    test('should have a delete button for every entry in the tickets table', async ({ page }) => {
        const result = await expectActionButtonOnTablePage(page, {
            tableName: "Tickets",
            actionName: "Delete",
            expectedRowCount: tickets.length,
        });

        expect(result.pageCount).toBeGreaterThan(0);
        expect(result.checkedRowCount).toBe(result.expectedRowCount);
        expect(result.rowsMissingAction).toEqual([]);
    });
});