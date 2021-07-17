import useSWR from "swr";
import { TournamentHistory } from "../models/TournamentHistory";
import { TournamentResponse } from "../models/TournamentNode";
import { UserHistory } from "../models/UserHistory";

const fetchTournamentSeason5 = async (): Promise<TournamentResponse> => {
  const usersText = await fetch(
    "https://atcoder-tournament.herokuapp.com/api/users"
  ).then((response) => response.text());
  const previousBracketsText = await fetch(
    "./bracket-4.json"
  ).then((response) => response.text());

  const ratingText = await fetch("./ratings.json").then((response) =>
    response.text()
  );

  const result: string = await import(
    "../tournament-constructor/build"
  ).then((m) =>
    m.construct_tournament(usersText, previousBracketsText, ratingText, "SSRS")
  );
  return JSON.parse(result);
};

export const useTournament = (seasonId: string) => {
  const fetcher = (url: string) => {
    if (seasonId === "5") {
      return fetchTournamentSeason5();
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

export const useTournamentList = () => {
  const fetcher = (url: string) => {
    return fetch(url)
      .then((response) => response.json())
      .then((response) => response as TournamentHistory[]);
  };

  const url = "./tournaments.json";
  return useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
