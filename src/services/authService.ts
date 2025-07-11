import {
  AuthLoginRequestType,
  AuthLoginResponseType,
  AuthRegisterRequestType,
  AuthRegisterResponseType,
} from "@/types/auth";
import httpClient from "./api/httpClient";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, KEEPME_LOGGED_IN } from "@/constants/configs";
import { fallbackPath } from "@/router";
import { getAvatarByName } from "@/utils";

export const login = async ({
  email,
  password,
  keepMeLogged,
}: AuthLoginRequestType): Promise<AuthLoginResponseType> => {
  if (keepMeLogged) {
    Cookies.set(KEEPME_LOGGED_IN, String(keepMeLogged), { expires: 365 });
  }

  try {
    const response = await httpClient
      .post<AuthLoginResponseType>("/v1/auth/login", {
        email,
        password,
      })
      .then((res) => res.data);

    Cookies.set(ACCESS_TOKEN, String(response.access_token), {
      expires: keepMeLogged ? 365 : 1,
    });

    setTimeout(() => {
      window.location.replace(window.location.origin + fallbackPath);
    }, 250);

    return response;
  } catch (error: unknown) {
    throw error ?? new Error(`${error}`);
  }
};

export const register = async (
  payload: AuthRegisterRequestType
): Promise<AuthRegisterResponseType> => {
  try {
    const avatarURL = getAvatarByName(payload.name);
    const response = await httpClient
      .post<AuthRegisterResponseType>("/v1/users", {
        ...payload,
        avatar: avatarURL,
      })
      .then((res) => res.data);

    return response;
  } catch (error: unknown) {
    throw error ?? new Error(`${error}`);
  }
};
