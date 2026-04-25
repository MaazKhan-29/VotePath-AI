import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserProvider, useUser } from './context/UserContext';
import LandingPage from './pages/LandingPage';
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

function ProtectedRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      
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
