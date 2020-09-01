import { BracketNode } from "../../models/BracketNode";

export const makeTree = (players: BracketNode[]): BracketNode => {
  let leafCount = 1;
  while (leafCount * 2 <= players.length) {
    leafCount *= 2;
  }

  let leafPlayers = [] as BracketNode[];
  for (let i = 0; i < leafCount; i++) {
    if (leafCount + i < players.length) {
      const player1 = players[i];
      const player2 = players[leafCount + i];
      leafPlayers.push({
        type: "Empty",
        children: [player1, player2],
      });
    } else {
      leafPlayers.push(players[i]);
    }
  }

  let currentPlayers = leafPlayers;

  while (currentPlayers.length > 1) {
    const nextPlayers = [] as BracketNode[];
    for (let i = 0; i < currentPlayers.length; i += 2) {
      const node1 = currentPlayers[i];
      if (i + 1 === currentPlayers.length) {
        nextPlayers.push({ type: "Empty", children: [node1] });
      } else {
        const node2 = currentPlayers[i + 1];
        nextPlayers.push({ type: "Empty", children: [node1, node2] });
      }
    }
    currentPlayers = nextPlayers;
  }

  return currentPlayers[0];
};
