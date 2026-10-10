const { test, expect } = require("@playwright/test");
const {
    inputFieldLabels,
    dropdownResponses,
    ticketCreateFieldRoles,
} = require("../Helpers/ticketsEntityTestHelpers");

test.describe("Tickets Create Page", () => {

    //users need to authenticate to access the dashboard page,
    //so I will set a token in local storage before each test
    test.beforeEach(async ({ page }) => {
        for (const [url, response] of Object.entries(dropdownResponses)) {
            await page.route(url, (route) =>
                route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify(response),
                })
            );
        }

        await page.addInitScript(() =>
            localStorage.setItem("user_token", "playwright-test-token")
        );
        await page.goto("/tickets/create");
    });

    test('should display page title', async ({ page }) => {
        await expect(page).toHaveTitle("Internal Issues");
    });

    test('should display all the proper fields and labels', async ({ page }) => {
        for (const { label } of inputFieldLabels) {
            const inputField = page.getByLabel(label, { exact: true });
            await expect(inputField).toBeVisible();
            await expect(inputField).toHaveRole(ticketCreateFieldRoles[label]);
            await expect(inputField).toHaveAccessibleName(label);
        }
    });    

    test("should display the create ticket button", async ({ page }) => {
    const createButton = page.getByRole("button", {
        name: "Submit",
        exact: true,
    });

    await expect(createButton).toBeVisible();
    await expect(createButton).toHaveAccessibleName("Submit");
    });

    test("should populate the Project dropdown with projects from the API", async ({ page }) => {
        const project = page.getByLabel("Project", { exact: true });

        await expect(project.locator("option")).toHaveText([
            "Select a project",
            "Website Redesign",
            "Mobile App",
            "Desktop App",
            "API Development",
            "Documentation",
        ]);
    });

    test("should populate the Ticket Type dropdown with options from the API", async ({ page }) => {
        const ticketType = page.getByLabel("Ticket Type", { exact: true });

        await expect(ticketType.locator("option")).toHaveText([
            "Select a type",
            "New Development",
            "Work Task",
            "Defect",
            "Change Request",
            "Enhancement",
            "General Task",
        ]);
    });

    test("should populate the Ticket Priority dropdown with options from the API", async ({ page }) => {
        const ticketPriority = page.getByLabel("Ticket Priority", { exact: true });

        await expect(ticketPriority.locator("option")).toHaveText([
            "Select a priority",
            "Low",
            "Medium",
            "High",
            "Urgent"
        ]);
    });

    test("should populate the Ticket Status dropdown with options from the API", async ({ page }) => {
        const ticketStatus = page.getByLabel("Ticket Status", { exact: true });

        await expect(ticketStatus.locator("option")).toHaveText([
            "Select a status",
            "New",
            "Development",
            "Testing",
            "Resolved"
        ]);
    });

    test("should populate the Owner and Developer dropdowns with users from the API", async ({ page }) => {
        const userNames = dropdownResponses[
            "https://localhost:7110/UserRoles/GetAllUsersInCompany"
        ].map(({ FullName }) => FullName);

        for (const [label, placeholder] of [
            ["Owner", "Select an owner"],
            ["Developer", "Select a developer"],
        ]) {
            const userDropdown = page.getByLabel(label, { exact: true });
            await expect(userDropdown.locator("option")).toHaveText([
                placeholder,
                ...userNames,
            ]);
        }
    });

});