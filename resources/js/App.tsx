import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { LoadingFallback } from './components/ui/loading-fallback';
import { queryClient } from './lib/queryClient';
import '../css/app.css';

// Lazy load pages for code splitting
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Members = lazy(() => import('./pages/Members'));
const Leadership = lazy(() => import('./pages/Leadership'));
const SmallGroups = lazy(() => import('./pages/SmallGroups'));
const GroupDetail = lazy(() => import('./pages/GroupDetail'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Finance = lazy(() => import('./pages/Finance'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
const ActivityLog = lazy(() => import('./pages/ActivityLog'));
const Users = lazy(() => import('./pages/Users'));
const ArchiveManagement = lazy(() => import('./pages/ArchiveManagement'));

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/members" element={
          <ProtectedRoute>
            <Layout>
              <Members />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/leadership" element={
          <ProtectedRoute>
            <Layout>
              <Leadership />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/small-groups" element={
          <ProtectedRoute>
            <Layout>
              <SmallGroups />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/small-groups/:id" element={
          <ProtectedRoute>
            <Layout>
              <GroupDetail />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute>
            <Layout>
              <Events />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/events/:id" element={
          <ProtectedRoute>
            <Layout>
              <EventDetail />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/finance" element={
          <ProtectedRoute requiredRole="staff">
            <Layout>
              <Finance />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute requiredRole="staff">
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute requiredRole="admin">
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/activity-log" element={
          <ProtectedRoute requiredRole="admin">
            <Layout>
              <ActivityLog />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute requiredRole="admin">
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/archive-management" element={
          <ProtectedRoute requiredRole="admin">
            <Layout>
              <ArchiveManagement />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <Router>
                <AppRoutes />
              </Router>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
