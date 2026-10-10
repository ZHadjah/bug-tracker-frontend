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

    test('should have 5 options to choose from, Dashboard, View all companies, and the 2 dropdowns, and Manage Users', async ({ page }) => {
        
    });


    test('should have Tickets and Projects dropdown Menus', async ({ page }) => {
        const ticketsMenu = page.getByRole("menuitem", {
            name: "Tickets sidebar dropdown menu",
            exact: true,
        });
        const projectsMenu = page.getByRole("menuitem", {
            name: "Projects sidebar dropdown menu",
            exact: true,
        });

        await expect(ticketsMenu).toBeVisible();
        await expect(ticketsMenu).toHaveAccessibleName("Tickets sidebar dropdown menu");
        await expect(projectsMenu).toBeVisible();

        await ticketsMenu.click();
        await expect(ticketsMenu).toHaveAttribute("aria-expanded", "true");

        await projectsMenu.click();
        await expect(projectsMenu).toHaveAttribute("aria-expanded", "true");
    });

    test('should have Tickets dropdown menu options populated', async ({ page }) => {
        
    });


    test('should have a properly functioning Create a Ticket link', async ({ page }) => {
        
    });


    test('should have a properly functioning View all Tickets', async ({ page }) => {
        
    });


    test('should have Projects dropdown menu options populated', async ({ page }) => {
        
    });

    test('should have a properly functioning Create a Project link', async ({ page }) => {
        
    });


    test('should have a properly functioning View all Projects', async ({ page }) => {
        
    });


    test('should have a properly functioning Manage Users link', async ({ page }) => {
        
    });


    


    
});