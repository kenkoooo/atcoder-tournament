import React from "react";
import { GameNode } from "./GameNode";

export interface BracketNode {
  name: string;
  children: BracketNode[];
}

interface Props {
  root: BracketNode;
}

export const TournamentBracket = (props: Props) => {
  return (
    <div className="wrapper">
      <GameNode node={props.root} />
    </div>
  );
};
