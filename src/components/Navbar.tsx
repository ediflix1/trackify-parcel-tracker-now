
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';
import { Package } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <nav className="bg-delivery-primary text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Package size={24} />
          <span className="text-xl font-bold">ExpressTrack</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-delivery-light transition-colors">
            Rastrear
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Olá, {currentUser?.name}</span>
              <Button 
                variant="outline" 
                className="bg-transparent border-white hover:bg-white hover:text-delivery-primary"
                onClick={handleLogout}
              >
                Sair
              </Button>
              <Link to="/dashboard">
                <Button>Minha Conta</Button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" 
                className="bg-transparent border-white hover:bg-white hover:text-delivery-primary">
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
