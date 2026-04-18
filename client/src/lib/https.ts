import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { apiClient } from "./api"

export interface HttpResponse<TData> {
  data: TData
  status: number
  headers: Record<string, string>
}

export interface HttpError<TError = unknown> {
  message: string
  status: number
  error?: TError
}

export type HttpConfig<TRequest = unknown> = AxiosRequestConfig<TRequest>

const toHttpResponse = <TData>(response: AxiosResponse<TData>): HttpResponse<TData> => ({
  data: response.data,
  status: response.status,
  headers: response.headers as Record<string, string>,
})

const toHttpError = <TError = unknown>(error: unknown): HttpError<TError> => {
  if (isAxiosResponseError<TError>(error)) {
    return {
      message: error.response?.data?.message ?? error.message ?? "Request failed",
      status: error.response?.status ?? 500,
      error: error.response?.data,
    }
  }

  return {
    message: "Unexpected error occurred",
    status: 500,
  }
}

const isAxiosResponseError = <TError>(
  error: unknown,
): error is {
  message?: string
  response?: {
    status?: number
    data?: TError & { message?: string }
  }
} => {
  return typeof error === "object" && error !== null && "response" in error
}

const request = async <TResponse, TRequest = unknown>(
  config: InternalAxiosRequestConfig<TRequest> | AxiosRequestConfig<TRequest>,
): Promise<HttpResponse<TResponse>> => {
  try {
    const response = await apiClient.request<TResponse, AxiosResponse<TResponse>, TRequest>(config)
    return toHttpResponse(response)
  } catch (error) {
    throw toHttpError(error)
  }
}

export const http = {
  get: <TResponse>(url: string, config?: HttpConfig): Promise<HttpResponse<TResponse>> => {
    return request<TResponse>({
      ...config,
      method: "GET",
      url,
    })
  },

  post: <TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: HttpConfig<TRequest>,
  ): Promise<HttpResponse<TResponse>> => {
    return request<TResponse, TRequest>({
      ...config,
      method: "POST",
      url,
      data,
    })
  },

  put: <TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: HttpConfig<TRequest>,
  ): Promise<HttpResponse<TResponse>> => {
    return request<TResponse, TRequest>({
      ...config,
      method: "PUT",
      url,
      data,
    })
  },

  delete: <TResponse>(url: string, config?: HttpConfig): Promise<HttpResponse<TResponse>> => {
    return request<TResponse>({
      ...config,
      method: "DELETE",
      url,
    })
  },
}
