const parseTeamNames = (str) => {
  const decodedStr = decodeURIComponent(str.replace(/-/g, "%20"));
  const [firstTeamName, secondTeamName] = decodedStr.split(/VS|vs|Vs|vS/);
  return { firstTeamName, secondTeamName };
};
export const getMatchQuery = (paramsName) => {
  const { firstTeamName, secondTeamName } = parseTeamNames(paramsName);
  let query;
  if (secondTeamName) {
    query = {
      firstTeamName,
      secondTeamName,
    };
  } else {
    query = {
      teamsTitle: firstTeamName,
    };
  }
  return query;
};
