const { test } = require('@applitools/eyes-playwright/fixture');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test('Visual - Login page', async ({ page, eyes }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await eyes.check('Login Page');
});

test('Visual - Inventory page', async ({ page, eyes }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await eyes.check('Inventory Page');

  await inventoryPage.addFirstItemToCart();
  await eyes.check('Inventory Page - Item added to cart');
});

test('Visual - Checkout flow', async ({ page, eyes }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addFirstItemToCart();
  await inventoryPage.goToCart();
  await eyes.check('Cart Page');

  await cartPage.checkout();
  await eyes.check('Checkout - Step One');

  await checkoutPage.fillInfo('Rafael', 'López', '29007');
  await eyes.check('Checkout - Step Two');

  await checkoutPage.finish();
  await eyes.check('Checkout - Confirmation');
});
