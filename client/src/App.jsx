import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserProvider, useUser } from './context/UserContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import SetupPage from './pages/SetupPage';
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import JourneyPage from './pages/JourneyPage';
import ChecklistPage from './pages/ChecklistPage';
import TimelinePage from './pages/TimelinePage';
import ChatPage from './pages/ChatPage';
import BoothPage from './pages/BoothPage';
import ScenarioPage from './pages/ScenarioPage';
import QuizPage from './pages/QuizPage';
import './index.css';

// Show loading while verifying auth token
function AuthLoading() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-4 text-xl shadow-xl shadow-primary/20 animate-pulse">
          🗳️
        </div>
        <p className="text-text-muted text-sm animate-pulse">Loading VotePath AI...</p>
      </div>
    </div>
  );
}

// Requires auth + completed profile
function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  if (loading) return <AuthLoading />;
  if (!user) return <Navigate to="/auth" replace />;
  if (!user.profileCompleted) return <Navigate to="/setup" replace />;
  return children;
}

// Requires auth only (for setup page)
function AuthRequired({ children }) {
  const { user, loading } = useUser();
  if (loading) return <AuthLoading />;
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

function AppRoutes() {
  const { user, loading } = useUser();

  if (loading) return <AuthLoading />;

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        user ? (
          user.profileCompleted ? <Navigate to="/dashboard" replace /> : <Navigate to="/setup" replace />
        ) : (
          <LandingPage />
        )
      } />
      <Route path="/auth" element={
        user ? (
          user.profileCompleted ? <Navigate to="/dashboard" replace /> : <Navigate to="/setup" replace />
        ) : (
          <AuthPage />
        )
      } />

      {/* Requires auth but profile may be incomplete */}
      <Route path="/setup" element={
        <AuthRequired>
          {user?.profileCompleted ? <Navigate to="/dashboard" replace /> : <SetupPage />}
        </AuthRequired>
      } />

      {/* Protected dashboard routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute><DashboardLayout /></ProtectedRoute>
      }>
        <Route index element={<OverviewPage />} />
        <Route path="journey" element={<JourneyPage />} />
        <Route path="checklist" element={<ChecklistPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="booth" element={<BoothPage />} />
        <Route path="scenarios" element={<ScenarioPage />} />
        <Route path="quiz" element={<QuizPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Use environment variable for Google Client ID, fallback for development

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1A2E',
              color: '#FFFFFF',
              border: '1px solid #252545',
              borderRadius: '12px',
              fontSize: '14px',
            },
            duration: 3000,
          }}
        />
      </Router>
    </UserProvider>
  );
}

export default App;
