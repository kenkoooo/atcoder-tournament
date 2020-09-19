export interface User {
  user_id: string;
  rating: number;
}

export interface TournamentNode {
  user: User | null;
  rank: number | null;
  children: TournamentNode[];
}

export interface TournamentResponse {
  [key: string]: TournamentNode;
}
