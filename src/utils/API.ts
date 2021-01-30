import { TournamentResponse } from "../models/TournamentNode";

export const fetchTournament = (seasonId: string) => {
  // if (seasonId === "3") {
  //   return fetchTournamentSeason3();
  // }
  return fetch(`./bracket-${seasonId}.json`)
    .then((response) => response.json())
    .then((response) => response as TournamentResponse);
};

const fetchTournamentSeason3 = async (): Promise<TournamentResponse> => {
  const usersText = await fetch(
    "https://atcoder-tournament.herokuapp.com/api/users"
  ).then((response) => response.text());
  const previousBracketsText = await fetch(
    "./bracket-2.json"
  ).then((response) => response.text());

  const ratingText = await fetch("./ratings.json").then((response) =>
    response.text()
  );

  const result: string = await import(
    "../tournament-constructor/build"
  ).then((m) =>
    m.construct_tournament(usersText, previousBracketsText, ratingText)
  );
  return JSON.parse(result);
};
