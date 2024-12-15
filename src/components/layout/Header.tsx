import { Search, Menu, User, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { useState, useEffect } from 'react';
import LoginModal from '../auth/LoginModal';
import PostModal from '../auth/PostModal';
import { Logo } from '../Full_Logo.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handlePostClick = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      setIsPostModalOpen(true);
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : '#ffffff',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
      }}
      className="sticky top-0 z-50 shadow-sm transition-shadow duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            <motion.div 
              className="relative max-w-lg w-full mx-4"
              initial={false}
              animate={{ width: isScrolled ? '300px' : '400px' }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </motion.div>
            <Button 
              variant="outline"
              onClick={() => !isLoggedIn && setIsLoginModalOpen(true)}
              className="flex items-center"
            >
              <User className="h-5 w-5 mr-2" />
              <span>{isLoggedIn ? 'Account' : 'Sign In'}</span>
            </Button>
            <Button onClick={handlePostClick} className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              <span>Post</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 pt-2 pb-3 space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search listings..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Button 
                variant="outline" 
                className="w-full justify-center"
                onClick={() => {
                  setIsMenuOpen(false);
                  !isLoggedIn && setIsLoginModalOpen(true);
                }}
              >
                <User className="h-5 w-5 mr-2" />
                <span>{isLoggedIn ? 'Account' : 'Sign In'}</span>
              </Button>
              <Button 
                className="w-full justify-center"
                onClick={() => {
                  setIsMenuOpen(false);
                  handlePostClick();
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                <span>Post</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSuccess={() => setIsPostModalOpen(false)}
      />
    </motion.header>
  );
}