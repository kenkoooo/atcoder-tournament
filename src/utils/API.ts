async function fetchUserList(seasonId: string) {
  const userIds: string[] = await fetch(
    `https://atcoder-tournament.herokuapp.com/api/users?season_id=${seasonId}`
  ).then((response) => response.json());
  return userIds;
}

async function fetchAllUserList() {
  const ac: { user_id: string; problem_count: number }[] = await fetch(
    "./ac.json"
  ).then((response) => response.json());
  return ac;
}

export async function fetchOrderedUserList(seasonId: string) {
  const [allUsers, registeredUsers] = await Promise.all([
    fetchAllUserList(),
    fetchUserList(seasonId),
  ]);

  const userMap = new Map<string, number>();
  allUsers.forEach((user) => {
    userMap.set(user.user_id, user.problem_count);
  });

  const validUsers = [] as { count: number; userId: string }[];
  registeredUsers.forEach((userId) => {
    const count = userMap.get(userId);
    if (count) {
      validUsers.push({ count, userId });
    }
  });
  validUsers.sort((a, b) => a.count - b.count);
  return validUsers.map((user) => user.userId);
}
