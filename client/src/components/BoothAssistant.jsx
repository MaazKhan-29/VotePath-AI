import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { getBoothGuide } from '../services/api';
import { FiMapPin, FiSearch, FiCheckCircle, FiAlertTriangle, FiExternalLink } from 'react-icons/fi';

export default function BoothAssistant() {
  const { user } = useUser();
  const [pincode, setPincode] = useState(user?.pincode || '');
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGuide = async () => {
    if (!pincode.trim()) return;
    setLoading(true);
    try {
      const { data } = await getBoothGuide(user._id, pincode);
      if (data.success) setGuide(data.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="glass-card p-6">
      <h2 className="section-title"><FiMapPin className="text-primary" /> Booth Assistant</h2>
      <p className="section-subtitle">Enter your pincode to get complete booth guidance</p>

      <div className="flex gap-2 mb-4">
        <input type="text" className="input-field flex-1" placeholder="Enter pincode (e.g. 400001)"
          value={pincode} onChange={e => setPincode(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchGuide()} />
        <motion.button onClick={fetchGuide} disabled={loading}
          whileTap={{ scale: 0.95 }} className="btn-primary px-4">
          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <FiSearch size={16} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {guide && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-4 max-h-72 overflow-y-auto pr-2">

            {/* How to find */}
            <div className="p-3 rounded-xl bg-bg-elevated border border-border">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <FiSearch size={14} className="text-primary" /> How to Find Your Booth
              </h3>
              <ol className="space-y-1">
                {guide.howToFind?.steps?.map((s, i) => (
                  <li key={i} className="text-xs text-text-secondary flex gap-2">
                    <span className="text-primary font-bold">{i + 1}.</span> {s}
                  </li>
                ))}
              </ol>
              {guide.howToFind?.officialLink && (
                <a href={guide.howToFind.officialLink} target="_blank" rel="noreferrer"
                  className="text-xs text-primary flex items-center gap-1 mt-2 hover:underline">
                  <FiExternalLink size={10} /> Electoral Search Portal
                </a>
              )}
            </div>

            {/* What to carry */}
            <div className="p-3 rounded-xl bg-bg-elevated border border-border">
              <h3 className="text-sm font-semibold mb-2">📋 What to Carry</h3>
              <div className="flex flex-wrap gap-1.5">
                {guide.whatToCarry?.map((item, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* DOs and DONTs */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-secondary/5 border border-secondary/20">
                <h4 className="text-xs font-semibold text-secondary mb-1.5">✅ DOs</h4>
                {guide.dos?.map((d, i) => (
                  <p key={i} className="text-xs text-text-secondary mb-0.5">• {d}</p>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-accent/5 border border-accent/20">
                <h4 className="text-xs font-semibold text-accent mb-1.5">❌ DON'Ts</h4>
                {guide.donts?.map((d, i) => (
                  <p key={i} className="text-xs text-text-secondary mb-0.5">• {d}</p>
                ))}
              </div>
            </div>

            {/* Timing */}
            {guide.timing && (
              <p className="text-xs text-text-secondary text-center">🕐 Booth Timing: {guide.timing}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
