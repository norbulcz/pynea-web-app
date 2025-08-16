import { NetworkRequest, NetworkResponse, NetworkError } from '@/types';

export class NetworkManager {
  private static instance: NetworkManager;

  private constructor() {}

  static getInstance(): NetworkManager {
    if (!NetworkManager.instance) {
      NetworkManager.instance = new NetworkManager();
    }
    return NetworkManager.instance;
  }

  async request<T = any>(
    request: NetworkRequest,
    onSuccess: (response: NetworkResponse<T>) => void,
    onError: (error: NetworkError) => void
  ): Promise<void> {
    try {
      const response = await fetch(request.url, {
        method: request.method,
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        body: request.body ? JSON.stringify(request.body) : undefined,
      });

      if (!response.ok) {
        const error: NetworkError = {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          statusText: response.statusText,
        };
        onError(error);
        return;
      }

      const data = await response.json();
      const networkResponse: NetworkResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText,
      };

      onSuccess(networkResponse);
    } catch (error) {
      const networkError: NetworkError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
      onError(networkError);
    }
  }
}
