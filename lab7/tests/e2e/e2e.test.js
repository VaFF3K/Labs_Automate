import puppeteer from 'puppeteer';

// Перехоплення alert перед запуском тестів
let browser, page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
    page.on('dialog', async dialog => {
        console.log('Alert detected:', dialog.message());
        await dialog.accept(); // Натискаємо "OK"
    });
}, 30000);

afterAll(async () => {
    await browser.close();
});

describe('Demoblaze UI Tests', () => {
    beforeEach(async () => {
        await page.goto('https://www.demoblaze.com/', { waitUntil: 'networkidle2' });
    });

    // #1 Кошик є пустим при першому запуску
    test('Cart is empty on first visit', async () => {
        await page.click('#cartur');
        await page.waitForSelector('.table-responsive');
    
        const items = await page.$$eval('.success', rows => rows.length);
        expect(items).toBe(0); // перевіряємо, чи немає товарів у кошику
    }, 20000);
    
// 2. Додавання товару до кошика
    test('Add Product to Cart', async () => {
        await page.click('a[href="prod.html?idp_=1"]');
        await page.waitForSelector('.name');

        await page.click('.btn-success');

        // Очікуємо alert
        await new Promise(r => setTimeout(r, 2000));
    }, 30000);

// 3. Створення замовлення
    test('Place an Order', async () => {
        await page.click('#cartur'); // Відкрити кошик
        await page.waitForSelector('.btn-success', { visible: true });
    
        await page.click('.btn-success'); // Натиснути "Place Order"
        
        // Дочекатися появи модального вікна
        await page.waitForSelector('#orderModal', { visible: true, timeout: 10000 });
    
        await page.type('#name', 'Test User');
        await page.type('#country', 'USA');
        await page.type('#city', 'New York');
        await page.type('#card', '1234567890123456');
        await page.type('#month', '12');
        await page.type('#year', '2026');
    
        // **Тепер натискаємо кнопку "Purchase" всередині модального вікна**
        await page.waitForSelector('#orderModal .btn-primary', { visible: true, timeout: 10000 });
        await page.click('#orderModal .btn-primary');
    
        // Дочекатися повідомлення про успішне замовлення
        await page.waitForSelector('.sweet-alert', { visible: true, timeout: 10000 });
    
        const confirmationText = await page.$eval('.sweet-alert h2', el => el.textContent.trim());
        expect(confirmationText).toBe("Thank you for your purchase!");
    }, 60000);

// 4. Реєстрація, вхід та перевірка
test('User Login and Logout visibility', async () => {
    // Генеруємо унікальне ім'я користувача
    const username = 'user' + Date.now();
    const password = 'password123';

    // Реєстрація користувача
    await page.click('#signin2');
    await page.waitForSelector('#sign-username');
    await page.type('#sign-username', username);
    await page.type('#sign-password', password);
    await page.click("button[onclick='register()']");
    await new Promise(r => setTimeout(r, 2000)); // чек на alert

    // Вхід у акаунт
    await page.click('#login2');
    await page.waitForSelector('#loginusername');
    await page.type('#loginusername', username);
    await page.type('#loginpassword', password);
    await page.click("button[onclick='logIn()']");
    await new Promise(r => setTimeout(r, 2000)); // чек на alert

    // Перевірка видимості кнопки logout
    await page.waitForSelector('#logout2', { visible: true, timeout: 10000 });
    const logoutVisible = await page.$eval('#logout2', el => !!el);
    expect(logoutVisible).toBe(true);
}, 30000);


// 5. Перехід у категорію "Laptops"
test('Navigate to Laptops category and check products', async () => {
    await page.click('a[onclick="byCat(\'notebook\')"]');
    await new Promise(r => setTimeout(r, 2000)); // даємо сайту трохи часу на завантаження

    const laptopTitles = await page.$$eval('.card-title', titles =>
        titles.map(el => el.textContent.trim())
    );

    expect(laptopTitles.length).toBeGreaterThan(0);
}, 30000);
});
