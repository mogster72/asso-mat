import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import UpdatePassword from './pages/auth/UpdatePassword';
import AcceptInvitation from './pages/auth/AcceptInvitation';
import Dashboard from './pages/dashboard/Dashboard';
import Members from './pages/members/Members';
import Events from './pages/events/Events';
import ActivePolls from './pages/polls/ActivePolls';
import CompletedPolls from './pages/polls/CompletedPolls';
import Meetings from './pages/meetings/Meetings';
import Settings from './pages/settings/Settings';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/accept-invitation" element={<AcceptInvitation />} />
            
            <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="members" element={<Members />} />
              <Route path="events" element={<Events />} />
              <Route path="polls" element={<ActivePolls />} />
              <Route path="polls/completed" element={<CompletedPolls />} />
              <Route path="meetings" element={<Meetings />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;