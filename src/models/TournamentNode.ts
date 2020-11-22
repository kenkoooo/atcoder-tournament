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
  [key: string]: {
    node: TournamentNode;
    league?: LeagueEntry[];
    top4?: User[] | null;
  };
}

export interface LeagueEntry {
  user: User;
  win_count: number;
  rank_sum: number;
  results: BattleResultDetail[];
}

export interface BattleResultDetail {
  opponent: User | null;
  result: BattleResult;
}

export type BattleResult =
  | WinResult
  | LoseResult
  | SkipLoseResult
  | SkipWinResult
  | WriterResult
  | NotYetResult;

interface WinResult {
  result: "Win";
  rank: number;
}
interface LoseResult {
  result: "Lose";
  rank: number;
}
interface SkipLoseResult {
  result: "SkipLose";
}
interface SkipWinResult {
  result: "SkipWin";
}
interface WriterResult {
  result: "Writer";
}

interface NotYetResult {
  result: "NotYet";
}
