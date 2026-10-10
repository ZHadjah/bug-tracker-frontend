const { test, expect } = require("@playwright/test");
    
test.describe("Create a Project Page", () => {

    //users need to authenticate to access the dashboard page,
    //so I will set a token in local storage before each test
    test.beforeEach(async ({ page }) => {
        await page.route("https://localhost:7110/Companies", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    $values: [
                        { id: 1, name: "Example Company One" },
                        { id: 2, name: "Example Company Two" },
                    ],
                }),
            })
        );
        await page.addInitScript(() =>
            localStorage.setItem("user_token", "playwright-test-token")
        );
        await page.goto("/projects/create");
    });

    test('should display page title', async ({ page }) => {
        await expect(page).toHaveTitle("Internal Issues");
    });

    test('should display project name, description, and company labels and fields', async ({ page }) => {
        const projectName = page.getByLabel("Project Name", { exact: true });
        const description = page.getByLabel("Description", { exact: true });
        const company = page.getByLabel("Company", { exact: true });

        await expect(projectName).toBeVisible();
        await expect(projectName).toHaveAttribute("name", "project");
        await expect(projectName).toHaveAttribute("required", "");
        await expect(projectName).toHaveAccessibleName("Project Name");

        await expect(description).toBeVisible();
        await expect(description).toHaveAttribute("name", "Description");
        await expect(description).toHaveAttribute("required", "");

        await expect(company).toBeVisible();
        await expect(company).toHaveAttribute("name", "company");
        await expect(company).toHaveAttribute("required", "");
        await expect(company).toHaveAccessibleName("Company");
        await expect(company.getByRole("option")).toHaveText([
            "Select a company",
            "Example Company One",
            "Example Company Two",
        ]);

        await description.focus();
        await page.keyboard.press("Tab");
        await expect(company).toBeFocused();

        await company.press("ArrowDown");
        await expect(company).toHaveValue("1");
    });

    test('should display submit button', async ({ page }) => {
        const submitButton = page.getByRole('button', { name: 'Submit button', exact: true });
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toHaveAccessibleName("Submit button");
    });



});