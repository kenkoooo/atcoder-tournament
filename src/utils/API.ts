import { TournamentResponse } from "../models/TournamentNode";

export const fetchTournament = (seasonId: string) => {
  return fetch(`./bracket-${seasonId}.json`)
    .then((response) => response.json())
    .then((response) => response as TournamentResponse);
};
