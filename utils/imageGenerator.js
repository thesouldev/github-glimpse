import { createCanvas } from 'canvas';

export const generateImage = (contributionData) => {
  const canvas = createCanvas(600, 400);
  const ctx = canvas.getContext('2d');

  ctx.font = '30px Arial';
  ctx.fillText(
    `Total Contributions: ${contributionData.user.contributionsCollection.contributionCalendar.totalContributions}`,
    50,
    50
  );

  // Add more logic to visualize contribution data as needed...

  return canvas.toBuffer();
};
