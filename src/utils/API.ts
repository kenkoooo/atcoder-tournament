import useSWR from "swr";
import { TournamentHistory } from "../models/TournamentHistory";
import { TournamentResponse } from "../models/TournamentNode";
import { UserHistory } from "../models/UserHistory";

const fetchTournamentSeason7 = async (): Promise<TournamentResponse> => {
  const usersResponse = await fetch("https://abc-api.kenkoooo.com/api/users");
  const usersText = await usersResponse.text();

  const previousBracketsResponse = await fetch("./bracket-6.json");
  const previousBracketsText = await previousBracketsResponse.text();

  const ratingResponse = await fetch("./ratings.json");
  const ratingText = await ratingResponse.text();

  const wasm = await import("../wasm/build");

  const result = wasm.construct_tournament(
    usersText,
    ratingText,
    previousBracketsText
  );
  return JSON.parse(result);
};

export const useTournament = (seasonId: string) => {
  const fetcher = (url: string) => {
    if (seasonId === "7") {
      return fetchTournamentSeason7();
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
