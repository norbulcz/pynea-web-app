export class GlobalCache {
  private static instance: GlobalCache;
  private cache: Map<string, unknown> = new Map();

  private constructor() {}

  static getInstance(): GlobalCache {
    if (!GlobalCache.instance) {
      GlobalCache.instance = new GlobalCache();
    }
    return GlobalCache.instance;
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key) as T | undefined;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}
