import { motion } from 'framer-motion';

export default function LogoImage() {
  return (
    <motion.img
      src="../Full_Logo.png"
      alt="newjersey.list logo"
      className="h-8 w-auto"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    />
  );
}