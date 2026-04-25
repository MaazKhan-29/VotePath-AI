import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { getScenarios, runScenario } from '../services/api';
import { FiPlay, FiArrowLeft, FiExternalLink, FiFileText, FiClock, FiPhone } from 'react-icons/fi';

export default function ScenarioSimulator() {
  const { user } = useUser();
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getScenarios();
        if (data.success) setScenarios(data.data);
      } catch (e) { console.error(e); }
    };
    fetch();
  }, []);

  const simulate = async (scenarioId) => {
    setSelectedScenario(scenarioId);
    setLoading(true);
    try {
      const { data } = await runScenario(user._id, scenarioId);
      if (data.success) setResult(data.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const reset = () => { setSelectedScenario(null); setResult(null); };

  return (
    <div className="glass-card p-6">
      <h2 className="section-title"><FiPlay className="text-primary" /> Scenario Simulator</h2>
      <p className="section-subtitle">Select a scenario to see step-by-step solutions</p>

      <AnimatePresence mode="wait">
        {!selectedScenario ? (
          /* Scenario Selection */
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {scenarios.map((s) => (
              <motion.button key={s.id} onClick={() => simulate(s.id)}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="p-3 rounded-xl bg-bg-elevated border border-border hover:border-primary/40 text-left transition-all">
                <span className="text-xl block mb-1">{s.icon}</span>
                <h3 className="text-xs font-semibold">{s.title}</h3>
                <p className="text-text-muted text-xs mt-0.5 line-clamp-2">{s.description}</p>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          /* Scenario Result */
          <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <button onClick={reset}
              className="text-text-secondary text-xs mb-3 hover:text-primary transition-colors flex items-center gap-1">
              <FiArrowLeft size={12} /> Back to scenarios
            </button>

            {loading ? (
              <div className="space-y-2">
                {[1,2,3].map(i => <div key={i} className="loading-shimmer h-12 w-full" />)}
              </div>
            ) : result && (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <h3 className="font-semibold text-sm">{result.title}</h3>
                  <p className="text-text-secondary text-xs mt-0.5">{result.description}</p>
                </div>

                {result.steps?.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 p-3 rounded-xl bg-bg-elevated border border-border">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{step.number}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{step.action}</h4>
                      <p className="text-text-secondary text-xs">{step.details}</p>
                      {step.link && (
                        <a href={step.link} target="_blank" rel="noreferrer"
                          className="text-primary text-xs flex items-center gap-1 mt-1 hover:underline">
                          <FiExternalLink size={10} /> Visit
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Documents + Timeline + Helpline */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {result.documentsNeeded?.length > 0 && (
                    <div className="p-2 rounded-lg bg-bg-elevated border border-border">
                      <p className="text-xs font-semibold flex items-center gap-1 mb-1">
                        <FiFileText size={10} /> Documents
                      </p>
                      {result.documentsNeeded.map((d, i) => (
                        <p key={i} className="text-text-muted text-xs">• {d}</p>
                      ))}
                    </div>
                  )}
                  {result.estimatedTime && (
                    <div className="p-2 rounded-lg bg-bg-elevated border border-border">
                      <p className="text-xs font-semibold flex items-center gap-1 mb-1">
                        <FiClock size={10} /> Time
                      </p>
                      <p className="text-text-muted text-xs">{result.estimatedTime}</p>
                    </div>
                  )}
                  {result.helplineNumber && (
                    <div className="p-2 rounded-lg bg-bg-elevated border border-border">
                      <p className="text-xs font-semibold flex items-center gap-1 mb-1">
                        <FiPhone size={10} /> Helpline
                      </p>
                      <p className="text-primary text-xs font-mono">{result.helplineNumber}</p>
                    </div>
                  )}
                </div>

                {result.nextAction && (
                  <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                    <p className="text-sm text-secondary font-medium">👉 {result.nextAction}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
