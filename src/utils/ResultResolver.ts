import {
  BracketNode,
  FinishedUserNode,
  WaitingUserNode,
} from "../models/BracketNode";

const getDepth = (node: BracketNode, depth: number) => {
  let maxDepth = depth;
  node.children.forEach((child) => {
    maxDepth = Math.max(getDepth(child, depth + 1), maxDepth);
  });
  return maxDepth;
};

const pickWinner = (userInfoList: FinishedUserNode[]) => {
  const sorted = userInfoList.sort((a, b) => {
    if (a.type === "AbsentUser" && b.type === "AbsentUser") {
      return b.rating - a.rating;
    }
    if (a.type === "AbsentUser") {
      return 1;
    }
    if (b.type === "AbsentUser") {
      return -1;
    }
    return a.rank - b.rank;
  });
  return sorted[0];
};

const resolveByDfs = (
  node: BracketNode,
  depth: number,
  maxDepth: number,
  putContestResult: (
    index: number,
    node: WaitingUserNode
  ) => WaitingUserNode | FinishedUserNode
): BracketNode => {
  const index = maxDepth - depth - 1;
  const children = node.children.map((child) => {
    const resolvedUserNode = resolveByDfs(
      child,
      depth + 1,
      maxDepth,
      putContestResult
    );
    if (resolvedUserNode.type === "WaitingUser") {
      return putContestResult(index, resolvedUserNode);
    } else {
      return resolvedUserNode;
    }
  });

  const finishedChildren = [] as FinishedUserNode[];
  children.forEach((child) => {
    if (child.type === "AbsentUser" || child.type === "ParticipatedUser") {
      finishedChildren.push(child);
    }
  });

  if (children.length === 0 || finishedChildren.length !== children.length) {
    return {
      ...node,
      children,
    };
  }

  const winner = pickWinner(finishedChildren);
  return {
    type: "WaitingUser",
    rating: winner.rating,
    name: winner.name,
    children,
  };
};

export const resolveTournament = (
  root: BracketNode,
  putContestResult: (
    index: number,
    node: WaitingUserNode
  ) => WaitingUserNode | FinishedUserNode
) => {
  const depth = getDepth(root, 0);
  return resolveByDfs(root, 0, depth, putContestResult);
};
