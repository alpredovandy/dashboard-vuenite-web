import { AuthLoginRequestType, AuthUserResponseType } from "@/types/auth-user";
import httpClient from "./api/httpClient";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, KEEPME_LOGGED_IN } from "@/constants/configs";

export const login = async ({
  username,
  password,
  keepMeLogged,
}: AuthLoginRequestType): Promise<AuthUserResponseType> => {
  if (keepMeLogged) {
    Cookies.set(KEEPME_LOGGED_IN, String(keepMeLogged), { expires: 365 });
  }

  const maxExpiresMin = 43200;

  try {
    const response = await httpClient
      .post<AuthUserResponseType>("/auth/login", {
        username,
        password,
        expiresInMins: keepMeLogged ? maxExpiresMin : 60,
      })
      .then((res) => res.data);

    Cookies.set(ACCESS_TOKEN, String(response.accessToken), { expires: 365 });

    return response;
  } catch (error: unknown) {
    throw error ?? new Error(`${error}`);
  }
};

export const getAuthUser = async (): Promise<AuthUserResponseType> => {
  try {
    const response = await httpClient
      .get<AuthUserResponseType>("/auth/me", {
        withCredentials: true,
      })
      .then((res) => res.data);

    return response;
  } catch (error: unknown) {
    throw error ?? new Error(`${error}`);
  }
};
