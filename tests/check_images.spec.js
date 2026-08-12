import { test, expect } from '@playwright/test';

test('check all images in company projects page are vertical', async ({ page }) => {
  await page.goto('http://localhost:3000/company/projects');
  
  // Wait for network to be idle
  await page.waitForLoadState('networkidle');
  // Wait a bit more for next/image to render
  await page.waitForTimeout(2000);

  // Select all image elements inside the main content sections
  const images = await page.locator('.company-sticky-side img').all();
  
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const src = await img.getAttribute('src');
    
    // Skip if it's the logo or not a content image
    if (!src || src.includes('logo')) continue;
    
    const isVertical = await img.evaluate((el) => el.naturalHeight > el.naturalWidth);
    
    console.log(`Image ${i + 1}: ${src}`);
    console.log(`Is Vertical: ${isVertical}`);
    
    // Check width and height
    const dimensions = await img.evaluate((el) => ({ w: el.naturalWidth, h: el.naturalHeight }));
    console.log(`Dimensions: ${dimensions.w}x${dimensions.h}`);
    
    expect(isVertical).toBe(true);
  }
});
