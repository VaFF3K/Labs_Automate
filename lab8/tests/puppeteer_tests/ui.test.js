import puppeteer from 'puppeteer';

describe('UI Tests - Demoblaze Main Page', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 30 });
    page = await browser.newPage();
    await page.goto('https://www.demoblaze.com/', { waitUntil: 'networkidle2' });
  });

  afterAll(async () => {
    await browser.close();
  });

  //Тест #1: Кнопка логіну повинна відображатись
  test('Login button should be visible', async () => {
    const loginVisible = await page.$eval('#login2', el => !!el);
    expect(loginVisible).toBe(true);
  });

    //Тест #2: Категорії повинні містити Телефони, Ноутбуки, Монітори
  test('Categories should include Phones, Laptops, Monitors', async () => {
    const categories = await page.$$eval('.list-group-item', els =>
      els.map(el => el.textContent.trim())
    );
    expect(categories).toEqual(expect.arrayContaining(['Phones', 'Laptops', 'Monitors']));
  });

  //Тест #3: Кожен продукт повинен мати назву та ціну
  test('Each product should have title, price', async () => {
    const products = await page.$$eval('.card', cards =>
      cards.map(card => ({
        title: card.querySelector('.card-title')?.textContent.trim(),
        price: card.querySelector('.card-text')?.textContent.trim()
      }))
    );

    for (const product of products) {
      expect(product.title).toBeTruthy();
      expect(product.price).toBeTruthy();
    }
  });
});
