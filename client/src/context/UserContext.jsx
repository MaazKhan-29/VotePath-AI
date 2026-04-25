import { createContext, useContext, useState, useEffect } from 'react';
import { getHealth } from '../services/api';

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be inside UserProvider');
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checklist, setChecklist] = useState(null);
  const [aiStatus, setAiStatus] = useState({ ollama: false, gemini: false, activeProvider: null });
  const [loading, setLoading] = useState(false);

  // Check AI health on mount
  useEffect(() => {
    const checkAI = async () => {
      try {
        const { data } = await getHealth();
        if (data.success) setAiStatus(data.ai);
      } catch (e) {
        console.warn('Backend not available');
      }
    };
    checkAI();
    const interval = setInterval(checkAI, 30000);
    return () => clearInterval(interval);
  }, []);

  const loginUser = (userData, checklistData) => {
    setUser(userData);
    setChecklist(checklistData);
    localStorage.setItem('votepath_user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    setChecklist(null);
    localStorage.removeItem('votepath_user');
  };

  const updateReadinessScore = (score) => {
    if (user) setUser(prev => ({ ...prev, readinessScore: score }));
  };

  return (
    <UserContext.Provider value={{
      user, setUser, checklist, setChecklist,
      aiStatus, setAiStatus, loading, setLoading,
      loginUser, logoutUser, updateReadinessScore,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
