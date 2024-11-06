// import { authStore } from "@/stores/authStore";
import queryString from "query-string";
import useAccountStore from "@/stores/useAccountStore";
const api =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:5007";

export type ApiResponse<T = any> = {
  code: number;
  data: T | null;
  error: object | boolean;
};

const createHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "x-org-uid": process.env.ORG_ID,
  };

  const token = useAccountStore.getState().token;
  if (token) {
    headers["x-auth-token"] = token;
  }

  return headers;
};

const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  const code = response.status;
  const data = await response.json();

  if (response.ok) {
    return { code, data: data.obj, error: false };
  } else {
    return { code, data: data.obj, error: data.obj };
  }
};

const request = async <T>(
  method: string,
  endpoint: string,
  body?: any,
  query?: any
): Promise<ApiResponse<T>> => {
  let url = `${api}${endpoint}`;
  if (query) {
    url += `?${queryString.stringify(query)}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: createHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse<T>(response);
  } catch (error) {
    console.error("Error making API request:", error.message);
    return { code: 600, data: null, error: error };
  }
};

export const crud = {
  request: request,
  get: <T>(endpoint: string, query?: any) =>
    request<T>("GET", endpoint, undefined, query),
  post: <T>(endpoint: string, body: any, query?: any) =>
    request<T>("POST", endpoint, body, query),
  put: <T>(endpoint: string, body: any, query?: any) =>
    request<T>("PUT", endpoint, body, query),
  delete: <T>(endpoint: string, query?: any) =>
    request<T>("DELETE", endpoint, undefined, query),
};

export const qcrud = {
  request: request,
  get: async <T>(endpoint: string, query?: any) => {
    const response = await request<T>("GET", endpoint, undefined, query);
    if (response.error) throw response.error;
    else return response.data;
  },
  post: async <T>(endpoint: string, body: any, query?: any) => {
    const response = await request<T>("POST", endpoint, body, query);
    if (response.error) throw response.error;
    else return response.data;
  },
  put: async <T>(endpoint: string, body: any, query?: any) => {
    const response = await request<T>("PUT", endpoint, body, query);
    if (response.error) throw response.error;
    else return response.data;
  },
  delete: async <T>(endpoint: string, query?: any) => {
    const response = await request<T>("DELETE", endpoint, undefined, query);
    if (response.error) throw response.error;
    else return response.data;
  },
};

//For React Query ==== AGAR KOI DOUBT HO TO PUCH LENA, TYPES MAT CHANGE KARNA =====
// infers data type of response from api call, good to have but not necessary
import {
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
type InferApiResponseType<T> = T extends ApiResponse<infer U> ? U : never;

export const createQueryOptions = <
  TQueryKey extends QueryKey,
  TQueryFn extends (...args: any[]) => Promise<ApiResponse<any>>
>(
  key: TQueryKey,
  fn: TQueryFn,
  options: Omit<
    UseQueryOptions<
      InferApiResponseType<Awaited<ReturnType<TQueryFn>>>,
      Error,
      InferApiResponseType<Awaited<ReturnType<TQueryFn>>>,
      TQueryKey
    >,
    "queryKey" | "queryFn"
  > = {}
): UseQueryOptions<
  InferApiResponseType<Awaited<ReturnType<TQueryFn>>>,
  Error,
  InferApiResponseType<Awaited<ReturnType<TQueryFn>>>,
  TQueryKey
> => ({
  queryKey: key,
  queryFn: async () => {
    const response = await fn();
    if (response.error) throw response.error;
    else return response.data;
  },
  // Spread additional options while maintaining defaults
  ...options,
});

export const createMutationOptions = <
  TMutationKey extends QueryKey,
  TMutationFn extends (...args: any[]) => Promise<ApiResponse<any>>,
  TData = InferApiResponseType<Awaited<ReturnType<TMutationFn>>>,
  TError = Error,
  TVariables = Parameters<TMutationFn>[0],
  TContext = unknown
>(
  key: TMutationKey,
  fn: TMutationFn,
  options?: {
    onSuccess?: (
      data: TData,
      variables: TVariables,
      context: TContext
    ) => void | Promise<unknown>;
    onError?: (
      error: TError,
      variables: TVariables,
      context: TContext
    ) => void | Promise<unknown>;
    onSettled?: (
      data: TData | undefined,
      error: TError | null,
      variables: TVariables,
      context: TContext
    ) => void | Promise<unknown>;
  }
): UseMutationOptions<TData, TError, TVariables, TContext> => ({
  mutationKey: key,
  mutationFn: async (variables) => {
    const response = await fn(variables);
    if (response.error) throw response.error;
    else return response.data;
  },
  onSuccess: options?.onSuccess,
  onError: options?.onError,
  onSettled: options?.onSettled,
});
