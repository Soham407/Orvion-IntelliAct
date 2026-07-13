import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Go to the Employee Portal page
  console.log('Navigating to Employee Portal...');
  await page.goto('http://localhost:3001/employee-portal', { waitUntil: 'networkidle' });
  
  // Wait for the document table or the documents to load
  await page.waitForTimeout(4000); 
  
  const artifactDir = '/Users/sohambhutkar/.gemini/antigravity-cli/brain/cf8b12e1-1dec-4524-8e53-a3be494fcd3d/.user_uploaded/';
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }
  
  const screenshotPath = '/Users/sohambhutkar/.gemini/antigravity-cli/brain/cf8b12e1-1dec-4524-8e53-a3be494fcd3d/.user_uploaded/employee_portal_screenshot.png';
  
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Screenshot saved to: ' + screenshotPath);
  
  await browser.close();
})();
