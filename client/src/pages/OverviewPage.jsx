import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { getChecklist, getJourney } from '../services/api';
import {
  FiMap, FiCheckSquare, FiCalendar, FiMessageCircle,
  FiMapPin, FiPlay, FiBookOpen, FiArrowRight, FiTrendingUp, FiGlobe
} from 'react-icons/fi';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function OverviewPage() {
  const { user } = useUser();
  const [score, setScore] = useState(0);
  const [checklistProgress, setChecklistProgress] = useState({ completed: 0, total: 0 });
  const [journeySteps, setJourneySteps] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, jRes] = await Promise.allSettled([
          getChecklist(user._id),
          getJourney(user._id),
        ]);
        if (cRes.status === 'fulfilled' && cRes.value.data.success) {
          const p = cRes.value.data.data.progress;
          setScore(p.percentage);
          setChecklistProgress({ completed: p.completed, total: p.total });
        }
        if (jRes.status === 'fulfilled' && jRes.value.data.success) {
          setJourneySteps(jRes.value.data.data.steps?.length || 0);
        }
      } catch (e) { console.error(e); }
    };
    if (user) load();
  }, [user]);

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const scoreColor = score >= 80 ? '#00D9A6' : score >= 50 ? '#FFB347' : '#FF6B6B';

  const quickLinks = [
    { to: '/dashboard/journey', icon: FiMap, label: 'My Journey', desc: 'View your personalized voting roadmap', color: 'from-violet-600 to-indigo-600' },
    { to: '/dashboard/checklist', icon: FiCheckSquare, label: 'Checklist', desc: `${checklistProgress.completed}/${checklistProgress.total} tasks completed`, color: 'from-emerald-600 to-teal-600' },
    { to: '/dashboard/timeline', icon: FiCalendar, label: 'Timeline', desc: 'View important election deadlines', color: 'from-amber-600 to-orange-600' },
    { to: '/dashboard/chat', icon: FiMessageCircle, label: 'AI Chat', desc: 'Ask anything about voting', color: 'from-blue-600 to-cyan-600' },
    { to: '/dashboard/booth', icon: FiMapPin, label: 'Booth Guide', desc: 'Find your polling station', color: 'from-rose-600 to-pink-600' },
    { to: '/dashboard/eci-map', icon: FiGlobe, label: 'ECI Map', desc: 'Explore state-wise election data', color: 'from-orange-600 to-red-600' },
    { to: '/dashboard/parliament', icon: FiMap, label: 'Parliament', desc: 'Lok Sabha & Rajya Sabha info', color: 'from-indigo-600 to-violet-600', emoji: '🏛️' },
    { to: '/dashboard/scenarios', icon: FiPlay, label: 'Scenarios', desc: 'Simulate voter situations', color: 'from-purple-600 to-fuchsia-600' },
    { to: '/dashboard/quiz', icon: FiBookOpen, label: 'Learn & Quiz', desc: 'Test election knowledge', color: 'from-sky-600 to-blue-600' },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome Banner */}
      <motion.div variants={item}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-bg-card to-secondary/10 border border-border p-6 lg:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
        
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-1">
            <p className="text-text-muted text-sm mb-1">Welcome back,</p>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              {user?.name} <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="text-text-secondary text-sm max-w-md">
              {user?.isFirstTimeVoter
                ? "Exciting! Your first election is a big milestone. Let's make sure you're fully prepared."
                : "Let's continue your voting preparation journey. Every step counts!"}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs px-3 py-1 rounded-full bg-bg-elevated border border-border text-text-secondary">
                📍 {user?.state}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-bg-elevated border border-border text-text-secondary">
                🎂 Age {user?.age}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-bg-elevated border border-border text-text-secondary">
                {user?.voterStatus === 'registered' ? '✅ Registered' :
                 user?.voterStatus === 'applied' ? '⏳ Applied' :
                 user?.voterStatus === 'not_registered' ? '❌ Not Registered' : '❓ Unknown'}
              </span>
              {user?.isFirstTimeVoter && (
                <span className="text-xs px-3 py-1 rounded-full bg-primary/15 border border-primary/20 text-primary">
                  🌟 First-Time Voter
                </span>
              )}
            </div>
          </div>

          {/* Score Ring */}
          <div className="flex flex-col items-center">
            <div className="progress-ring-container">
              <svg width="136" height="136" viewBox="0 0 136 136">
                <circle cx="68" cy="68" r={radius} fill="none" className="progress-ring-bg" strokeWidth="7" />
                <motion.circle cx="68" cy="68" r={radius} fill="none"
                  stroke={scoreColor} strokeWidth="7" strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                  className="progress-ring-fill" />
              </svg>
              <div className="absolute text-center">
                <motion.span className="text-2xl font-bold" style={{ color: scoreColor }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                  {score}%
                </motion.span>
                <p className="text-text-muted text-[10px]">Readiness</p>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-2 flex items-center gap-1">
              <FiTrendingUp size={12} className="text-primary" /> Voting Readiness
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Access Grid */}
      <motion.div variants={item}>
        <h2 className="text-lg font-semibold mb-4 text-text-primary">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {quickLinks.map(({ to, icon: Icon, label, desc, color, emoji }) => (
            <Link key={to} to={to}>
              <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }}
                className="glass-card p-4 group cursor-pointer h-full">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  {emoji ? <span className="text-lg">{emoji}</span> : <Icon size={18} className="text-white" />}
                </div>
                <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {label}
                </h3>
                <p className="text-xs text-text-muted mt-1">{desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <FiArrowRight size={12} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Status Summary Cards */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-card-static p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-xs">Journey Steps</p>
              <p className="text-2xl font-bold text-primary mt-1">{journeySteps}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FiMap className="text-primary" size={18} />
            </div>
          </div>
        </div>
        <div className="glass-card-static p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-xs">Tasks Done</p>
              <p className="text-2xl font-bold text-secondary mt-1">
                {checklistProgress.completed}<span className="text-text-muted text-sm">/{checklistProgress.total}</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <FiCheckSquare className="text-secondary" size={18} />
            </div>
          </div>
        </div>
        <div className="glass-card-static p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-xs">Voter Status</p>
              <p className="text-sm font-semibold text-text-primary mt-1 capitalize">
                {user?.voterStatus?.replace('_', ' ') || 'Unknown'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <span className="text-lg">🗳️</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
