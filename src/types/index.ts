// Domain Events
export interface AnalyticsReportEvent {
  type: 'ANALYTICS_REPORT';
  payload: {
    totalCount: number;
    timestamp: Date;
  };
}

export type DomainEvent = AnalyticsReportEvent;

// Network Types
export interface NetworkRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
}

export interface NetworkResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

export interface NetworkError {
  message: string;
  status?: number;
  statusText?: string;
}

// Domain Types
export interface AccessCode {
  code: string;
  isValid: boolean;
}

export interface PostData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface FeedItem {
  id: string;
  title: string;
  description?: string;
  userId?: number;
  body?: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
  address?: {
    street: string;
    suite?: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
}

export interface AnalyticsViewModel {
  id: number;
  name: string;
  email: string;
  displayText: string;
}

export interface AnalyticsData {
  items: AnalyticsViewModel[];
  totalCount: number;
  isCached: boolean;
}

// Feature States
export interface WelcomeState {
  accessCode: string;
  error: string | null;
  isLoading: boolean;
}

export interface DashboardState {
  activeTab: 'feed' | 'analytics';
  analyticsCounter: number;
  date: Date;
}

export interface FeedState {
  items: FeedItem[];
  isLoading: boolean;
  error: string | null;
}

export interface AnalyticsState {
  data: AnalyticsData | null;
  isLoading: boolean;
  error: string | null;
}
