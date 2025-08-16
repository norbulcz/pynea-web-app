'use client';

import { useState, useEffect } from 'react';
import { AnalyticsController } from '@/controllers/AnalyticsController';
import { AnalyticsState, AnalyticsViewModel } from '@/types';

interface AnalyticsTabProps {
  controller?: AnalyticsController;
}

export default function AnalyticsTab({ controller }: AnalyticsTabProps) {
  const [state, setState] = useState<AnalyticsState>({
    data: null,
    isLoading: false,
    error: null,
  });

  const [localController] = useState(() => controller || new AnalyticsController());

  useEffect(() => {
    localController.setStateChangeCallback(setState);
    // Initialize analytics when this component mounts (tab is displayed)
    localController.initialize();

    return () => {
      // Cleanup when component unmounts (tab is hidden)
      localController.cleanup();
    };
  }, [localController]);

  if (state.isLoading && !state.data) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading analytics data...</span>
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
            <h3 className="text-sm font-medium text-red-800">Error loading analytics</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{state.error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Analytics</h2>
        <div className="flex items-center space-x-2">
          {state.isLoading && (
            <div className="flex items-center space-x-2" aria-live="polite">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" aria-hidden="true"></div>
              <span className="text-sm text-gray-500">Updating...</span>
            </div>
          )}
          <span className="text-sm text-gray-500">
            Auto-refresh every 5 seconds
          </span>
        </div>
      </header>

      {state.data && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Analytics Data
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Total count: {state.data.totalCount} items ({state.data.totalCount % 2 === 1 ? 'ODD' : 'EVEN'} length)
            </p>
          </div>

          {state.data.isCached ? (
            // Cached state (odd length)
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Data Cached</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Dataset with {state.data.totalCount} items has been cached in memory (odd length detected).
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Cached
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // Display data (even length)
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-900">User Data</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Displayed
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Dataset with {state.data.totalCount} items is being displayed (even length detected).
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {state.data.items.slice(0, 10).map((item: AnalyticsViewModel, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">
                            {item.displayText}
                          </h5>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          ID: {item.id}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {state.data.items.length > 10 && (
                    <div className="text-center py-2">
                      <span className="text-sm text-gray-500">
                        Showing first 10 of {state.data.items.length} items
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
