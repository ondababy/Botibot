import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pill, Home, Plus, AlertTriangle } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Pill className="nav-icon" />
        <span>Botibot Inventory</span>
      </div>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
        >
          <Home size={20} />
          Dashboard
        </Link>
        <Link 
          to="/pills" 
          className={`nav-link ${isActive('/pills') ? 'active' : ''}`}
        >
          <Pill size={20} />
          Pills
        </Link>
        <Link 
          to="/pills/add" 
          className={`nav-link ${isActive('/pills/add') ? 'active' : ''}`}
        >
          <Plus size={20} />
          Add Pill
        </Link>
        <Link 
          to="/low-stock" 
          className={`nav-link ${isActive('/low-stock') ? 'active' : ''}`}
        >
          <AlertTriangle size={20} />
          Low Stock
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;