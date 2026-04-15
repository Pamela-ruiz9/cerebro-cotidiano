const { chromium } = require('playwright-core');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ 
        executablePath: path.join(process.env.HOME, '.cache/ms-playwright/chromium_headless_shell-1217/chrome-linux/headless_shell')
    });
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    await page.goto('http://localhost:8765', { waitUntil: 'networkidle' });
    
    // Force all reveals visible
    await page.evaluate(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    });
    await page.waitForTimeout(500);
    
    // Full page screenshot
    await page.screenshot({ 
        path: path.join(process.env.HOME, '.openclaw/workspace/projects/cerebro-cotidiano/preview-all-visible.png'),
        fullPage: true 
    });
    
    // Scroll to cards, screenshot
    await page.evaluate(() => {
        document.querySelector('.topics-section').scrollIntoView();
    });
    await page.waitForTimeout(300);
    await page.screenshot({ 
        path: path.join(process.env.HOME, '.openclaw/workspace/projects/cerebro-cotidiano/preview-cards-section.png')
    });
    
    // Click first card to expand
    await page.click('[data-card="bostezos"] .card-collapsed');
    await page.waitForTimeout(600);
    await page.screenshot({ 
        path: path.join(process.env.HOME, '.openclaw/workspace/projects/cerebro-cotidiano/preview-card-expanded.png')
    });
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.evaluate(() => {
        document.querySelectorAll('.topic-card').forEach(c => c.classList.remove('expanded'));
        document.querySelector('.topics-section').scrollIntoView();
    });
    await page.waitForTimeout(500);
    await page.screenshot({
        path: path.join(process.env.HOME, '.openclaw/workspace/projects/cerebro-cotidiano/preview-mobile-cards.png')
    });
    
    await browser.close();
    console.log('All screenshots done!');
})();
