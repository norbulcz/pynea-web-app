import { NetworkManager } from '@/core/NetworkManager';
import { GlobalCache } from '@/core/GlobalCache';
import { EventBus } from '@/core/EventBus';
import { NetworkRequest, AnalyticsData, AnalyticsReportEvent, UserData, AnalyticsViewModel } from '@/types';

export class AnalyticsDomain {
  private static networkManager = NetworkManager.getInstance();
  private static globalCache = GlobalCache.getInstance();
  private static eventBus = EventBus.getInstance();

  static async fetchAnalyticsData(
    onSuccess: (data: AnalyticsData) => void,
    onError: (error: string) => void
  ): Promise<void> {
    const request: NetworkRequest = {
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'GET',
    };

    this.networkManager.request(
      request,
      (response) => {
        const items: UserData[] = response.data;
        // const testItems = items.slice(0, items.length - 1);
        const totalCount = items.length;
        
        
        // Create ready-to-render view model
        const viewModel = this.createViewModel(items);
        
        // Odd/Even Cache Rule
        if (totalCount % 2 === 1) {
          // Odd length - cache the data
          this.globalCache.set('analytics_data', viewModel);
          const analyticsData: AnalyticsData = {
            items: [],
            totalCount,
            isCached: true,
          };
          onSuccess(analyticsData);
        } else {
          // Even length - return the view model
          const analyticsData: AnalyticsData = {
            items: viewModel,
            totalCount,
            isCached: false,
          };
          onSuccess(analyticsData);
        }

        // Publish AnalyticsReportEvent
        const event: AnalyticsReportEvent = {
          type: 'ANALYTICS_REPORT',
          payload: {
            totalCount,
            timestamp: new Date(),
          },
        };
        this.eventBus.publish(event);
      },
      (error) => {
        onError(error.message);
      }
    );
  }

  private static createViewModel(items: UserData[]): AnalyticsViewModel[] {
    // Create a ready-to-render view model with simple transformation
    return items.map(item => ({
      id: item.id,
      name: item.name,
      email: item.email,
      displayText: `${item.name} (${item.email})`
    }));
  }

  static getCachedData(): AnalyticsViewModel[] | undefined {
    return this.globalCache.get('analytics_data');
  }

  static clearCache(): void {
    this.globalCache.delete('analytics_data');
  }
}
