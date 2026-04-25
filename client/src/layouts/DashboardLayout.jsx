import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import {
  FiHome, FiMap, FiCheckSquare, FiCalendar, FiMessageCircle,
  FiMapPin, FiPlay, FiBookOpen, FiLogOut, FiMenu, FiX,
  FiCloud, FiWifiOff, FiGlobe
} from 'react-icons/fi';

const NAV_ITEMS = [
  { path: '/dashboard', icon: FiHome, label: 'Overview', end: true },
  { path: '/dashboard/journey', icon: FiMap, label: 'My Journey' },
  { path: '/dashboard/checklist', icon: FiCheckSquare, label: 'Checklist' },
  { path: '/dashboard/timeline', icon: FiCalendar, label: 'Timeline' },
  { path: '/dashboard/chat', icon: FiMessageCircle, label: 'AI Chat' },
  { path: '/dashboard/booth', icon: FiMapPin, label: 'Booth Guide' },
  { path: '/dashboard/eci-map', icon: FiGlobe, label: 'ECI Map' },
  { path: '/dashboard/parliament', icon: FiHome, label: 'Parliament', iconEmoji: '🏛️' },
  { path: '/dashboard/scenarios', icon: FiPlay, label: 'Scenarios' },
  { path: '/dashboard/quiz', icon: FiBookOpen, label: 'Learn & Quiz' },
];

export default function DashboardLayout() {
  const { user, aiStatus, logoutUser } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/auth');
  };

  const UserAvatar = ({ size = 'w-8 h-8', textSize = 'text-xs' }) => (
    user?.avatar ? (
      <img src={user.avatar} alt="" className={`${size} rounded-full object-cover`} referrerPolicy="no-referrer" />
    ) : (
      <div className={`${size} rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ${textSize} font-bold text-white`}>
        {user?.name?.charAt(0)?.toUpperCase()}
      </div>
    )
  );

  const getAIBadge = () => {
    if (aiStatus.activeProvider === 'gemini') {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <FiCloud size={12} className="text-violet-400" />
          <span className="text-xs font-semibold text-violet-400">Gemini AI</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <FiWifiOff size={12} className="text-red-400" />
        <span className="text-xs font-semibold text-red-400">Offline</span>
      </div>
    );
  };

  return (
    <div className="h-screen flex overflow-hidden bg-bg-dark">
      {/* ====== SIDEBAR (Desktop) ====== */}
      <aside className="hidden lg:flex flex-col w-64 bg-bg-card border-r border-border flex-shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-lg shadow-lg shadow-primary/20">
              🗳️
            </div>
            <div>
              <h1 className="text-base font-bold gradient-text leading-tight">VotePath AI</h1>
              <p className="text-[10px] text-text-muted leading-tight">Election Journey Assistant</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ path, icon: Icon, label, end, iconEmoji }) => (
            <NavLink key={path} to={path} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary/15 text-primary shadow-sm shadow-primary/10'
                    : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                }`
              }>
              {({ isActive }) => (
                <>
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive ? 'bg-primary/20' : 'bg-transparent group-hover:bg-bg-elevated'
                  }`}>
                    {iconEmoji ? <span className="text-sm">{iconEmoji}</span> : <Icon size={16} />}
                  </div>
                  <span>{label}</span>
                  {isActive && (
                    <motion.div layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-5 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-3">
          {getAIBadge()}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-bg-elevated">
            <UserAvatar />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{user?.name}</p>
              <p className="text-[10px] text-text-muted truncate">{user?.email || user?.state}</p>
            </div>
            <button onClick={handleLogout}
              className="p-1.5 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
              title="Logout">
              <FiLogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ====== MAIN CONTENT ====== */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Bar (Mobile + Desktop) */}
        <header className="sticky top-0 z-40 bg-bg-card/80 backdrop-blur-xl border-b border-border px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Mobile menu button */}
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors">
              <FiMenu size={20} />
            </button>

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2">
              <span className="text-lg">🗳️</span>
              <span className="text-sm font-bold gradient-text">VotePath AI</span>
            </div>

            {/* Desktop breadcrumb space */}
            <div className="hidden lg:block" />

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">{getAIBadge()}</div>
              <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-border">
                <UserAvatar size="w-7 h-7" textSize="text-[10px]" />
                <span className="text-sm text-text-secondary">
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ====== MOBILE SIDEBAR OVERLAY ====== */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed top-0 left-0 z-50 h-full w-72 bg-bg-card border-r border-border flex flex-col lg:hidden shadow-2xl"
            >
              {/* Close + Logo */}
              <div className="p-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-base shadow-lg shadow-primary/20">
                    🗳️
                  </div>
                  <div>
                    <h1 className="text-sm font-bold gradient-text">VotePath AI</h1>
                    <p className="text-[10px] text-text-muted">Election Journey Assistant</p>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg text-text-muted hover:bg-bg-elevated hover:text-text-primary">
                  <FiX size={18} />
                </button>
              </div>

              {/* Mobile Nav */}
              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map(({ path, icon: Icon, label, end, iconEmoji }) => (
                  <NavLink key={path} to={path} end={end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary/15 text-primary'
                          : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                      }`
                    }>
                    {iconEmoji ? <span className="text-lg">{iconEmoji}</span> : <Icon size={18} />}
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-border space-y-3">
                {getAIBadge()}
                <div className="flex items-center gap-3">
                  <UserAvatar />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-[10px] text-text-muted">{user?.state} • Age {user?.age}</p>
                  </div>
                  <button onClick={handleLogout}
                    className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10">
                    <FiLogOut size={14} />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
