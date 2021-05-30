export interface TournamentHistory {
  season: string;
  ranking: [
    number,
    {
      class: string;
      user_id: string;
      rank: number;
    }
  ][];
  expandable: boolean;
}
