async function fetchUserList(seasonId: string) {
  const userIds: string[] = await fetch(
    `https://atcoder-tournament.herokuapp.com/api/users?season_id=${seasonId}`
  ).then((response) => response.json());
  return userIds;
}

export async function fetchRatingMap() {
  const allUsers: { user_id: string; rating: number }[] = await fetch(
    "./ratings.json"
  ).then((response) => response.json());
  const userMap = new Map<string, number>();
  allUsers.forEach((user) => {
    userMap.set(user.user_id, user.rating);
  });
  return userMap;
}

export async function fetchOrderedUserList(seasonId: string) {
  const [userMap, registeredUsers] = await Promise.all([
    fetchRatingMap(),
    fetchUserList(seasonId),
  ]);

  const validUsers = [] as { rating: number; userId: string }[];
  registeredUsers.forEach((userId) => {
    const rating = userMap.get(userId);
    if (rating) {
      validUsers.push({ rating, userId });
    }
  });
  validUsers.sort((a, b) => {
    if (a.rating === b.rating) {
      return a.userId.localeCompare(b.userId);
    } else {
      return b.rating - a.rating;
    }
  });
  return validUsers.map((user) => user.userId);
}

async function fetchSingleContestMap(contestId: string) {
  const contestResult = await fetch(`./${contestId}.json`).then((response) =>
    response.json()
  );
  const results: {
    Rank: number;
    UserScreenName: string;
    TotalResult: { Score: number };
  }[] = contestResult.StandingsData;
  const map = new Map<string, number>();
  results.forEach((result) => {
    if (result.TotalResult.Score > 0) {
      map.set(result.UserScreenName, result.Rank);
    }
  });
  return map;
}

export async function fetchContestResults() {
  return Promise.all([
    // fetchSingleContestMap("abc174"),
    // fetchSingleContestMap("abc175"),
    // fetchSingleContestMap("abc176"),
  ]);
}
