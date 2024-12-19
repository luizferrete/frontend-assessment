import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import NotFound from './errors/NotFound';
import Unauthorized from './errors/Unauthorized';
import WebApiError from './errors/WebApiError';

export interface Config {
  baseURL: string;
}

class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(config: Config) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'EM-API-KEY': 'a3f5c9d8e2b4f1c6a7d9e0b3c4d5f6a7'
      },
    });

    // Intercept responses for error treatment
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => this.handleError(error)
    );
  }

  private handleError(error: any): Promise<never> {
    console.error(error);
    if (error.response) {
      const { status, data } = error.response;
      let message = null;
      switch (status) {
        case 404:
          return Promise.reject(new NotFound());
        case 401:
          return Promise.reject(new Unauthorized());
        case 400:
          message = data || 'Invalid request.';
          return Promise.reject(new WebApiError(message));
        case 429:
          message = typeof data === 'string' ? data : data?.message;
          return Promise.reject(new WebApiError(message || 'Too many requests, please try again later.'));
        default:
          if (data && data.error) {
            return Promise.reject(new WebApiError(data.error));
          }
          return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }

  public async get<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, options);
    return response.data;
  }

  public async post<T>(endpoint: string, body: any, options?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, body, options);
    return response.data;
  }

  public async put<T>(endpoint: string, body: any, options?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, body, options);
    return response.data;
  }

  public async patch<T>(endpoint: string, body: any, options?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, body, options);
    return response.data;
  }

  public async delete<T>(endpoint: string, body?: any, options?: AxiosRequestConfig): Promise<T | void> {
    const config: AxiosRequestConfig = {
      ...options,
      data: body,
    };
    const response = await this.axiosInstance.delete<T>(endpoint, config);
    return response.data;
  }
}

export default HttpClient;
