import React from "react";
import { TournamentBracket } from "./TournamentBracket";
import { makeTree } from "./TournamentBracket/TreeMaker";
import { resolveTournament } from "../utils/ResultResolver";

interface Props {
  atCoderUserIds: string[];
  ratingMap?: Map<string, number>;
  contestResults?: Map<string, number>[];
}

export const TournamentBoard = (props: Props) => {
  const { atCoderUserIds, contestResults, ratingMap } = props;

  const makeUserInfo = (index: number, userId: string) => {
    if (!contestResults || contestResults.length <= index) {
      return undefined;
    }
    const resultMap = contestResults[index];
    const nextRank = resultMap.size + 1;
    const rank = contestResults[index].get(userId) ?? nextRank;
    const rating = ratingMap?.get(userId) ?? 0;
    return { userId, rank, rating };
  };

  const root =
    atCoderUserIds.length > 0
      ? makeTree(atCoderUserIds)
      : { name: "loading", children: [] };
  const resolvedRoot = resolveTournament(root, makeUserInfo);

  return (
    <>
      <TournamentBracket
        root={resolvedRoot}
        getRating={(userId) => ratingMap?.get(userId)}
      />
    </>
  );
};
