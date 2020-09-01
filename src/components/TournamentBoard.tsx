import React from "react";
import {
  BracketNode,
  FinishedUserNode,
  WaitingUserNode,
} from "../models/BracketNode";
import { GameNode } from "./TournamentBracket/GameNode";
import { makeTree } from "./TournamentBracket/TreeMaker";
import { resolveTournament } from "../utils/ResultResolver";

interface Props {
  nodes: BracketNode[];
  contestResults?: Map<string, number>[];
}

export const TournamentBoard = (props: Props) => {
  const { nodes, contestResults } = props;

  const putContestResult = (
    index: number,
    node: WaitingUserNode
  ): WaitingUserNode | FinishedUserNode => {
    if (!contestResults || contestResults.length <= index) {
      return node;
    }
    const rank = contestResults[index].get(node.name);
    if (rank) {
      return {
        ...node,
        type: "ParticipatedUser",
        rank: rank,
      };
    } else {
      return {
        ...node,
        type: "AbsentUser",
      };
    }
  };

  const root: BracketNode =
    nodes.length > 0 ? makeTree(nodes) : { type: "Empty", children: [] };
  const resolvedRoot = resolveTournament(root, putContestResult);

  return <GameNode node={resolvedRoot} />;
};
