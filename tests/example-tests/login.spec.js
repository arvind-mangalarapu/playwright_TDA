const { test, expect } = require("@playwright/test");

test.describe("Sauce Demo End-to-End Tests", () => {
  test("Login with valid credentials", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
  });

  test("Login with invalid credentials", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "invalid_user");
    await page.fill("#password", "invalid_password");
    await page.click("#login-button");
    const errorMessage = await page.innerText('h3[data-test="error"]');
    expect(errorMessage).toContain(
      "Username and password do not match any user in this service"
    );
  });

  test("Login with empty fields", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.click("#login-button");
    let errorMessage = await page.innerText('h3[data-test="error"]');
    expect(errorMessage).toContain("Username is required");

    await page.fill("#user-name", "standard_user");
    await page.click("#login-button");
    errorMessage = await page.innerText('h3[data-test="error"]');
    expect(errorMessage).toContain("Password is required");

    await page.fill("#user-name", "");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    errorMessage = await page.innerText('h3[data-test="error"]');
    expect(errorMessage).toContain("Username is required");
  });

  test("Product page displays products after login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    expect(await page.isVisible(".inventory_item")).toBeTruthy();
  });

  test("Add product to cart", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    expect(await page.isVisible(".cart_item")).toBeTruthy();
  });

  test("Checkout process", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await page.click("#checkout");

    // Verify error message for empty fields
    await page.click("#continue");
    let errorMessage = await page.innerText('h3[data-test="error"]');
    expect(errorMessage).toContain("First Name is required");

    // Fill in checkout information
    await page.fill("#first-name", "John");
    await page.fill("#last-name", "Doe");
    await page.fill("#postal-code", "12345");
    await page.click("#continue");

    // Verify successful checkout
    await page.click("#finish");
    expect(await page.isVisible(".complete-header")).toBeTruthy();
    const confirmationMessage = await page.innerText(".complete-header");
    expect(confirmationMessage).toContain("Thank you for your order!");
  });
});
