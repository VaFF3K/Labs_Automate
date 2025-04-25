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

    test('User Registration', async () => {
        await page.click('#signin2');
        await page.waitForSelector('#sign-username');
        
        await page.type('#sign-username', 'testuser123');
        await page.type('#sign-password', 'password123');
        await page.click("button[onclick='register()']");

        // Замінюємо page.waitForTimeout(2000)
        await new Promise(r => setTimeout(r, 2000));
    }, 30000);

    test('Add Product to Cart', async () => {
        await page.click('a[href="prod.html?idp_=1"]');
        await page.waitForSelector('.name');

        await page.click('.btn-success');

        // Очікуємо alert
        await new Promise(r => setTimeout(r, 2000));
    }, 30000);

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

});
