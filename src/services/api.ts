import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const fetchPopularTSProjects = async () => {
  const response = await axios.get(`${GITHUB_API_URL}/search/repositories`, {
    params: {
      q: 'language:TypeScript',
      sort: 'stars',
      order: 'desc',
      per_page: 10,
    },
  });

  return response.data.items;
};
