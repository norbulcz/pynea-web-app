'use client';

import { useState, useEffect } from 'react';
import { FeedController } from '@/controllers/FeedController';
import { FeedState, FeedItem } from '@/types';

export default function FeedTab() {
  const [state, setState] = useState<FeedState>({
    items: [],
    isLoading: false,
    error: null,
  });

  const [controller] = useState(() => new FeedController());

  useEffect(() => {
    controller.setStateChangeCallback(setState);
    controller.loadFeedData();
  }, [controller]);

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading feed data...</span>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <section className="bg-red-50 border border-red-200 rounded-md p-4" role="alert">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading feed</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{state.error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => controller.loadFeedData()}
                className="bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No feed items</h3>
        <p className="mt-1 text-sm text-gray-500">No feed data available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-medium text-gray-900">Feed</h2>
      </header>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200" role="list">
          {state.items.map((item: FeedItem) => (
            <li key={item.id} role="listitem">
              <article className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ID: {item.id}
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
