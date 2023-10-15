import { fetchGithubData } from '../../utils/githubApi';
import { generateImage } from '../../utils/imageGenerator';

export default async (req, res) => {
  const { username } = req.query;

  try {
    const contributionData = await fetchGithubData(username);
    console.log(JSON.stringify(contributionData))
    const imageBuffer = generateImage(contributionData);

    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
