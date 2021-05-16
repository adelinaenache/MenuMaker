export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const setToken = (
  key: "ACCESS_TOKEN" | "REFRESH_TOKEN",
  token: string
) => {
  localStorage.setItem(key, token);
};

export const getToken = (key: "ACCESS_TOKEN" | "REFRESH_TOKEN") => {
  return localStorage.getItem(key);
};
