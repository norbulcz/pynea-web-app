import { AnalyticsDomain } from '@/domain/AnalyticsDomain';
import { AnalyticsState, AnalyticsData } from '@/types';

export class AnalyticsController {
  private state: AnalyticsState = {
    data: null,
    isLoading: false,
    error: null,
  };

  private onStateChange: ((state: AnalyticsState) => void) | null = null;
  private intervalId: NodeJS.Timeout | null = null;

  setStateChangeCallback(callback: (state: AnalyticsState) => void): void {
    this.onStateChange = callback;
  }

  startPeriodicFetching(): void {
    this.loadAnalyticsData();
    
    // Schedule periodic fetching every 5 seconds
    this.intervalId = setInterval(() => {
      this.loadAnalyticsData();
    }, 5000);
  }

  // Start fetching immediately when controller is created
  initialize(): void {
    this.startPeriodicFetching();
  }

  stopPeriodicFetching(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  loadAnalyticsData(): void {
    this.state.isLoading = true;
    this.state.error = null;
    this.notifyStateChange();

    AnalyticsDomain.fetchAnalyticsData(
      (data: AnalyticsData) => {
        this.state.data = data;
        this.state.isLoading = false;
        this.state.error = null;
        this.notifyStateChange();
      },
      (error: string) => {
        this.state.error = error;
        this.state.isLoading = false;
        this.notifyStateChange();
      }
    );
  }

  cleanup(): void {
    this.stopPeriodicFetching();
  }

  private notifyStateChange(): void {
    if (this.onStateChange) {
      this.onStateChange({ ...this.state });
    }
  }

  getState(): AnalyticsState {
    return { ...this.state };
  }
}
