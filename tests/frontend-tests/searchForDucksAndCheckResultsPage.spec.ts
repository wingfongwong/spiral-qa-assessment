import { test, expect, type Page } from '@playwright/test';

//Constants
const BASE_URL: string = 'https://google.com/'
const SEARCH_LOCATOR: string = 'Search';

//Variables
var page: Page;

test.describe.configure({ mode: "serial"});

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('has title', async () => {
  await page.goto(BASE_URL);
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
});

test('search for Ducks',async () => {
  const searchBox = await page.getByTitle(SEARCH_LOCATOR);
  await searchBox.type('duck');
  await searchBox.press('Enter');
})

test('verify search results page loaded and results found',async () => {
  await page.waitForLoadState("networkidle");
  const resultStats = await page.locator('#result-stats');
  await expect(page).toHaveTitle(/duck/);
  await expect(await resultStats.textContent()).toContain('About');
})
