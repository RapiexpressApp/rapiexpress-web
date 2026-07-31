import type { ApiResponse } from '@/shared/types/api'
import { useAuthStore } from '@/stores/authStore'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'

class HttpClientError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpClientError'
    this.status = status
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = useAuthStore.getState().token

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    ;(headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new HttpClientError(
      `HTTP ${response.status}: ${response.statusText}`,
      response.status,
    )
  }

  const data = (await response.json()) as ApiResponse<T>
  return data
}

export const httpClient = {
  get<T>(endpoint: string, params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return request<T>(`${endpoint}${query}`, { method: 'GET' })
  },

  post<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  },

  put<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
  },

  patch<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    })
  },

  delete<T>(endpoint: string) {
    return request<T>(endpoint, { method: 'DELETE' })
  },
}

export { HttpClientError }
