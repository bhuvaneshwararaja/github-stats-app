import { getLanguageCount, topRepoSize, topStarredRepo } from "./commonHelper";

const accessToken: string = process.env.PERSONAL_ACCESS_TOKEN as string;

export const getGitHubStatsData = async (name: string) => {
  const allRepos = await fetchGitRepositories(name);

  return {
    topLanguages: getLanguageCount(allRepos),
    topStarredRepo: topStarredRepo(allRepos),
    topRepoSize: topRepoSize(allRepos),
  };
};

export const fetchGitRepositories = async (name: string) => {
  try {
    let pageNumber = 1;
    let allRepos = [];
    while (true) {
      const getRepository = await getPageWiseRepository(pageNumber, name);
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

export const getPageWiseRepository = async (
  pageNumber: number,
  name: string
) => {
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

const makeGraphQLRequest = async (query: string, variables: any) => {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData.data;
    } else {
      console.error("GraphQL Request Failed:", responseData.errors);
      throw new Error("GraphQL Request Failed");
    }
  } catch (error) {
    console.error("Error:");
    throw error;
  }
};

export const fetchRepositoriesWithPullRequests: any = async (
  username: String,
  first = 100
) => {
  let hasNextPage = true;
  let endCursor = null;
  let result: any = [];

  while (hasNextPage) {
    const query = `
      query ($username: String!, $first: Int!, $after: String) {
        user(login: $username) {
          repositories(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              name
              openPullRequests: pullRequests(states: [OPEN], first: 1) {
                totalCount
              }
              mergedPullRequests: pullRequests(states: [MERGED], first: 1) {
                totalCount
              }
              closedPullRequests: pullRequests(states: [CLOSED], first: 1) {
                totalCount
              }
            }
          }
        }
      }
    `;
    const variables = { username, first, after: endCursor };

    const responseData = await makeGraphQLRequest(query, variables);

    result.push(processPRData(responseData.user.repositories.nodes));

    hasNextPage = responseData.user.repositories.pageInfo.hasNextPage;
    endCursor = responseData.user.repositories.pageInfo.endCursor;
  }
  result = result.flat();
  const repositoryNames = result.map((repo: any) => repo.name);
  const openPullRequests = result.map(
    (repo: any) => repo.openPullRequests.totalCount
  );
  const closedPullRequests = result.map(
    (repo: any) => repo.closedPullRequests.totalCount
  );
  const mergedPullRequests = result.map(
    (repo: any) => repo.mergedPullRequests.totalCount
  );
  return {
    repoName: repositoryNames,
    openPRs: openPullRequests,
    closedPRs: closedPullRequests,
    mergedPRs: mergedPullRequests,
  };
};

const processPRData = (repoPRData: Array<any>) => {
  return repoPRData.filter((data: any) => {
    return (
      data.openPullRequests.totalCount ||
      data.mergedPullRequests.totalCount ||
      data.closedPullRequests.totalCount
    );
  });
};
