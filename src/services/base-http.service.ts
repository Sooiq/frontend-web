/* eslint-disable @typescript-eslint/no-explicit-any */
 
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL ?? ''}/api/v1`,
  timeout: 30000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  async (error) => {
    throw new Error(error.message);
  },
);

export default class BaseHttpService {
  private readonly router: unknown;

  constructor(router?: unknown) {
    this.router = router;
  }

  async get<T>(endpoint: string, options = {}): Promise<T> {
    return instance
      .get(`/${endpoint}`, options)
      .then((result) => {
        return result.data;
      })
      .catch((error) => this.handleHttpError(error));
  }

  async post<T>(endpoint: string, data = {}, options = {}): Promise<T> {
    return instance
      .post(`/${endpoint}`, data, options)
      .then((result) => {
        return result.data;
      })
      .catch((error) => this.handleHttpError(error));
  }

  async put<T>(endpoint: string, data = {}, options = {}): Promise<T> {
    return instance
      .put(`/${endpoint}`, data, options)
      .then((result) => {
        return result.data;
      })
      .catch((error) => this.handleHttpError(error));
  }

  async delete<T>(endpoint: string, options = {}): Promise<T> {
    return instance.delete(`/${endpoint}`, options).catch((error) => this.handleHttpError(error));
  }

  async patch<T>(endpoint: string, data = {}, options = {}): Promise<T> {
    return instance
      .patch(`/${endpoint}`, data, options)
      .catch((error) => this.handleHttpError(error));
  }

  handleHttpError(error: AxiosError<Record<string, any>, unknown>): any {
    console.error('handleHttpError', {
      error: JSON.stringify(error)
    });

    const statusCode = error?.response?.status;
    const displayMessage = error.response?.data?.errorMessage ?? 'unknown error';

    if (!statusCode || statusCode >= 300) {
      toast.error(displayMessage);
      throw new Error(displayMessage);
    }

    return error.response?.data;
  }
}
