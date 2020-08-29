import React from "react";
import { BracketNode } from "../../models/BracketNode";
import { GameNode } from "./GameNode";

interface Props {
  root: BracketNode;
  getRating: (userId: string) => number | undefined;
}

export const TournamentBracket = (props: Props) => {
  return <GameNode getRating={props.getRating} node={props.root} />;
};
