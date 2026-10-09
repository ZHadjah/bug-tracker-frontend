/**
 * Dashboard Page Tests
 * Tests for the dashboard page using Playwright
 */

//import the test and expect functions from Playwright
const { test, expect } = require("@playwright/test");


test.describe("Dashboard Page", () => {

    //users need to authenticate to access the dashboard page,
    //so I will set a token in local storage before each test
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() =>
            localStorage.setItem("user_token", "playwright-test-token")
        );
        await page.goto("/");
    });

    test('should display page title', async ({ page }) => {
        await expect(page).toHaveTitle("Internal Issues");
    });

    test('should display four cards at the top of the page', async ({ page }) => {
        const usersCard = page.locator('#dashboardUsersCard');
        const ticketsCard = page.locator('#dashboardTicketsCard');
        const projectsCard = page.locator('#dashboardProjectsCard');
        const companiesCard = page.locator('#dashboardCompaniesCard');

        await expect(usersCard).toBeVisible();
        await expect(usersCard).toContainClass("card-body");

        await expect(ticketsCard).toBeVisible();
        await expect(ticketsCard).toContainClass("card-body");

        await expect(projectsCard).toBeVisible();
        await expect(projectsCard).toContainClass("card-body");

        await expect(companiesCard).toBeVisible();
        await expect(companiesCard).toContainClass("card-body");

    });

    test('should display four ChartJS charts', async ({ page }) => {
        const charts = [
            { name: "All Entities" },
            { name: "Ticket Status" },
            { name: "Ticket Priority" },
            { name: "Ticket Type" },
        ];

        for (const { name } of charts) {
            // Each chart section is exposed as a named region using its heading.
            const chart = page.getByRole("region", { name, exact: true });

            // Verify that the named chart region appears on the page.
            await expect(chart).toBeVisible();
        }
    });

    test("should position the charts below the dashboard cards", async ({ page }) => {
        const cards = [
            page.locator("#dashboardUsersCard"),
            page.locator("#dashboardTicketsCard"),
            page.locator("#dashboardProjectsCard"),
            page.locator("#dashboardCompaniesCard"),
        ];

        const charts = [
            page.getByRole("region", { name: "All Entities" }),
            page.getByRole("region", { name: "Ticket Status" }),
            page.getByRole("region", { name: "Ticket Priority" }),
            page.getByRole("region", { name: "Ticket Type" })
        ];

        // Create a helper that gets an element's position in the full page.
        const pagePosition = (locator) =>

            // Run this callback in the browser, where the element and its layout are available.
            locator.evaluate((element) => {

                // Get the element's size and position relative to the visible browser window.
                const rect = element.getBoundingClientRect();

                // Return its top and bottom coordinates relative to the whole document.
                return {

                    // Add the page's scroll distance to convert from window coordinates to page coordinates.
                    top: rect.top + window.scrollY,

                    // Do the same for the element's bottom edge.
                    bottom: rect.bottom + window.scrollY,
                };
            });

        // Measure every dashboard card's and chart's position; Promise.all waits for all measurements to finish.
        const cardPositions = await Promise.all(cards.map(pagePosition));
        const chartPositions = await Promise.all(charts.map(pagePosition));

        // Find the greatest bottom coordinate, which is the bottom of the lowest card.
        const lowestCardBottom = Math.max(...cardPositions.map(({ bottom }) => bottom));

        // Check each chart's top edge against the bottom edge of the lowest card.
        for (const chartPosition of chartPositions) {
            // The chart must start at or below that edge (a greater page coordinate means lower down).
            expect(chartPosition.top).toBeGreaterThanOrEqual(lowestCardBottom);
        }
    });

    test('should display the recent tickets table', async ({ page }) => {
        var table = page.getByRole("region", { name: "Recent Tickets" });

        await expect(table).toBeVisible();
        await expect(table).toHaveAccessibleName("Recent Tickets");

    });

    test("should position the recent tickets table below the charts", async ({ page }) => {
        const charts = [
            page.getByRole("region", { name: "All Entities", exact: true }),
            page.getByRole("region", { name: "Ticket Status", exact: true }),
            page.getByRole("region", { name: "Ticket Priority", exact: true }),
            page.getByRole("region", { name: "Ticket Type", exact: true }),
        ];
        const recentTickets = page.getByRole("region", { name: "Recent Tickets", exact: true });

        // Wait until all the regions are rendered before measuring their layout.
        for (const chart of charts) {
            await expect(chart).toBeVisible();
        }
        await expect(recentTickets).toBeVisible();

        // Measure each element's top and bottom relative to the whole page.
        const pagePosition = (locator) =>
            locator.evaluate((element) => {
                const rect = element.getBoundingClientRect();
                return {
                    top: rect.top + window.scrollY,
                    bottom: rect.bottom + window.scrollY,
                };
            });

        // Find the bottom edge of the chart region that ends lowest on the page.
        const chartPositions = await Promise.all(charts.map(pagePosition));
        const lowestChartBottom = Math.max(...chartPositions.map(({ bottom }) => bottom));

        // The Recent Tickets region must begin at or below the bottom of every chart.
        const recentTicketsPosition = await pagePosition(recentTickets);
        expect(recentTicketsPosition.top).toBeGreaterThanOrEqual(lowestChartBottom);
    });

});