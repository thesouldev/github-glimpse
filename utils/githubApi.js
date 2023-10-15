import axios from 'axios';

export const fetchGithubData = async (username) => {
  const url = 'https://api.github.com/graphql';

  // Fetch the account creation year with a separate GraphQL query.
  const creationQuery = `
    query($username: String!) {
      user(login: $username) {
        createdAt
      }
    }
  `;

  let creationYear;
  try {
    const creationResponse = await axios.post(
      url,
      {
        query: creationQuery,
        variables: { username }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    );
    creationYear = new Date(creationResponse.data.data.user.createdAt).getFullYear();
  } catch (error) {
    console.error('Error fetching GitHub user creation date:', error.response ? error.response.data : error.message);
    return null;
  }

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  let totalContributions = 0;
  
  // Loop through the years from the account creation year to the current year.
  for (let year = creationYear; year <= new Date().getFullYear(); year++) {
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year + 1}-01-01T00:00:00Z`;

    try {
      const response = await axios.post(
        url,
        {
          query,
          variables: { username, from, to }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
          }
        }
      );

      totalContributions += response.data.data.user?.contributionsCollection?.contributionCalendar?.totalContributions;

    } catch (error) {
      console.error('Error fetching GitHub data for year', year, ':', error.response ? error.response.data : error.message);
    }
  }
  return { totalContributions };
};
