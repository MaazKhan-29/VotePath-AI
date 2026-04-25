import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { initUser } from '../services/api';
import toast from 'react-hot-toast';
import {
  FiArrowRight, FiUser, FiMapPin, FiCheckCircle, FiShield,
  FiZap, FiCpu, FiArrowLeft, FiChevronRight
} from 'react-icons/fi';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
  'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
  'Chandigarh','Puducherry','Andaman & Nicobar','Dadra & Nagar Haveli','Lakshadweep',
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '', age: '', state: '', voterStatus: 'unknown',
    hasVoterId: false, isFirstTimeVoter: false, pincode: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.state) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (parseInt(formData.age) < 17) {
      toast.error('You must be at least 17 years old.');
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await initUser({
        ...formData,
        age: parseInt(formData.age),
        isFirstTimeVoter: formData.isFirstTimeVoter || parseInt(formData.age) <= 21,
      });
      if (data.success) {
        loginUser(data.data.user, data.data.checklist);
        toast.success('Welcome to VotePath AI! 🗳️');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to connect. Is the backend running?');
    } finally {
      setSubmitting(false);
    }
  };

  const features = [
    { icon: <FiZap />, title: 'Personalized Journey', desc: 'AI creates YOUR unique voting roadmap', gradient: 'from-violet-500 to-indigo-500' },
    { icon: <FiCheckCircle />, title: 'Smart Checklist', desc: 'Track every step to election day', gradient: 'from-emerald-500 to-teal-500' },
    { icon: <FiCpu />, title: 'Hybrid AI', desc: 'Local Ollama + Cloud Gemini fallback', gradient: 'from-blue-500 to-cyan-500' },
    { icon: <FiShield />, title: 'Neutral & Official', desc: 'Based on ECI processes, zero politics', gradient: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[120px]" />
        <div className="absolute inset-0 bg-grid" />
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
            <span className="text-xs text-text-muted hidden sm:inline">Powered by Hybrid AI</span>
            <button onClick={() => setStep(1)}
              className="btn-primary text-xs px-4 py-2">
              Get Started <FiChevronRight className="inline ml-0.5" size={14} />
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            /* ======= HERO SECTION ======= */
            <motion.div key="hero"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              className="max-w-4xl w-full text-center">

              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AI-Powered Election Assistant
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
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
                <motion.button onClick={() => setStep(1)}
                  className="btn-primary text-base px-8 py-3.5 shadow-xl shadow-primary/20"
                  whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(108, 99, 255, 0.3)' }}
                  whileTap={{ scale: 0.97 }}>
                  Start My Journey <FiArrowRight className="inline ml-2" />
                </motion.button>
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

              {/* Trust bar */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                className="mt-12 flex items-center justify-center gap-6 text-text-muted text-xs">
                <span>🇮🇳 Made for India</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>🔒 Non-Political</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>📋 ECI-Based</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>🤖 AI-Powered</span>
              </motion.div>
            </motion.div>
          ) : (
            /* ======= USER INPUT FORM ======= */
            <motion.div key="form"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}
              className="w-full max-w-lg">

              <button onClick={() => setStep(0)}
                className="flex items-center gap-1.5 text-text-secondary text-sm mb-5 hover:text-primary transition-colors group">
                <FiArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to home
              </button>

              <div className="glass-card p-8 relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary" />

                <div className="text-center mb-7">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-3 text-xl shadow-xl shadow-primary/20">
                    👤
                  </div>
                  <h2 className="text-xl font-bold gradient-text">Tell Us About You</h2>
                  <p className="text-text-muted text-xs mt-1">We'll create your personalized voting journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5 font-medium">
                      <FiUser className="inline mr-1" size={12} /> Full Name <span className="text-accent">*</span>
                    </label>
                    <input type="text" className="input-field" placeholder="Enter your full name"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-text-secondary mb-1.5 font-medium">
                        Age <span className="text-accent">*</span>
                      </label>
                      <input type="number" className="input-field" placeholder="e.g. 19" min="17" max="120"
                        value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1.5 font-medium">
                        <FiMapPin className="inline mr-1" size={12} /> Pincode
                      </label>
                      <input type="text" className="input-field" placeholder="e.g. 400001"
                        value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5 font-medium">
                      State / UT <span className="text-accent">*</span>
                    </label>
                    <select className="input-field"
                      value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
                      <option value="">Select your state</option>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5 font-medium">
                      Voter Registration Status
                    </label>
                    <select className="input-field"
                      value={formData.voterStatus} onChange={e => setFormData({...formData, voterStatus: e.target.value})}>
                      <option value="unknown">I don't know</option>
                      <option value="not_registered">Not registered</option>
                      <option value="applied">Applied, waiting for approval</option>
                      <option value="registered">Already registered ✓</option>
                    </select>
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 accent-primary rounded"
                        checked={formData.hasVoterId}
                        onChange={e => setFormData({...formData, hasVoterId: e.target.checked})} />
                      <span className="text-text-secondary text-xs group-hover:text-text-primary transition-colors">
                        I have a Voter ID (EPIC) card
                      </span>
                    </label>
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 accent-primary rounded"
                        checked={formData.isFirstTimeVoter}
                        onChange={e => setFormData({...formData, isFirstTimeVoter: e.target.checked})} />
                      <span className="text-text-secondary text-xs group-hover:text-text-primary transition-colors">
                        This will be my first time voting
                      </span>
                    </label>
                  </div>

                  <motion.button type="submit"
                    className="btn-primary w-full py-3.5 mt-3 shadow-lg shadow-primary/20"
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    disabled={submitting}>
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Your Journey...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Begin My VotePath Journey <FiArrowRight size={16} />
                      </span>
                    )}
                  </motion.button>

                  <p className="text-center text-[10px] text-text-muted mt-3">
                    Your data is stored locally and never shared. Non-political. Educational only.
                  </p>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
