class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addFirstItemToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}

module.exports = { InventoryPage };