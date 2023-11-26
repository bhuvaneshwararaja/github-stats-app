import { getLanguageCount, topStarredRepo } from "./commonHelper";

const accessToken: string = process.env.PERSONAL_ACCESS_TOKEN as string;

export const getGitHubStatsData = async (name: string) => {
  const allRepos = await fetchGitRepositories(name);
  return {
    topLanguages: getLanguageCount(allRepos),
    topStarredRepo: topStarredRepo(allRepos),
  };
};

export const fetchGitRepositories = async (name: string) => {
  try {
    let pageNumber = 1;
    let allRepos = [];
    while (true) {
      const getRepository = await getPageWiseRepository(pageNumber,name)
      if (getRepository.length) {
        allRepos.push(getRepository);
      } else {
        break;
      }
      pageNumber += 1;
    }
    return allRepos.flat();
  } catch (error) {
    return [];
  }
};

export const getPageWiseRepository = async (pageNumber: number, name: string) => {
  const getRepository = await fetch(
    `https://api.github.com/users/${name}/repos?per_page=50&page=${pageNumber}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const getRepoData = await getRepository.json();
  return getRepoData;
};
