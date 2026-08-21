import type { ApiError, ApiResponse } from '@/shared/types/api'
import { useAuthStore } from '@/stores/authStore'

const BASE_URL: string | undefined = import.meta.env.VITE_API_BASE_URL

if (!BASE_URL) {
  console.warn(
    '[http-client] VITE_API_BASE_URL no está definido. Copia .env.example a .env y configura la URL de la API.',
  )
}

export class HttpClientError extends Error implements ApiError {
  status: number
  errors?: Record<string, string[]>

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message)
    this.name = 'HttpClientError'
    this.status = status
    this.errors = errors
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
    if (response.status === 401 && token) {
      useAuthStore.getState().clearAuth()
      window.location.assign('/login')
    }
    const payload = (await response.json().catch(() => null)) as
      | Partial<ApiError>
      | null
    throw new HttpClientError(
      payload?.message ?? `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      payload?.errors,
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
