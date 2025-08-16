import { DomainEvent } from '@/types';

type EventHandler<T extends DomainEvent> = (event: T) => void;

export class EventBus {
  private static instance: EventBus;
  private handlers: Map<string, EventHandler<any>[]> = new Map();

  private constructor() {}

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  subscribe<T extends DomainEvent>(
    eventType: T['type'],
    handler: EventHandler<T>
  ): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }

    const handlers = this.handlers.get(eventType)!;
    handlers.push(handler);

    // Return unsubscribe function
    return () => {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    };
  }

  publish<T extends DomainEvent>(event: T): void {
    const handlers = this.handlers.get(event.type);
    if (handlers) {
      handlers.forEach(handler => handler(event));
    }
  }

  clear(): void {
    this.handlers.clear();
  }
}
