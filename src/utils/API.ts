import useSWR from "swr";
import { TournamentResponse } from "../models/TournamentNode";
import { UserHistory } from "../models/UserHistory";

const fetchTournamentSeason4 = async (): Promise<TournamentResponse> => {
  const usersText = await fetch(
    "https://atcoder-tournament.herokuapp.com/api/users"
  ).then((response) => response.text());
  const previousBracketsText = await fetch(
    "./bracket-3.json"
  ).then((response) => response.text());

  const ratingText = await fetch("./ratings.json").then((response) =>
    response.text()
  );

  const result: string = await import(
    "../tournament-constructor/build"
  ).then((m) =>
    m.construct_tournament(
      usersText,
      previousBracketsText,
      ratingText,
      "Tiramister"
    )
  );
  return JSON.parse(result);
};

export const useTournament = (seasonId: string) => {
  const fetcher = (url: string) => {
    if (seasonId === "4") {
      return fetchTournamentSeason4();
    } else {
      return fetch(url)
        .then((response) => response.json())
        .then((response) => response as TournamentResponse);
    }
  };
  const url = `./bracket-${seasonId}.json`;
  return useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useUserHistories = () => {
  const fetcher = (url: string) => {
    return fetch(url)
      .then((response) => response.json())
      .then((response) => response as UserHistory[]);
  };

  const url = "./histories.json";
  return useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
