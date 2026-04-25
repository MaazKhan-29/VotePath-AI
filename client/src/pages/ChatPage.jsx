import { motion } from 'framer-motion';
import ChatAssistant from '../components/ChatAssistant';
import { FiMessageCircle } from 'react-icons/fi';

export default function ChatPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
            <FiMessageCircle size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">AI Chat Assistant</h1>
            <p className="text-xs text-text-muted">Ask anything about voting in English or Hinglish</p>
          </div>
        </div>
      </div>
      <ChatAssistant fullHeight />
    </motion.div>
  );
}
