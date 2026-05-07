const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test('Flujo completo de compra', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.goToCart();

  await cartPage.checkout();

  await checkoutPage.fillInfo('Rafael', 'López', '29007');
  await checkoutPage.finish();

  await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
});

test('Eliminar producto del carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.goToCart();

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(cartPage.cartItems).toHaveCount(0);
});