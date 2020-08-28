import { BracketNode } from "../components/TournamentBracket";

const getDepth = (node: BracketNode, depth: number) => {
  let maxDepth = depth;
  node.children.forEach((child) => {
    maxDepth = Math.max(getDepth(child, depth + 1), maxDepth);
  });
  return maxDepth;
};

const resolveByDfs = (
  node: BracketNode,
  depth: number,
  maxDepth: number,
  pickWinnerId: (index: number, userIds: string[]) => string
): BracketNode => {
  const index = maxDepth - depth - 1;
  const children = node.children.map((child) =>
    resolveByDfs(child, depth + 1, maxDepth, pickWinnerId)
  );
  const childrenNames = children.map((child) => child.name);
  const name =
    childrenNames.length === 0 ? node.name : pickWinnerId(index, childrenNames);
  return { name, children };
};

export const resolveTournament = (
  root: BracketNode,
  pickWinnerId: (index: number, userIds: string[]) => string
) => {
  const depth = getDepth(root, 0);
  return resolveByDfs(root, 0, depth, pickWinnerId);
};
