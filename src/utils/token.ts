export const REFRESH_TOKEN_KEY = "refresh_token";
export const ACCESS_TOKEN_KEY = "access_token";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const setAccessToken = (accessToken: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

export const setRefreshToken = (refreshToken: string) =>
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

export const setTokens = (accessToken: string, refreshToken: string) => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};
