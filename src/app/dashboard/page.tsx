'use client';

import { useState, useEffect } from 'react';
import { DashboardController } from '@/controllers/DashboardController';
import { AnalyticsController } from '@/controllers/AnalyticsController';
import { DashboardState } from '@/types';
import FeedTab from '@/components/FeedTab';
import AnalyticsTab from '@/components/AnalyticsTab';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const [state, setState] = useState<DashboardState>({
    activeTab: 'feed',
    analyticsCounter: 0,
    date: new Date(),
  });

  const [controller] = useState(() => new DashboardController());
  const [analyticsController] = useState(() => new AnalyticsController());

  useEffect(() => {
    controller.setStateChangeCallback(setState);
    controller.initialize();

    return () => {
      controller.cleanup();
      analyticsController.cleanup();
    };
  }, [controller, analyticsController]);

  const handleTabChange = (tab: 'feed' | 'analytics') => {
    controller.setActiveTab(tab);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-semibold text-gray-900">Pynea Dashboard</h1>
              
              <div className="flex items-center space-x-4">
                {/* Analytics Counter Badge */}
                {state.analyticsCounter > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Analytics Count:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {state.analyticsCounter}
                    </span>
                    <span className="text-sm text-gray-600">Last Updated:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {state.date instanceof Date ? state.date.toLocaleTimeString() : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => handleTabChange('feed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  state.activeTab === 'feed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Feed
              </button>
              <button
                onClick={() => handleTabChange('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  state.activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {state.activeTab === 'feed' ? (
            <FeedTab />
          ) : (
            <AnalyticsTab controller={analyticsController} />
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
