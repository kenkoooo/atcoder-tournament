import { BracketNode } from "../models/BracketNode";

interface UserInfo {
  userId: string;
  rating: number;
  rank: number;
}

const getDepth = (node: BracketNode, depth: number) => {
  let maxDepth = depth;
  node.children.forEach((child) => {
    maxDepth = Math.max(getDepth(child, depth + 1), maxDepth);
  });
  return maxDepth;
};

const pickWinner = (userInfoList: UserInfo[]) => {
  const sorted = userInfoList.sort((a, b) => {
    if (a.rank === b.rank) {
      return b.rating - a.rating;
    }
    return a.rank - b.rank;
  });
  return sorted[0];
};

const resolveByDfs = (
  node: BracketNode,
  depth: number,
  maxDepth: number,
  makeUserInfo: (index: number, userId: string) => UserInfo | undefined
): BracketNode => {
  const index = maxDepth - depth - 1;
  const children = node.children.map((child) =>
    resolveByDfs(child, depth + 1, maxDepth, makeUserInfo)
  );
  const userInfoList = [] as UserInfo[];
  children.forEach((user) => {
    const userInfo = makeUserInfo(index, user.name);
    if (userInfo) {
      userInfoList.push(userInfo);
    }
  });

  if (children.length === 0 || children.length !== userInfoList.length) {
    return { name: node.name, children };
  }

  const childrenWithResult = children.map((child, i) => ({
    ...userInfoList[i],
    ...child,
  }));
  const winner = pickWinner(userInfoList);
  return { name: winner.userId, children: childrenWithResult };
};

export const resolveTournament = (
  root: BracketNode,
  makeUserInfo: (index: number, userId: string) => UserInfo | undefined
) => {
  const depth = getDepth(root, 0);
  return resolveByDfs(root, 0, depth, makeUserInfo);
};
