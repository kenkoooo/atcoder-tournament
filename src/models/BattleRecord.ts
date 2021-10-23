import { BattleResultDetail, User } from "./TournamentNode";

export interface BattleRecord {
  user: User;
  season: string;
  class: string;
  battles: BattleResultDetail[];
}
