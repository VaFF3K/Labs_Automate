const assert = require('assert');

Feature('UI Tests - Demoblaze Main Page');

Before(({ I }) => {
  I.amOnPage('https://www.demoblaze.com/');
});

Scenario('Login button should be visible', async ({ I }) => {
  I.seeElement('#login2');
});

Scenario('Categories should include Phones, Laptops, Monitors', async ({ I }) => {
  const categories = await I.grabTextFromAll('.list-group-item');
  const expected = ['Phones', 'Laptops', 'Monitors'];
  assert.deepStrictEqual(
    expected.every(c => categories.includes(c)),
    true,
    'Not all expected categories are present'
  );
});

Scenario('Each product should have title and price', async ({ I }) => {
  I.waitForElement('.hrefch', 5);
  const titles = await I.grabTextFromAll('.hrefch');
  const prices = await I.grabTextFromAll('.card-block h5');

  I.say(`Found ${titles.length} titles and ${prices.length} prices`);
  assert.strictEqual(titles.length, prices.length, 'Mismatch in number of titles and prices');
  assert(titles.every(t => t.trim() !== ''), 'All product titles should be non-empty');
  assert(prices.every(p => p.trim() !== ''), 'All product prices should be non-empty');
});


