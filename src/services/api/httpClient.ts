import { ACCESS_TOKEN, FAKE_API_URL } from "@/constants/configs";
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import Cookies from "js-cookie";

const api: AxiosInstance = axios.create({
  baseURL: FAKE_API_URL,
});

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig<unknown>
  ): InternalAxiosRequestConfig<unknown> => {
    const token = Cookies.get(ACCESS_TOKEN);

    if (token) {
      // Type assertion to ensure headers are not undefined
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }

      // Type assertion to ensure headers have string keys
      (config.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error): Promise<never> => {
    if (error.response?.status >= 400) {
      throw new Error(error.response.data?.message);
    }
    return Promise.reject(error);
  }
);

export default api;
