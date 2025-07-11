import { ProfileReqOrRespType, ProfileRequestType } from "@/types/profile";
import httpClient from "./api/httpClient";

export const getProfile = async (): Promise<ProfileReqOrRespType> => {
  try {
    const response = await httpClient
      .get<ProfileReqOrRespType>("/v1/auth/profile")
      .then((res) => res.data);

    return response;
  } catch (error: unknown) {
    throw error ?? new Error(`${error}`);
  }
};

export const updateProfile = async (
  payload: ProfileRequestType
): Promise<ProfileReqOrRespType> => {
  const { id, ...rest } = payload;

  try {
    const response = await httpClient
      .put<ProfileReqOrRespType>(`/v1/users/${id}`, rest)
      .then((res) => res.data);

    return response;
  } catch (error: unknown) {
    throw error ?? new Error(`${error}`);
  }
};
