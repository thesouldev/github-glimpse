import axios from 'axios';

export const fetchGithubData = async (username) => {
  const url = 'https://api.github.com/graphql';
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                weekday
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      url,
      {
        query,
        variables: { username }
      },
      {
        headers: {
          Authorization: 'Bearer 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'
        }
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching GitHub data');
  }
};
