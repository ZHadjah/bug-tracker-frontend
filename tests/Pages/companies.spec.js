const { test, expect } = require("@playwright/test");
    
test.describe("Companies Page", () => {

    //users need to authenticate to access the dashboard page,
    //so I will set a token in local storage before each test
    test.beforeEach(async ({ page }) => {
        await page.route("https://localhost:7110/companies", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    $values: [
                        { id: 1, name: "Example Company One", description: "First test company", members: 3 },
                        { id: 2, name: "Example Company Two", description: "Second test company", members: 5 },
                    ],
                }),
            })
        );
        await page.addInitScript(() =>
            localStorage.setItem("user_token", "playwright-test-token")
        );
        await page.goto("/companies");
    });

    test('should display page title', async ({ page }) => {
        await expect(page).toHaveTitle("Internal Issues");
    });

    test('should display companies table', async ({ page }) => {
        const companiesTable = page.getByRole("main");
        await expect(companiesTable).toBeVisible();
    });

    test('should have a edit button for every entry in the companies table', async ({ page }) => {
        const companiesTable = page.getByRole("table", { name: "Companies" });
        const rows = companiesTable.locator("tbody tr");
        await expect(rows).toHaveCount(2);
        const rowCount = await rows.count();

        for (let index = 0; index < rowCount; index += 1) {
            await expect(
                rows.nth(index).getByRole("button", { name: /^Edit / })
            ).toBeVisible();
        }
    });

    test('should have a delete button for every entry in the companies table', async ({ page }) => {
        const companiesTable = page.getByRole("table", { name: "Companies" });
        const rows = companiesTable.locator("tbody tr");
        await expect(rows).toHaveCount(2);
        const rowCount = await rows.count();

        for (let index = 0; index < rowCount; index += 1) {
            await expect(
                rows.nth(index).getByRole("button", { name: /^Delete / })
            ).toBeVisible();
        }
    });



});