import { motion } from 'framer-motion';
import QuizSection from '../components/QuizSection';
import { FiBookOpen } from 'react-icons/fi';

export default function QuizPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center shadow-lg">
            <FiBookOpen size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Learn & Quiz</h1>
            <p className="text-xs text-text-muted">Test your knowledge about India's electoral process</p>
          </div>
        </div>
      </div>
      <QuizSection />
    </motion.div>
  );
}
