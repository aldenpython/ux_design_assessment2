
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import LogoutConfirmDialog from './LogoutConfirmDialog';

const NavBar = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
    if (isMobile) {
      setMenuOpen(false);
    }
  };
  
  const handleLogoutConfirm = async () => {
    try {
      await logout();
      // Navigation happens after successful logout
      navigate('/');
    } catch (error) {
      // Error is already handled in the auth context, but we can add additional handling here if needed
      console.error("Error in navbar during logout:", error);
      // No need to show another toast as it's already shown in the context
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">HKAA Driving School</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex space-x-8">
              <Link to="/" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/lessons" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                Book Lessons
              </Link>
              {isLoggedIn ? (
                <button 
                  onClick={handleLogoutClick}
                  className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link to="/register" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                  Login/Register
                </Link>
              )}
              <Link to="/contact" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </nav>
          )}
          
          {/* Mobile menu button */}
          {isMobile && (
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && menuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/lessons" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              Book Lessons
            </Link>
            {isLoggedIn ? (
              <button 
                onClick={handleLogoutClick}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/register" 
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
                onClick={() => setMenuOpen(false)}
              >
                Login/Register
              </Link>
            )}
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>

      {/* Logout confirmation dialog */}
      <LogoutConfirmDialog 
        isOpen={showLogoutDialog} 
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogoutConfirm}
      />
    </header>
  );
};

export default NavBar;
