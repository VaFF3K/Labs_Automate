import puppeteer from 'puppeteer';

describe('Rozetka UI Tests - Smartphones Category', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 }); // Уникаємо мобільної версії
    await page.goto('https://rozetka.com.ua/mobile-phones/c80003/', { waitUntil: 'networkidle2', timeout: 60000 });
}, 70000); // ⏳ Таймаут 70 сек

afterEach(async () => {
    await browser.close();
});

  // Тест-кейс 1: Перевірка заголовка сторінки
  test('should have the correct page title', async () => {
    const title = await page.title();
    expect(title).toContain('Мобільні телефони', { timeout: 50000 });
  });

  // Тест-кейс 2: Перевірка кількості товарів на сторінці
  test('should display at least 20 products per page', async () => {
    await page.waitForSelector('section.flex-grow-1', { timeout: 60000 });

    const productList = await page.$$('section.flex-grow-1 div.goods-tile');
    expect(productList.length).toBeGreaterThanOrEqual(20);
});

// Тест-кейс 3: Перевірка роботи фільтра 
test('should filter products by brand Apple', async () => {
  const filterExists = await page.evaluate(() => {
    const filter = document.querySelector('a[href*="producer=apple"]');
    if (!filter) return false;

    // console.log("Фільтр знайдено:", filter.textContent.trim(), getComputedStyle(filter).display);

    if (getComputedStyle(filter).display !== "none") {
      filter.scrollIntoView({ behavior: "smooth", block: "center" });
      filter.click();
      return true;
    } else {
      console.warn("Фільтр знайдено, але він прихований.");
      return false;
    }
  });

  expect(filterExists).toBe(true); // Перевіряємо, чи спрацював фільтр
}, 150000); 

  // Тест-кейс 4: Перевірка роботи сортування "Від дешевих до дорогих"
  test('should sort products from cheap to expensive', async () => {
    await page.click('select.select-css'); // Відкриваємо меню сортування
    await page.select('select.select-css', '1: cheap'); // Обираємо сортування "Від дешевих до дорогих"
    await page.waitForNavigation(); // Чекаємо оновлення сторінки

    const prices = await page.$$eval('.goods-tile__price-value', nodes =>
      nodes.map(n => parseInt(n.textContent.replace(/\D/g, ''), 10))
    );

    expect(prices[0]).toBeLessThanOrEqual(prices[1]); // Перевіряємо, чи перший товар дешевший за другий
  });

// Тест-кейс 5: Перевірка роботи кнопки "Купити"
test('should add product to cart and verify cart update', async () => {
  // Чекаємо, поки кнопка стане видимою
  await page.waitForSelector('.goods-tile__buy-button', { visible: true });

  // console.log('Clicking buy button...');
  await page.click('.goods-tile__buy-button');
  // console.log('Button clicked. Waiting for cart update...');

  // Чекаємо, поки лічильник товарів у кошику з'явиться та оновиться
  await page.waitForSelector('.header-cart__button .badge', { visible: true, timeout: 30000 });

  // Перевіряємо, чи лічильник товарів у кошику >0
  const cartItemCount = await page.$eval('.header-cart__button .badge', el => el.textContent.trim());
  // console.log('Cart item count:', cartItemCount);
  expect(parseInt(cartItemCount)).toBeGreaterThan(0); // Перевіряємо, чи в кошику є хоча б один товар
}, 60000);

});
