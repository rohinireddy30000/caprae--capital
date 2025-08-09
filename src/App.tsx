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
            path="/dashboard/buyer" 
            element={
              isAuthenticated ? (
                <>
                  <Navigation userType={userType} />
                  <BuyerDashboard />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/dashboard/seller" 
            element={
              isAuthenticated ? (
                <>
                  <Navigation userType={userType} />
                  <SellerDashboard />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/dashboard/profile" 
            element={
              isAuthenticated ? (
                <>
                  <Navigation userType={userType} />
                  <Profile />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/dashboard/settings" 
            element={
              isAuthenticated ? (
                <>
                  <Navigation userType={userType} />
                  <Settings />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/dashboard/deals/:dealId" 
            element={
              isAuthenticated ? (
                <>
                  <Navigation userType={userType} />
                  <DealRoom />
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
