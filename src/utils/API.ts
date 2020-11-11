import {
  TournamentNode,
  TournamentResponse,
  User,
} from "../models/TournamentNode";

export const fetchTournament = (seasonId: string) => {
  if (seasonId === "2") {
    return fetchTournament2nd();
  } else {
    return fetch(`./bracket-${seasonId}.json`)
      .then((response) => response.json())
      .then((response) => response as TournamentResponse);
  }
};

async function fetchTournament2nd(): Promise<TournamentResponse> {
  const usersPromise = fetch(
    "https://atcoder-tournament.herokuapp.com/api/users"
  )
    .then((response) => response.json())
    .then((response) => response as string[]);

  const ratingsPromise = fetch("./ratings.json")
    .then((response) => response.json())
    .then(
      (response) =>
        response as {
          user_id: string;
          rating: number;
        }[]
    )
    .then((ratings) => {
      const map = new Map<string, number>();
      ratings.forEach((rating) => {
        map.set(rating.user_id, rating.rating);
      });
      return map;
    });

  const ratings = await ratingsPromise;
  const users = (await usersPromise).map((userId) => {
    const rating = ratings.get(userId) ?? 0;
    return { user_id: userId, rating };
  });
  return constructAll2ndTournament(users);
}

const constructAll2ndTournament = (users: User[]): TournamentResponse => {
  const classes: { [key: string]: User[] } = {
    A: [],
    B1: [],
    B2: [],
    C1: [],
    C2: [],
    C3: [],
  };
  const seedA = [] as { firstRank: number; user: User }[];
  users.forEach((user) => {
    const firstRank = ["kort0n", "heno239", "LayCurse", "snuke"].indexOf(
      user.user_id
    );
    if (firstRank !== -1) {
      seedA.push({ firstRank, user });
    } else if (user.rating >= 2000) {
      classes.A.push(user);
    } else if (user.rating >= 1600) {
      classes.B1.push(user);
    } else if (user.rating >= 1200) {
      classes.B2.push(user);
    } else if (user.rating >= 800) {
      classes.C1.push(user);
    } else if (user.rating >= 400) {
      classes.C2.push(user);
    } else {
      classes.C3.push(user);
    }
  });

  seedA.sort((a, b) => a.firstRank - b.firstRank);

  const response: TournamentResponse = {};
  Object.entries(classes).forEach(([key, bracketUsers]) => {
    if (key === "A") {
      const seed = seedA.map(({ user }) => user);
      response[key] = construct2ndTournament(bracketUsers, seed, 0);
    } else {
      response[key] = construct2ndTournament(bracketUsers, [], 0);
    }
  });
  return response;
};

const construct2ndTournament = (
  users: User[],
  seed: User[],
  depth: number
): TournamentNode => {
  users.sort((a, b) => {
    if (a.rating !== b.rating) {
      return b.rating - a.rating;
    } else {
      return a.user_id.localeCompare(b.user_id);
    }
  });
  if (users.length === 1) {
    return {
      user: users[0],
      rank: null,
      children: [],
    };
  } else if (depth === 4) {
    const children = users.map((user) => ({
      user,
      rank: null,
      children: [],
    }));
    return {
      user: null,
      rank: null,
      children,
    };
  } else if (depth === 2 && seed.length > 0) {
    return {
      user: null,
      rank: null,
      children: [
        { user: seed[0], rank: null, children: [] },
        construct2ndTournament(users, [], depth + 1),
      ],
    };
  } else {
    const right = [] as User[];
    const left = [] as User[];
    if (depth === 1 && seed.length > 0) {
      users.forEach((user, i) => {
        if (i % 6 === 0 || i % 6 === 5) {
          left.push(user);
        } else {
          right.push(user);
        }
      });
    } else {
      users.forEach((user, i) => {
        if (i % 4 === 0 || i % 4 === 3) {
          left.push(user);
        } else {
          right.push(user);
        }
      });
    }

    const rightSeed = [] as User[];
    const leftSeed = [] as User[];
    seed.forEach((user, i) => {
      if (i % 4 === 0 || i % 4 === 3) {
        leftSeed.push(user);
      } else {
        rightSeed.push(user);
      }
    });

    return {
      user: null,
      rank: null,
      children: [
        construct2ndTournament(left, leftSeed, depth + 1),
        construct2ndTournament(right, rightSeed, depth + 1),
      ],
    };
  }
};
