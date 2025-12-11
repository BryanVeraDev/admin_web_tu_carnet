import axios, { AxiosError } from "axios";

export const URL: string = import.meta.env.VITE_API_URL as string;

export interface ApiError {
  message: string;
  statusCode: number;
  error?: {
    message: string;
    statusCode: number;
  };
}

export const defaultError: ApiError = {
  message: "Internal Error",
  statusCode: 500,
  error: {
    message: "Internal Error",
    statusCode: 500,
  },
};

export function handleAxiosError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    return axiosError.response?.data ?? defaultError;
  }

  return defaultError;
}
