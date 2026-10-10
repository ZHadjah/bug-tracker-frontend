const { test, expect } = require("@playwright/test");
const {  } = require("../Helpers/ticketsEntityTestHelpers");

test.describe("Footer ", () => {
    //users need to authenticate to access the dashboard page,
    //so I will set a token in local storage before each test
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() =>
            localStorage.setItem("user_token", "playwright-test-token")
        );
        await page.goto("/");
    });

    test('should have Github link', async ({ page }) => {
        
    });


    test('should have a properly functioning Github link', async ({ page }) => {
        
    });


    test('should have a portfolio page link', async ({ page }) => {
        
    });


    test('should have a properly functioning portfolio page link', async ({ page }) => {
        
    });


    test('should have logout button', async ({ page }) => {
        
    });


    test('should have a properly functioning logout button', async ({ page }) => {
        
    });    
});