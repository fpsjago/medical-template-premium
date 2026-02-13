import { test, expect } from '@playwright/test';

test.describe('Medical Template - Desktop', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/HealthCarePlus/);

    // Check hero heading is visible
    await expect(page.locator('h1')).toContainText('Expert Medical Care');
  });

  test('navigation menu works', async ({ page }) => {
    await page.goto('/');

    // Click About link
    await page.click('nav a[href*="about"]');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toContainText('Dedicated to Your Well-Being');

    // Click Services link
    await page.click('nav a[href*="services"]');
    await expect(page).toHaveURL(/.*services/);

    // Click Contact link
    await page.click('nav a[href*="contact"]');
    await expect(page).toHaveURL(/.*contact/);
  });

  test('WebP images are loaded', async ({ page }) => {
    await page.goto('/');

    // Wait for hero image to load
    const heroImage = page.locator('.heroImageWrapper img');
    await heroImage.waitFor({ state: 'visible' });

    // Check if image src contains webp
    const imageSrc = await heroImage.getAttribute('src');
    expect(imageSrc).toContain('.webp');
  });

  test('scroll animations work', async ({ page }) => {
    await page.goto('/');

    // Scroll down to trigger animations
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);

    // Check if elements with data-reveal are visible
    const revealElements = page.locator('[data-reveal]');
    await expect(revealElements.first()).toBeVisible();
  });

  test('CTA buttons are clickable', async ({ page }) => {
    await page.goto('/');

    // Check primary CTA
    const primaryCTA = page.locator('.actionCard.primary');
    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toHaveAttribute('href', /.*contact/);
  });
});

test.describe('Medical Template - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('mobile homepage loads without cut-off', async ({ page }) => {
    await page.goto('/');

    // Check hero section is visible and not cut off
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    // Check heading is visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toBeInViewport();
  });

  test('hamburger menu works on mobile', async ({ page }) => {
    await page.goto('/');

    // Check hamburger button is visible
    const menuToggle = page.locator('#menu-toggle');
    await expect(menuToggle).toBeVisible();

    // Click hamburger to open menu
    await menuToggle.click();

    // Check menu is open (has active class)
    const navMenu = page.locator('#nav-menu');
    await expect(navMenu).toHaveClass(/active/);

    // Check menu links are visible
    await expect(navMenu.locator('a[href*="about"]')).toBeVisible();

    // Click a menu link
    await navMenu.locator('a[href*="about"]').click();

    // Check navigation happened
    await expect(page).toHaveURL(/.*about/);

    // Check menu closed after navigation
    await expect(navMenu).not.toHaveClass(/active/);
  });

  test('mobile hero text is readable', async ({ page }) => {
    await page.goto('/');

    // Check heading size is appropriate for mobile
    const heading = page.locator('h1');
    const fontSize = await heading.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    // Font size should be at least 36px as per our fix
    const fontSizeNum = parseInt(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(36);
  });

  test('mobile quick actions are visible', async ({ page }) => {
    await page.goto('/');

    // Check action cards are visible on mobile
    const actionCards = page.locator('.actionCard');
    await expect(actionCards.first()).toBeVisible();

    // Cards should stack vertically on mobile
    const firstCard = actionCards.first();
    const secondCard = actionCards.nth(1);

    const firstBox = await firstCard.boundingBox();
    const secondBox = await secondCard.boundingBox();

    // Second card should be below first card (not side by side)
    if (firstBox && secondBox) {
      expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height / 2);
    }
  });

  test('mobile navigation stays fixed on scroll', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('#main-nav');

    // Check initial position
    await expect(nav).toHaveCSS('position', 'fixed');

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(300);

    // Nav should still be fixed and have scrolled class
    await expect(nav).toHaveCSS('position', 'fixed');
    await expect(nav).toHaveClass(/scrolled/);
  });
});

test.describe('Medical Template - Performance', () => {
  test('images have width and height attributes', async ({ page }) => {
    await page.goto('/');

    // Check hero image has dimensions
    const heroImage = page.locator('.heroImageWrapper img');
    await expect(heroImage).toHaveAttribute('width');
    await expect(heroImage).toHaveAttribute('height');
  });

  test('critical resources load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000);

    // Should have no console errors
    expect(consoleErrors).toHaveLength(0);
  });
});
