const { test, expect } = require("@playwright/test");

test.describe("Side Menu ", () => {
    //users need to authenticate to access the dashboard page,
    //so I will set a token in local storage before each test
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() =>
            localStorage.setItem("user_token", "playwright-test-token")
        );
        await page.goto("/");
    });

    async function openMobileNavigation(page) {
        const openButton = page.getByRole("button", { name: "Open navigation menu" });
        if (await openButton.isVisible()) {
            await openButton.click();
        }
    }

    // test('should have 5 options to choose from, Dashboard, View all companies, and the 2 dropdowns, and Manage Users', async ({ page }) => {
        
    // });


    test('should have Tickets and Projects dropdown Menus', async ({ page }) => {
        await openMobileNavigation(page);
        const ticketsMenu = page.getByRole("button", {
            name: "Tickets sidebar dropdown menu",
        });
        const projectsMenu = page.getByRole("button", {
            name: "Projects sidebar dropdown menu",
        });

        await expect(ticketsMenu).toBeVisible();
        await expect(projectsMenu).toBeVisible();

        await ticketsMenu.click();
        await expect(ticketsMenu).toHaveAttribute("aria-expanded", "true");

        await projectsMenu.click();
        await expect(projectsMenu).toHaveAttribute("aria-expanded", "true");
    });

    test("should expand the Tickets menu with keyboard activation", async ({ page }) => {
        await openMobileNavigation(page);
        const ticketsMenu = page.getByRole("button", {
            name: "Tickets sidebar dropdown menu",
        });
        const createTicket = page.getByRole("link", { name: "Create A Ticket" });

        await ticketsMenu.focus();
        await expect(ticketsMenu).toBeFocused();
        await expect(ticketsMenu).toHaveAttribute("aria-expanded", "false");

        await page.keyboard.press("Enter");

        await expect(ticketsMenu).toHaveAttribute("aria-expanded", "true");
        await expect(createTicket).toBeVisible();
    });

    test("should generate submenu classes from each submenu label", async ({ page }) => {
        await openMobileNavigation(page);
        await page.locator("button.tickets-link").click();
        await expect(page.getByRole("link", { name: "Create A Ticket" }))
            .toHaveClass(/create-ticket-sub-menu/);
        await expect(page.getByRole("link", { name: "View All Tickets" }))
            .toHaveClass(/view-all-tickets-sub-menu/);

        await page.locator("button.projects-link").click();
        await expect(page.getByRole("link", { name: "Create A Project" }))
            .toHaveClass(/create-project-sub-menu/);
        await expect(page.getByRole("link", { name: "View All Projects" }))
            .toHaveClass(/view-all-projects-sub-menu/);
    });

    test("should open the sidebar from the hamburger menu on mobile", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });

        const toggle = page.getByRole("button", { name: "Open navigation menu" });
        const sidebar = page.getByRole("dialog", { name: "Main navigation" });

        await expect(toggle).toBeVisible();
        await expect(sidebar).toBeHidden();

        await toggle.click();
        await expect(sidebar).toBeVisible();
        await expect(page.getByRole("button", { name: "Close navigation menu" }).first()).toBeVisible();

        await page.keyboard.press("Escape");
        await expect(sidebar).toBeHidden();
    });

    test("should keep the sidebar fixed while the main content scrolls on desktop", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });

        const sidebar = page.locator("#main-sidebar");
        const mainContent = page.locator("#main-content");

        const initialSidebarTop = await sidebar.evaluate((element) =>
            element.getBoundingClientRect().top
        );
        await mainContent.evaluate((element) => {
            element.scrollTop = element.scrollHeight;
        });

        await expect.poll(() =>
            mainContent.evaluate((element) => element.scrollTop)
        ).toBeGreaterThan(0);

        const finalSidebarTop = await sidebar.evaluate((element) =>
            element.getBoundingClientRect().top
        );
        const documentScrollTop = await page.evaluate(() => document.documentElement.scrollTop);

        expect(finalSidebarTop).toBe(initialSidebarTop);
        expect(documentScrollTop).toBe(0);
    });

    // test('should have Tickets dropdown menu options populated', async ({ page }) => {
        
    // });


    // test('should have a properly functioning Create a Ticket link', async ({ page }) => {
        
    // });


    // test('should have a properly functioning View all Tickets', async ({ page }) => {
        
    // });


    // test('should have Projects dropdown menu options populated', async ({ page }) => {
        
    // });

    // test('should have a properly functioning Create a Project link', async ({ page }) => {
        
    // });


    // test('should have a properly functioning View all Projects', async ({ page }) => {
        
    // });


    // test('should have a properly functioning Manage Users link', async ({ page }) => {
        
    // });


    


    
});