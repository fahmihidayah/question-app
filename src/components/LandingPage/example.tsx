// Example of how to use the LandingPage component in your application

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import LandingPage from './index';
import { getMeUser } from '@/utilities/getMeUser';

// This is an example component showing how to integrate the LandingPage
const LandingPageWithAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for error messages from middleware
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    
    if (error === 'unauthorized' && message) {
      setErrorMessage(message);
      // Clear error from URL after showing it
      setTimeout(() => {
        setErrorMessage(null);
        // Clear URL parameters
        window.history.replaceState({}, '', window.location.pathname);
      }, 5000);
    }

    // Check user authentication status
    const checkAuthStatus = async () => {
      try {
        const user = await getMeUser();
        if (user && user.user) {
          setIsAuthenticated(true);
          setUserName(user.user.name || user.user.email);
        }
      } catch (error) {
        console.log('User not authenticated');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [searchParams]);

  // No need for handleLogout - the Navbar handles it internally

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Error Message Banner */}
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 relative">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Access Denied</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-500 hover:text-red-700 text-xl font-bold "
              style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
              onTouchStart={() => {}}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <LandingPage 
        isAuthenticated={isAuthenticated}
        userName={userName}
      />
    </div>
  );
};

export default LandingPageWithAuth;