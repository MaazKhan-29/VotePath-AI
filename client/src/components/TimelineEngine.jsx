import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { getTimeline } from '../services/api';
import { FiCalendar, FiClock, FiAlertCircle } from 'react-icons/fi';

export default function TimelineEngine() {
  const { user } = useUser();
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getTimeline(user._id);
        if (data.success) setTimeline(data.data);
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    if (user) fetch();
  }, [user]);

  const getPriorityColor = (p) => {
    if (p === 'high') return 'text-accent';
    if (p === 'medium') return 'text-warning';
    return 'text-text-muted';
  };

  return (
    <div className="glass-card p-6">
      <h2 className="section-title">
        <FiCalendar className="text-primary" /> Voting Timeline
      </h2>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="loading-shimmer h-16 w-full" />)}
        </div>
      ) : (
        <>
          <div className="relative pl-8 space-y-4 max-h-80 overflow-y-auto pr-2">
            <div className="timeline-line" />
            {timeline?.events?.map((event, i) => (
              <motion.div key={event.id}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex gap-3">
                <div className={`timeline-dot ${event.completed ? 'completed' : i === 0 ? 'active' : ''}`}
                  style={{ marginLeft: '-20px' }} />
                <div className={`flex-1 p-3 rounded-xl ${
                  event.completed
                    ? 'bg-secondary/5 border border-secondary/20'
                    : 'bg-bg-elevated border border-border'
                }`}>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-semibold text-sm ${event.completed ? 'text-secondary line-through' : ''}`}>
                      {event.title}
                    </h3>
                    {event.priority === 'high' && !event.completed && (
                      <FiAlertCircle className="text-accent flex-shrink-0" size={14} />
                    )}
                  </div>
                  <p className="text-text-secondary text-xs mt-0.5">{event.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <FiClock size={10} className={getPriorityColor(event.priority)} />
                    <span className={`text-xs ${getPriorityColor(event.priority)}`}>
                      {event.deadline}
                    </span>
                    {event.daysFromNow > 0 && !event.completed && (
                      <span className="text-text-muted text-xs">
                        • {event.daysFromNow} days from now
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {timeline?.nextAction && (
            <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-primary-glow font-medium">
                ⏰ {timeline.nextAction}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
