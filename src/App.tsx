import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import DealRoom from './pages/DealRoom';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Navigation from './components/Navigation';

// Context
import { UserProvider } from './context/UserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'buyer' | 'seller' | null>(null);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route 
            path="/dashboard/*" 
            element={
              isAuthenticated ? (
                <>
                  <Navigation userType={userType} />
                  <Routes>
                    <Route 
                      path="buyer" 
                      element={<BuyerDashboard />} 
                    />
                    <Route 
                      path="seller" 
                      element={<SellerDashboard />} 
                    />
                    <Route 
                      path="profile" 
                      element={<Profile />} 
                    />
                    <Route 
                      path="settings" 
                      element={<Settings />} 
                    />
                    <Route 
                      path="deals/:dealId" 
                      element={<DealRoom />} 
                    />
                  </Routes>
                </>
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
