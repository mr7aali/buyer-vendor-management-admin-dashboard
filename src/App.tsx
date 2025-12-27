import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
// Auth Pages
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OTPVerificationPage } from './pages/OTPVerificationPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ResetSuccessPage } from './pages/ResetSuccessPage';
// Main Pages
import { DashboardPage } from './pages/DashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { BuyersPage } from './pages/BuyersPage';
import { VendorsPage } from './pages/VendorsPage';
import { MessagesPage } from './pages/MessagesPage';
import { OrdersPage } from './pages/OrdersPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotificationsPage } from './pages/NotificationsPage';

// New Feature Pages
import { VerificationPage } from './pages/VerificationPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { ChatsPage } from './pages/ChatsPage';
import { PermissionsPage } from './pages/PermissionsPage';
import { AccountPage } from './pages/AccountPage';
// Detail Pages
import { UserDetailPage } from './pages/UserDetailPage';
import { VendorDetailPage } from './pages/VendorDetailPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { TransactionDetailPage } from './pages/TransactionDetailPage';
export function App() {
  return <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-success" element={<ResetSuccessPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute>
          <AnalyticsPage />
        </ProtectedRoute>} />

        {/* Buyers & Users */}
        <Route path="/buyers" element={<ProtectedRoute>
          <BuyersPage />
        </ProtectedRoute>} />
        <Route path="/buyers/:id" element={<ProtectedRoute>
          <UserDetailPage />
        </ProtectedRoute>} />

        {/* Vendors */}
        <Route path="/vendors" element={<ProtectedRoute>
          <VendorsPage />
        </ProtectedRoute>} />
        <Route path="/vendors/:id" element={<ProtectedRoute>
          <VendorDetailPage />
        </ProtectedRoute>} />

        {/* Orders */}
        <Route path="/orders" element={<ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute>
          <OrderDetailPage />
        </ProtectedRoute>} />

        {/* Transactions & Payments */}
        <Route path="/transactions" element={<ProtectedRoute>
          <TransactionsPage />
        </ProtectedRoute>} />
        <Route path="/transactions/:id" element={<ProtectedRoute>
          <TransactionDetailPage />
        </ProtectedRoute>} />


        {/* Verification & KYC */}
        <Route path="/verification" element={<ProtectedRoute>
          <VerificationPage />
        </ProtectedRoute>} />

        {/* Communication */}
        <Route path="/chats" element={<ProtectedRoute>
          <ChatsPage />
        </ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute>
          <MessagesPage />
        </ProtectedRoute>} />


        {/* Products & Offers */}


        {/* Admin & Settings */}
        <Route path="/notifications" element={<ProtectedRoute>
          <NotificationsPage />
        </ProtectedRoute>} />

        <Route path="/permissions" element={<ProtectedRoute>
          <PermissionsPage />
        </ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute>
          <AccountPage />
        </ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>;
}