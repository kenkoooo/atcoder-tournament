// const SERVER = "https://atcoder-tournament.herokuapp.com/api";
const SERVER = "http://localhost:8080/api";
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
  console.log(response.headers.get("Set-Cookie"));
  return response.status === 200;
};

export const verifyUser = async () => {
  const response = await fetch(`${SERVER}/verify`, {
    credentials: "include",
  });
  console.log(response.status);
};
