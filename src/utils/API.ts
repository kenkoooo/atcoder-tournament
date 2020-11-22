import {
  TournamentNode,
  TournamentResponse,
  User,
} from "../models/TournamentNode";

export const fetchTournament = (seasonId: string) => {
  return fetch(`./bracket-${seasonId}.json`)
    .then((response) => response.json())
    .then((response) => response as TournamentResponse);
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
        map.set(rating.user_id.toLowerCase(), rating.rating);
      });
      return map;
    });

  const ratings = await ratingsPromise;
  const users = (await usersPromise).map((userId) => {
    const rating = ratings.get(userId.toLowerCase()) ?? 0;
    return { user_id: userId, rating };
  });
  return constructAll2ndTournament(users);
}

const NEXT_A1 = [
  // 1st A top 16
  "kort0n",
  "leaf1415",
  "fuppy0716",
  "snuke",
  "Rubikun",
  "dreamoon",
  "mikit",
  "uwi",
  "Kiri8128",
  "heno239",
  "cuthbert",
  "tempura0224",
  "LayCurse",
  "climpet",
];
const NEXT_A2 = [
  // 1st B1 top 4
  "carrot46",
  "morio__",
  "idsigma",
  "mugen1337",
];

const constructAll2ndTournament = (users: User[]): TournamentResponse => {
  const classes: { [key: string]: User[] } = {
    A: [],
    B: [],
    C: [],
    D: [],
  };

  users.forEach((user) => {
    if (user.rating >= 2000) {
      classes.A.push(user);
    } else if (user.rating >= 1600) {
      classes.B.push(user);
    } else if (user.rating >= 1200) {
      classes.C.push(user);
    } else {
      classes.D.push(user);
    }
  });

  const response: TournamentResponse = {};
  Object.entries(classes)
    .flatMap(([key, bracketUsers]) => {
      if (key === "A") {
        return Object.entries(splitClassA(bracketUsers));
      } else {
        return Object.entries(splitClass(bracketUsers, key));
      }
    })
    .forEach(([key, bracketUsers]) => {
      if (key === "A1") {
        response[key] = {
          node: construct2ndTournament(bracketUsers, 0),
        };
      } else {
        response[key] = {
          node: construct2ndTournament(bracketUsers, 0),
        };
      }
    });
  return response;
};

const splitClassA = (users: User[]) => {
  const classes: { [key: string]: User[] } = { A1: [], A2: [], A3: [] };
  users.sort((a, b) => a.rating - b.rating);

  NEXT_A1.forEach((nextA1UserId) => {
    const index = users.findIndex((e) => e.user_id === nextA1UserId);
    if (index >= 0) {
      classes.A1.push(users[index]);
      users.splice(index, 1);
    }
  });

  while (classes.A1.length < 32 && users.length > 0) {
    const user = users.pop();
    if (user) {
      classes.A1.push(user);
    }
  }

  NEXT_A2.forEach((nextA2UserId) => {
    const index = users.findIndex((e) => e.user_id === nextA2UserId);
    if (index >= 0) {
      classes.A2.push(users[index]);
      users.splice(index, 1);
    }
  });
  while (classes.A2.length < 32 && users.length > 0) {
    const user = users.pop();
    if (user) {
      classes.A2.push(user);
    }
  }
  classes["A3"] = users;
  return classes;
};

const splitClass = (users: User[], key: string) => {
  const classLimit = Math.floor(users.length / 3);
  const classes = [[], [], []] as [User[], User[], User[]];
  users.sort((a, b) => b.rating - a.rating);

  let pos = 0;
  users.forEach((user) => {
    classes[pos].push(user);
    if (pos < 2 && classes[pos].length === classLimit) {
      pos += 1;
    }
  });

  const result: { [key: string]: User[] } = {};
  result[`${key}1`] = classes[0];
  result[`${key}2`] = classes[1];
  result[`${key}3`] = classes[2];
  return result;
};

const construct2ndTournament = (
  users: User[],
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
  } else {
    const right = [] as User[];
    const left = [] as User[];
    users.forEach((user, i) => {
      if (i % 4 === 0 || i % 4 === 3) {
        left.push(user);
      } else {
        right.push(user);
      }
    });

    return {
      user: null,
      rank: null,
      children: [
        construct2ndTournament(left, depth + 1),
        construct2ndTournament(right, depth + 1),
      ],
    };
  }
};
