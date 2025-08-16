import { FeedDomain } from '@/domain/FeedDomain';
import { FeedState, FeedItem } from '@/types';

export class FeedController {
  private state: FeedState = {
    items: [],
    isLoading: false,
    error: null,
  };

  private onStateChange: ((state: FeedState) => void) | null = null;

  setStateChangeCallback(callback: (state: FeedState) => void): void {
    this.onStateChange = callback;
  }

  loadFeedData(): void {
    this.state.isLoading = true;
    this.state.error = null;
    this.notifyStateChange();

    FeedDomain.fetchFeedData(
      (data: FeedItem[]) => {
        this.state.items = data;
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

  private notifyStateChange(): void {
    if (this.onStateChange) {
      this.onStateChange({ ...this.state });
    }
  }

  getState(): FeedState {
    return { ...this.state };
  }
}
