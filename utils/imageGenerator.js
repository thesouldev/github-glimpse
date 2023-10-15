// Canvas implementation
// import { createCanvas } from 'canvas';

// export const generateImage = (contributionData) => {

//   const canvas = createCanvas(600, 400);
//   const ctx = canvas.getContext('2d');

//   ctx.font = '30px Arial';
//   ctx.fillText(
//     `Total Contributions: ${contributionData.totalContributions}`,
//     50,
//     50
//   );

//   // Add more logic to visualize contribution data as needed...

//   return canvas.toBuffer();
// };

// HTML Implementation
const puppeteer = require("puppeteer");

export const generateImage = async (contributionData) => {
  console.log(contributionData);
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  const content = `
  <!DOCTYPE html>
  <html>
    <head>
      <style> /* Your CSS here */ </style>
    </head>
    <body>
      <div>
        Total Contributions: ${contributionData.totalContributions}
      </div>
    </body>
  </html>`;

  await page.setContent(content);
  const element = await page.$("body");
  const buffer = await element.screenshot();

  await browser.close();
  return buffer;
};
