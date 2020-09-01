export type BracketNode = EmptyNode | WaitingUserNode | FinishedUserNode;
export type FinishedUserNode = ParticipatedUserNode | AbsentUserNode;

export interface EmptyNode {
  readonly type: "Empty";
  readonly children: BracketNode[];
}

export interface WaitingUserNode {
  readonly type: "WaitingUser";
  readonly name: string;
  readonly rating: number;
  readonly children: BracketNode[];
}

export interface ParticipatedUserNode {
  readonly type: "ParticipatedUser";
  readonly name: string;
  readonly rating: number;
  readonly rank: number;
  readonly children: BracketNode[];
}

export interface AbsentUserNode {
  readonly type: "AbsentUser";
  readonly name: string;
  readonly rating: number;
  readonly children: BracketNode[];
}
