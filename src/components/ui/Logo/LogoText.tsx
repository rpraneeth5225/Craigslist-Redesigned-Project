import { motion } from 'framer-motion';

export default function LogoText() {
  return (
    <div className="flex items-baseline">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors"
      >
        newjersey
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-600 group-hover:text-gray-700 transition-colors"
      >
        .list
      </motion.span>
    </div>
  );
}