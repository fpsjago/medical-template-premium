import { test, expect } from '@playwright/test';

test('Medical Template - Quick Smoke Test', async ({ page }) => {
  // Go to homepage
  await page.goto('https://fpsjago.github.io/medical-template-premium/');

  console.log('Page title:', await page.title());
  console.log('Page URL:', page.url());

  // Take a screenshot
  await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });

  // Check if hero heading exists
  const h1 = page.locator('h1').first();
  const h1Text = await h1.textContent();
  console.log('H1 text:', h1Text);

  // Check if navigation exists
  const nav = page.locator('nav');
  const navExists = await nav.count();
  console.log('Navigation count:', navExists);

  // Check if hamburger menu exists (mobile view)
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);

  const menuToggle = page.locator('#menu-toggle');
  const menuToggleVisible = await menuToggle.isVisible();
  console.log('Menu toggle visible on mobile:', menuToggleVisible);

  // Take mobile screenshot
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });

  // Click hamburger if visible
  if (menuToggleVisible) {
    await menuToggle.click();
    await page.waitForTimeout(300);

    const navMenu = page.locator('#nav-menu');
    const hasActiveClass = await navMenu.evaluate((el) => el.classList.contains('active'));
    console.log('Menu opened (has active class):', hasActiveClass);

    await page.screenshot({ path: 'test-results/mobile-menu-open.png', fullPage: true });
  }

  // Basic assertions
  expect(await page.title()).toContain('HealthCarePlus');
  expect(h1Text).toBeTruthy();
  expect(navExists).toBeGreaterThan(0);
});
