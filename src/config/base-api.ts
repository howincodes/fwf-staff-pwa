import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import apiClient, {  WEBSITE_API_URL } from "./api";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";


export interface AxiosBaseQueryError {
  status: number | undefined;
  data: unknown;
}

export function isErrorWithMessage(
  error: unknown
): error is { data: { message: string } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data: unknown }).data === "object" &&
    (error as { data: { message: unknown } }).data.message !== undefined &&
    typeof (error as { data: { message: unknown } }).data.message === "string"
  );
}

export const getErrorMessage = (
  error: unknown,
  fallbackMessage: string
): string => {
  if (isErrorWithMessage(error)) {
    return error.data.message;
  } else {
    return fallbackMessage;
  }
};

const axiosBaseQuery =
  <TData = unknown>(
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: unknown;
      params?: Record<string, unknown>;
      headers?: AxiosRequestConfig["headers"];
    },
    TData,
    AxiosBaseQueryError
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result: AxiosResponse<TData> = await apiClient({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      // triggerNotificationHaptic("error");
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// Base API setup with createApi using generics for responses
export const baseApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: WEBSITE_API_URL,
  }),
  endpoints: () => ({}),
});


export default axiosBaseQuery;
