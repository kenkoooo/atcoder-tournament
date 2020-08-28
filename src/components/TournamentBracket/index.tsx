import React from "react";
import { GameNode } from "./GameNode";

export interface BracketNode {
  name: string;
  children: BracketNode[];
}

interface Props {
  root: BracketNode;
  getRating: (userId: string) => number | undefined;
}

export const TournamentBracket = (props: Props) => {
  return (
    <div className="wrapper">
      <GameNode getRating={props.getRating} node={props.root} />
    </div>
  );
};
