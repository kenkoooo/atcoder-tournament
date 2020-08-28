import React from "react";
import { BracketNode } from "./index";

interface Props {
  node: BracketNode;
}

export const GameNode = (props: Props) => {
  if (props.node.children.length === 0) {
    return <p>{props.node.name}</p>;
  } else {
    return (
      <div className="item">
        <div className="item-parent">
          <p>{props.node.name}</p>
        </div>
        <div className="item-children">
          {props.node.children.map((node, i) => (
            <div key={i} className="item-child">
              <GameNode node={node} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
