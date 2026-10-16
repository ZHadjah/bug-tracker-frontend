const { test, expect } = require("@playwright/test");

test.describe("Register Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/Companies", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    $values: [{ id: 7, name: "Example Company" }],
                }),
            })
        );
        await page.goto("/auth/Register");
    });

    test("should render registration fields with Bootstrap form styling", async ({ page }) => {
        await expect(page.getByRole("heading", { name: "Create an account" })).toBeVisible();
        await expect(page.getByLabel("First Name")).toHaveClass(/form-control/);
        await expect(page.getByLabel("Last Name")).toHaveClass(/form-control/);
        await expect(page.getByLabel("Company")).toHaveClass(/form-select/);
        await expect(page.getByLabel("Email")).toHaveClass(/form-control/);
        await expect(page.getByLabel("Password", { exact: true })).toHaveClass(/form-control/);
        await expect(page.getByLabel("Confirm Password")).toHaveClass(/form-control/);
        await expect(page.getByRole("button", { name: "Register" })).toHaveClass(/btn-primary/);
    });

    test("should allow scrolling through the registration form on shorter desktop screens", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 500 });

        const authLayout = page.locator(".auth-layout");
        await expect.poll(() =>
            authLayout.evaluate((element) => element.scrollHeight > element.clientHeight)
        ).toBe(true);
    });

    // test("should not submit when the password confirmation does not match", async ({ page }) => {
    //     let registrationRequested = false;
    //     await page.route("**/Authentication/Register", (route) => {
    //         registrationRequested = true;
    //         return route.fulfill({ status: 200, body: "{}" });
    //     });

    //     await page.getByLabel("First Name").fill("Taylor");
    //     await page.getByLabel("Last Name").fill("Example");
    //     await page.getByLabel("Company").selectOption("7");
    //     await page.getByLabel("Email").fill("taylor@example.com");
    //     await page.getByLabel("Password", { exact: true }).fill("password123");
    //     await page.getByLabel("Confirm Password").fill("different123");
    //     await page.getByRole("button", { name: "Register" }).click();

    //     await expect(page.getByText("The passwords do not match.")).toBeVisible();
    //     expect(registrationRequested).toBe(false);
    // });

    // test("should submit valid registration data and navigate to the dashboard", async ({ page }) => {
    //     let submittedUser;
    //     await page.route("**/Authentication/Register", (route) => {
    //         submittedUser = route.request().postDataJSON();
    //         return route.fulfill({
    //             status: 200,
    //             contentType: "application/json",
    //             body: JSON.stringify({
    //                 token: "playwright-registration-token",
    //                 user: { fullName: "Taylor Example" },
    //             }),
    //         });
    //     });

    //     await page.getByLabel("First Name").fill("Taylor");
    //     await page.getByLabel("Last Name").fill("Example");
    //     await page.getByLabel("Company").selectOption("7");
    //     await page.getByLabel("Email").fill("taylor@example.com");
    //     await page.getByLabel("Password", { exact: true }).fill("password123");
    //     await page.getByLabel("Confirm Password").fill("password123");
    //     await page.getByRole("button", { name: "Register" }).click();

    //     await expect(page).toHaveURL("/");
    //     expect(submittedUser).toEqual({
    //         firstName: "Taylor",
    //         lastName: "Example",
    //         companyId: 7,
    //         email: "taylor@example.com",
    //         password: "password123",
    //     });
    // });
});
