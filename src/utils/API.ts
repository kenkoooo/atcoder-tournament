export async function fetchUserList(seasonId: string) {
  const userIds: string[] = await fetch(
    `https://atcoder-tournament.herokuapp.com/api/users?season_id=${seasonId}`
  ).then((response) => response.json());
  return userIds;
}

export async function fetchAllUserList() {
  const ac: { user_id: string }[] = await fetch("./ac.json").then((response) =>
    response.json()
  );
  return ac.map((e) => e.user_id);
}
