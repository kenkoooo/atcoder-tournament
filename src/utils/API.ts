import useSWR from "swr";
import { BattleRecord } from "../models/BattleRecord";
import { TournamentHistory } from "../models/TournamentHistory";
import { TournamentResponse } from "../models/TournamentNode";
import { UserHistory } from "../models/UserHistory";

const SWRConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const fetchTournamentSeason9 = async (): Promise<TournamentResponse> => {
  const usersResponse = await fetch("https://abc-api.kenkoooo.com/api/users");
  const usersText = await usersResponse.text();

  const previousBracketsResponse = await fetch("./bracket-8.json");
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
    if (seasonId === "x") {
      return fetchTournamentSeason9();
    } else {
      return fetch(url)
        .then((response) => response.json())
        .then((response) => response as TournamentResponse);
    }
  };
  const url = `./bracket-${seasonId}.json`;
  return useSWR(url, fetcher, SWRConfig);
};

export const useUserHistories = () => {
  const fetcher = (url: string) => {
    return fetch(url)
      .then((response) => response.json())
      .then((response) => response as UserHistory[]);
  };

  const url = "./histories.json";
  return useSWR(url, fetcher, SWRConfig);
};

export const useTournamentList = () => {
  const fetcher = (url: string) => {
    return fetch(url)
      .then((response) => response.json())
      .then((response) => response as TournamentHistory[]);
  };

  const url = "./tournaments.json";
  return useSWR(url, fetcher, SWRConfig);
};

export const useBattleRecords = () => {
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const body = await response.json();
    return body as { [key: string]: BattleRecord[] };
  };

  const url = "./battle_records.json";
  return useSWR(url, fetcher, SWRConfig);
};
