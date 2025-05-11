describe('Demoblaze UI Tests', () => {
  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    browser.get('https://www.demoblaze.com/');
  });

  it('Login button should be visible', () => {
    const loginBtn = element(by.id('login2'));
    expect(loginBtn.isDisplayed()).toBe(true);
  });

  it('Categories should include Phones, Laptops, Monitors', () => {
    const categories = element.all(by.css('.list-group-item'));
    const expected = ['Phones', 'Laptops', 'Monitors'];

    categories.getText().then(texts => {
      expected.forEach(category => {
        expect(texts).toContain(category);
      });
    });
  });

  it('Each product should have title and price', () => {
    const products = element.all(by.css('.card'));
    products.each(product => {
      const title = product.element(by.css('.card-title'));
      const price = product.element(by.css('.card-text'));
      expect(title.isPresent()).toBe(true);
      expect(price.isPresent()).toBe(true);
    });
  });
});
