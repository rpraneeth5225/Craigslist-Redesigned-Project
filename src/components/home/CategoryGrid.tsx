import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Car,
  Home,
  Briefcase,
  ShoppingBag,
  Users,
  Heart,
  MessageSquare,
  FileText,
} from 'lucide-react';

const categories = [
  { name: 'Vehicles', icon: Car, color: 'bg-red-100 text-red-600' },
  { name: 'Housing', icon: Home, color: 'bg-blue-100 text-blue-600' },
  { name: 'Jobs', icon: Briefcase, color: 'bg-green-100 text-green-600' },
  { name: 'For Sale', icon: ShoppingBag, color: 'bg-purple-100 text-purple-600' },
  { name: 'Services', icon: Users, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Community', icon: Heart, color: 'bg-pink-100 text-pink-600' },
  { name: 'Resumes', icon: FileText, color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Discussion Forums', icon: MessageSquare, color: 'bg-indigo-100 text-indigo-600' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CategoryGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <motion.div key={category.name} variants={item}>
            <Link
              to={`/search/${category.name.toLowerCase()}`}
              className="flex flex-col items-center p-6 rounded-lg hover:shadow-md transition-all duration-200 group"
            >
              <div className={`p-4 rounded-full ${category.color} mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-gray-900 font-medium text-center group-hover:text-blue-600 transition-colors">
                {category.name}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}