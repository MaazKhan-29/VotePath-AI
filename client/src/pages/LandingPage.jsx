import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiCheckCircle, FiShield, FiZap, FiCpu, FiChevronRight, FiLock
} from 'react-icons/fi';

export default function LandingPage() {
  const features = [
    { icon: <FiZap />, title: 'Personalized Journey', desc: 'AI creates YOUR unique voting roadmap', gradient: 'from-violet-500 to-indigo-500' },
    { icon: <FiCheckCircle />, title: 'Smart Checklist', desc: 'Track every step to election day', gradient: 'from-emerald-500 to-teal-500' },
    { icon: <FiCpu />, title: 'Gemini AI', desc: 'Powered by Google Gemini for smart answers', gradient: 'from-blue-500 to-cyan-500' },
    { icon: <FiShield />, title: 'Neutral & Official', desc: 'Based on ECI processes, zero politics', gradient: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm shadow-lg shadow-primary/20">
              🗳️
            </div>
            <div>
              <span className="text-base font-bold gradient-text">VotePath AI</span>
              <span className="hidden sm:inline text-xs text-text-muted ml-2">Election Journey Assistant</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="text-sm text-text-secondary hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link to="/auth" className="btn-primary text-xs px-4 py-2">
              Get Started <FiChevronRight className="inline ml-0.5" size={14} />
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-4xl w-full text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI-Powered Election Assistant
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            Your{' '}
            <span className="relative">
              <span className="gradient-text">Personalized</span>
              <motion.div className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }} style={{ transformOrigin: 'left' }} />
            </span>
            <br />
            Election Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Not just information —{' '}
            <span className="text-text-primary font-semibold">actionable, step-by-step guidance</span>{' '}
            based on YOUR situation. Powered by AI, grounded in official ECI processes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/auth">
              <motion.button
                className="btn-primary text-base px-8 py-3.5 shadow-xl shadow-primary/20"
                whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(108, 99, 255, 0.3)' }}
                whileTap={{ scale: 0.97 }}>
                Start My Journey <FiArrowRight className="inline ml-2" />
              </motion.button>
            </Link>
            <a href="https://voters.eci.gov.in/" target="_blank" rel="noreferrer"
              className="btn-secondary text-sm px-6 py-3">
              Visit ECI Portal ↗
            </a>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-16">
            {features.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="glass-card p-5 text-center group hover:border-primary/30 transition-all">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mx-auto mb-3 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Auth badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="mt-10 flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs px-3 py-1.5 rounded-full bg-bg-elevated border border-border text-text-muted flex items-center gap-1.5">
              <FiLock size={10} className="text-secondary" /> Secure Login
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-bg-elevated border border-border text-text-muted flex items-center gap-1.5">
              <svg className="w-3 h-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Sign-In
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-bg-elevated border border-border text-text-muted">
              ✉️ Email & Password
            </span>
          </motion.div>

          {/* Trust bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="mt-6 flex items-center justify-center gap-6 text-text-muted text-xs">
            <span>🇮🇳 Made for India</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>🔒 Non-Political</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>📋 ECI-Based</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>🤖 AI-Powered</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
