'use client';

import { useState, useEffect } from 'react';
import { WelcomeController } from '@/controllers/WelcomeController';
import { WelcomeState } from '@/types';

interface WelcomePageProps {
  onNavigate: (path: string) => void;
}

export default function WelcomePage({ onNavigate }: WelcomePageProps) {
  const [state, setState] = useState<WelcomeState>({
    accessCode: '',
    error: null,
    isLoading: false,
  });

  const [controller] = useState(() => new WelcomeController());

  useEffect(() => {
    controller.setStateChangeCallback(setState);
    controller.setNavigateCallback(onNavigate);
  }, [controller, onNavigate]);

  const handleAccessCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    controller.updateAccessCode(e.target.value);
  };

  const handleContinue = () => {
    controller.validateAccessCode();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Pynea</h1>
          <p className="text-gray-600">Please enter your access code to continue</p>
        </header>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
          <fieldset>
            <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-2">
              Access Code
            </label>
            <input
              id="accessCode"
              type="text"
              value={state.accessCode}
              onChange={handleAccessCodeChange}
              placeholder="Enter access code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={state.isLoading}
              required
              aria-describedby={state.error ? "error-message" : undefined}
            />
          </fieldset>

          {state.error && (
            <div id="error-message" role="alert" className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={state.isLoading || !state.accessCode.trim()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Validating...
              </div>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
