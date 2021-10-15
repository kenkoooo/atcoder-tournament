import useSWR from "swr";
const SERVER = "https://abc-api.kenkoooo.com/api";

export const stageUser = async (userId: string) => {
  const response = await fetch(`${SERVER}/stage`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId }),
  });
  const body = await response.json();
  return body.token as string;
};

export const signupUser = async (userId: string) => {
  const response = await fetch(`${SERVER}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId }),
  });
  return response.status === 200;
};

export const useLoginState = () => {
  return useSWR(`${SERVER}/verify`, async (url) => {
    const response = await fetch(url, {
      credentials: "include",
    });
    const body = await response.json();
    return body.user_id as string;
  });
};

interface UserData {
  participate_next: boolean;
  participate_forever: boolean;
}

export const useUserData = () => {
  const fetcher = (url: string) =>
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => body as UserData);

  const url = `${SERVER}/data`;
  return useSWR(url, fetcher);
};

export const saveUserData = (data: UserData) =>
  fetch(`${SERVER}/save_data`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
