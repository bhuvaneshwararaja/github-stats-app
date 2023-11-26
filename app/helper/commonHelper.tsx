export const generateYear = (
  startYear: string,
  endYear: string
): Array<number> => {
  let yearList: Array<number> = [];
  let startOfYear: number = new Date(startYear).getFullYear();
  let endOfYear: number = new Date().getFullYear();
  for (let year: number = startOfYear; year <= endOfYear; year++) {
    yearList.push(year);
  }
  return yearList;
};

export const getLanguageCount = (allRepo: any[]) => {
  let languageStats: any = {};
  for (const repo of allRepo) {
    let key: string = repo.language || "others";
    if (!languageStats[key]) {
      languageStats[key] = 0;
    }
    languageStats[key] += 1;
  }
  return languageStats;
};

export const topStarredRepo = (allRepo: any[]) => {
 let starredRepo: any = allRepo.map((data: any) => {
  return { repoName: data.name, stargazers_count: data.stargazers_count };
});

const sortedArray = starredRepo.sort((a: any, b: any) => {
  return b.stargazers_count - a.stargazers_count;
});

return sortedArray.slice(0, 5);
};
