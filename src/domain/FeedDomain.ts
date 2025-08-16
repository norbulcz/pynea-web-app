import { NetworkManager } from '@/core/NetworkManager';
import { NetworkRequest, FeedItem, PostData } from '@/types';

export class FeedDomain {
  private static networkManager = NetworkManager.getInstance();

  static async fetchFeedData(
    onSuccess: (data: FeedItem[]) => void,
    onError: (error: string) => void
  ): Promise<void> {
    const request: NetworkRequest = {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET',
    };

    this.networkManager.request<PostData[]>(
      request,
      (response) => {
        const feedItems: FeedItem[] = response.data.map((item: PostData) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.body,
        }));
        onSuccess(feedItems);
      },
      (error) => {
        onError(error.message);
      }
    );
  }
}
