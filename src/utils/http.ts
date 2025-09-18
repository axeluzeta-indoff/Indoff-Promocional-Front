import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const API_BASE = import.meta.env.VITE_API_URL;

// instancia base
const instance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,          // cookies HttpOnly
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// interceptor de request (ej: auth headers en el futuro)
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // const token = ...; if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// pequeño retry para GET en fallos de red/5xx (máx 2)
instance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const cfg: any = err.config;
    const isIdempotent = (cfg?.method ?? 'get').toLowerCase() === 'get';
    const status = err.response?.status;
    const transient = !status || status >= 500;
    if (isIdempotent && transient && (cfg.__retryCount ?? 0) < 2) {
      cfg.__retryCount = (cfg.__retryCount ?? 0) + 1;
      await new Promise(r => setTimeout(r, 300 * cfg.__retryCount)); // backoff
      return instance.request(cfg);
    }
    // ejemplo de manejo 401:
    // if (status === 401) window.location.href = '/login';
    return Promise.reject(err);
  }
);

// helpers tipados (devuelven .data ya desempaquetado)
export const get = async <T>(url: string, params?: Record<string, any>, signal?: AbortSignal) =>
  (await instance.get<T>(url, { params, signal })).data;
export const post = async <T>(url: string, body?: unknown, signal?: AbortSignal) =>
  (await instance.post<T>(url, body, { signal })).data;
export const put  = async <T>(url: string, body?: unknown, signal?: AbortSignal) =>
  (await instance.put<T>(url, body, { signal })).data;
export const del  = async <T>(url: string, signal?: AbortSignal) =>
  (await instance.delete<T>(url, { signal })).data;

export { instance as http }; // por si quieres acceso directo
