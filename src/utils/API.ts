async function fetchFixedUserList(seasonId: string) {
  const userIds: string[] = await fetch(
    `./users-${seasonId}.json`
  ).then((response) => response.json());
  return userIds;
}

async function fetchUserList(seasonId: string) {
  const userIds: string[] = await fetch(
    `https://atcoder-tournament.herokuapp.com/api/users?season_id=${seasonId}`
  ).then((response) => response.json());
  return userIds;
}

let RATING_MAP_CACHE: Promise<Map<string, number>> | undefined;
export function fetchRatingMap() {
  async function loadRatingMap() {
    const allUsers: { user_id: string; rating: number }[] = await fetch(
      "./ratings.json"
    ).then((response) => response.json());
    const userMap = new Map<string, number>();
    allUsers.forEach((user) => {
      userMap.set(user.user_id, user.rating);
    });
    return userMap;
  }
  if (!RATING_MAP_CACHE) {
    RATING_MAP_CACHE = loadRatingMap();
  }
  return RATING_MAP_CACHE;
}

export async function fetchOrderedUserList(seasonId: string) {
  const [userMap, registeredUsers] = await Promise.all([
    fetchRatingMap(),
    fetchFixedUserList(seasonId),
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

const CONTEST_MAP_CACHE = new Map<string, Promise<Map<string, number>>>();
function fetchSingleContestMap(contestId: string) {
  async function loadSingleContestMap(loadingContestId: string) {
    const contestResult = await fetch(
      `./${loadingContestId}.json`
    ).then((response) => response.json());
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

  const map = CONTEST_MAP_CACHE.get(contestId);
  if (!map) {
    const promise = loadSingleContestMap(contestId);
    CONTEST_MAP_CACHE.set(contestId, promise);
    return promise;
  }

  return map;
}

export async function fetchContestResults() {
  return Promise.all([
    fetchSingleContestMap("abc177"),
    // fetchSingleContestMap("abc175"),
    // fetchSingleContestMap("abc176"),
  ]);
}
