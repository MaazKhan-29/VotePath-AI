import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import Background3D from '../components/Background3D';
import {
  FiLogOut, FiMenu, FiX, FiSun, FiMoon, FiUser
} from 'react-icons/fi';

const NAV_ITEMS = [
  { path: '/dashboard', iconEmoji: '📊', label: 'Overview', end: true },
  { path: '/dashboard/timeline', iconEmoji: '📅', label: 'Timeline' },
  { path: '/dashboard/chat', iconEmoji: '🤖', label: 'AI Chat' },
  { path: '/dashboard/booth', iconEmoji: '📍', label: 'Booth' },
  { path: '/dashboard/eci-map', iconEmoji: '🌐', label: 'ECI Map' },
  { path: '/dashboard/parliament', iconEmoji: '🏛️', label: 'Parliament' },
  { path: '/dashboard/scenarios', iconEmoji: '🎭', label: 'Scenarios' },
  { path: '/dashboard/quiz', iconEmoji: '🧠', label: 'Quiz' },
];

export default function DashboardLayout() {
  const { user, aiStatus, logoutUser } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = () => {
    logoutUser();
    navigate('/auth');
  };

  const UserAvatar = ({ size = 'w-8 h-8', textSize = 'text-xs' }) => (
    user?.avatar ? (
      <img src={user.avatar} alt="" className={`${size} rounded-full object-cover shadow-sm`} referrerPolicy="no-referrer" />
    ) : (
      <div className={`${size} rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center ${textSize} font-bold text-white shadow-sm`}>
        {user?.name?.charAt(0)?.toUpperCase()}
      </div>
    )
  );


  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-dark transition-colors duration-500">
      <Background3D isDarkMode={isDarkMode} />
      {/* ====== TOP HORIZONTAL NAVBAR ====== */}
      <header className="sticky top-0 z-40 bg-bg-card/80 backdrop-blur-xl border-b border-border shadow-sm px-4 lg:px-6 flex-shrink-0 transition-colors duration-500">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-lg shadow-md shadow-primary/20 text-white">
              🗳️
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-primary leading-tight">VotePath AI</h1>
              <p className="text-[10px] text-text-muted leading-tight font-medium uppercase tracking-wider">Election Commission</p>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex flex-1 justify-center items-center px-8 space-x-1">
            {NAV_ITEMS.map(({ path, iconEmoji, label, end }) => (
              <NavLink key={path} to={path} end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-bg-elevated'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50'
                  }`
                }>
                {({ isActive }) => (
                  <>
                    <span className="text-lg">{iconEmoji}</span>
                    <span className={isActive ? 'text-text-primary font-semibold' : ''}>{label}</span>
                    {isActive && (
                      <motion.div layoutId="topNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-t-full bg-primary"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: Theme Toggle, User Profile & Hamburger */}
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-text-muted hover:bg-bg-elevated hover:text-accent transition-colors" title="Toggle Theme">
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <div className="hidden md:flex items-center gap-3 pl-2 border-l border-border ml-1">
              <div className="text-right">
                <p className="text-sm font-semibold text-text-primary leading-none">{user?.name}</p>
                <p className="text-[10px] text-text-muted mt-1">{user?.state}</p>
              </div>
              <NavLink to="/dashboard/profile" className="hover:opacity-80 transition-opacity" title="My Profile">
                <UserAvatar />
              </NavLink>
              <button onClick={handleLogout}
                className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                title="Logout">
                <FiLogOut size={16} />
              </button>
            </div>
            {/* Hamburger — RIGHT side on mobile */}
            <button onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors">
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ====== MAIN CONTENT ====== */}
      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto h-full">
          <Outlet />
        </div>
      </main>

      {/* ====== MOBILE SIDEBAR OVERLAY ====== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed top-0 left-0 z-50 h-full w-72 bg-bg-card border-r border-border flex flex-col lg:hidden shadow-2xl"
            >
              <div className="p-5 border-b border-border flex items-center justify-between bg-bg-elevated/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-base shadow-md text-white">
                    🗳️
                  </div>
                  <div>
                    <h1 className="text-sm font-bold text-primary">VotePath AI</h1>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Election Commission</p>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-text-muted hover:bg-bg-elevated hover:text-text-primary">
                  <FiX size={18} />
                </button>
              </div>

              {/* Profile Card — below title */}
              <NavLink to="/dashboard/profile" onClick={() => setMobileMenuOpen(false)}
                className="mx-3 mt-3 flex items-center gap-3 bg-bg-elevated p-3 rounded-xl border border-border hover:border-primary/20 transition-all">
                <UserAvatar />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-text-primary">{user?.name}</p>
                  <p className="text-[10px] text-text-muted truncate">{user?.state} • Age {user?.age}</p>
                </div>
                <FiUser size={14} className="text-text-muted flex-shrink-0" />
              </NavLink>

              <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map(({ path, iconEmoji, label, end }) => (
                  <NavLink key={path} to={path} end={end}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-bg-elevated font-semibold text-text-primary'
                          : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                      }`
                    }>
                    <span className="text-xl">{iconEmoji}</span>
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="p-4 border-t border-border flex items-center justify-between bg-bg-elevated/50">
                <button onClick={toggleTheme} className="p-2 rounded-lg text-text-muted hover:bg-bg-card hover:text-accent border border-border" title="Toggle Theme">
                  {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                </button>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-accent hover:bg-accent/10 font-medium transition-colors">
                  <FiLogOut size={16} /> Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
