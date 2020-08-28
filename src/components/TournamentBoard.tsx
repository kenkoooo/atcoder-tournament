import React from "react";
import { TournamentBracket } from "./TournamentBracket";
import { makeTree } from "./TournamentBracket/TreeMaker";
import { UNDEFINED_NODE } from "../utils/Constants";
import { resolveTournament } from "../utils/ResultResolver";

interface Props {
  atCoderUserIds: string[];
  ratingMap?: Map<string, number>;
  contestResults?: Map<string, number>[];
}

export const TournamentBoard = (props: Props) => {
  const { atCoderUserIds, contestResults, ratingMap } = props;

  const pickWinner = (index: number, children: string[]) => {
    if (!contestResults || contestResults.length <= index) {
      return UNDEFINED_NODE;
    }
    const ranks = children.map((child) => {
      return contestResults[index].get(child) ?? 100000;
    });
    const ratings = children.map((child) => {
      return ratingMap?.get(child) ?? 0;
    });
    const userInfo = children.map((userId, i) => ({
      userId,
      rating: ratings[i],
      rank: ranks[i],
    }));
    const sorted = userInfo.sort((a, b) => {
      if (a.rank === b.rank) {
        return b.rating - a.rating;
      }
      return a.rank - b.rank;
    });
    return sorted[0].userId;
  };

  const root =
    atCoderUserIds.length > 0
      ? makeTree(atCoderUserIds)
      : { name: "loading", children: [] };
  const resolvedRoot = resolveTournament(root, pickWinner);

  return (
    <>
      <TournamentBracket
        root={resolvedRoot}
        getRating={(userId) => ratingMap?.get(userId)}
      />
    </>
  );
};
