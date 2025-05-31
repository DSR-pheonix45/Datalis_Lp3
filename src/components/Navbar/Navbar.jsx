import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, User, LogOut, Menu, X } from 'lucide-react';
// Remove the import and use the public path directly

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const ThemeToggle = () => (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-800/20 transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    setIsProfileOpen(false);
    // Change from logout() to signOut() to match the function name in AuthContext
    const result = await signOut();
    if (result?.success) {
      navigate('/');
    } else {
      // Handle case where signOut doesn't return a result object
      navigate('/');
    }
  };

  const openDemoPage = () => {
    window.open('https://huggingface.co/spaces/medhansh-k/Dabby', '_blank');
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0B1221]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/Datalis1.png" alt="Datalis Logo" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain mr-2" />
              <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">Datalis</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/about" label="About" />
            <NavLink to="/agents" label="Agents" />
            <NavLink to="/pricing" label="Pricing" />
            <NavLink to="/career" label="Careers" />

            {/* Auth Buttons - Dynamic based on auth state */}
            <div className="flex items-center space-x-4 ml-4 border-l border-white/10 pl-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-4 py-2 text-white hover:text-[#00FFD1] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
                      {user?.email?.[0].toUpperCase() || <User size={16} />}
                    </div>
                    <span className="hidden lg:inline">{user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-[#0B1221] border border-gray-800 rounded-lg shadow-lg overflow-hidden z-20">
                        <Link 
                          to="/coming-soon" 
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-[#00FFD1]"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300"
                        >
                          <div className="flex items-center">
                            <LogOut size={16} className="mr-2" />
                            Sign out
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2 text-[#00FFD1] hover:text-[#00FFD1]/80 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2 bg-[#00FFD1] text-black rounded-full font-medium hover:bg-[#00FFD1]/90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 rounded-md hover:bg-gray-800/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-[#0B1221] border-t border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/about" label="About" />
            <MobileNavLink to="/agents" label="Agents" />
            <MobileNavLink to="/pricing" label="Pricing" />
            <MobileNavLink to="/career" label="Careers" />
            
            <div className="pt-4 mt-4 border-t border-gray-800">
              {isAuthenticated ? (
                <>
                  <MobileNavLink to="/coming-soon" label="Dashboard" />
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center px-4 py-3 text-base text-red-400 hover:bg-gray-800 hover:text-red-300"
                  >
                    <LogOut size={18} className="mr-3" />
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    to="/login"
                    className="w-full px-4 py-2 text-center text-[#00FFD1] hover:bg-gray-800 font-medium rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full px-4 py-2 text-center bg-[#00FFD1] text-black rounded-md font-medium hover:bg-[#00FFD1]/90"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

// NavLink component with active state
function NavLink({ to, label, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  // If onClick is provided, use it instead of Link
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`text-base font-normal transition-all relative ${
          isActive ? 'text-[#00FFD1]' : 'text-white/90 hover:text-[#00FFD1]'
        }`}
      >
        {label}
        {isActive && (
          <motion.div
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00FFD1]"
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
          />
        )}
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={`text-base font-normal transition-all relative ${
        isActive ? 'text-[#00FFD1]' : 'text-white/90 hover:text-[#00FFD1]'
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00FFD1]"
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        />
      )}
    </Link>
  );
}

// Mobile NavLink component
function MobileNavLink({ to, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block px-4 py-3 text-base ${
        isActive 
          ? 'text-[#00FFD1] bg-gray-800/50' 
          : 'text-white hover:bg-gray-800 hover:text-[#00FFD1]'
      } rounded-md transition-colors`}
    >
      {label}
    </Link>
  );
}
