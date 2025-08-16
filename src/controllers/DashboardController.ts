import { EventBus } from '@/core/EventBus';
import { DashboardState, AnalyticsReportEvent } from '@/types';

export class DashboardController {
  private state: DashboardState = {
    activeTab: 'feed',
    analyticsCounter: 0,
    date: new Date(),
  };

  private onStateChange: ((state: DashboardState) => void) | null = null;
  private eventBus = EventBus.getInstance();
  private unsubscribe: (() => void) | null = null;

  setStateChangeCallback(callback: (state: DashboardState) => void): void {
    this.onStateChange = callback;
  }

  initialize(): void {
    this.subscribeToAnalyticsEvents();
    this.notifyStateChange();
  }

  cleanup(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  setActiveTab(tab: 'feed' | 'analytics'): void {
    this.state.activeTab = tab;
    this.notifyStateChange();
  }

  private subscribeToAnalyticsEvents(): void {
    this.unsubscribe = this.eventBus.subscribe<AnalyticsReportEvent>(
      'ANALYTICS_REPORT',
      (event) => {
        this.state.analyticsCounter = event.payload.totalCount;
        this.state.date = event.payload.timestamp;
        this.notifyStateChange();
      }
    );
  }

  private notifyStateChange(): void {
    if (this.onStateChange) {
      this.onStateChange({ ...this.state });
    }
  }

  getState(): DashboardState {
    return { ...this.state };
  }
}
