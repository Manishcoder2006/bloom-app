import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 p-4 lg:p-6 transition-all duration-300">
      <nav className="liquid-glass-strong rounded-full px-6 py-3 flex items-center justify-between mx-auto max-w-7xl">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="w-4 h-4 bg-emerald-400 rounded-full blur-[2px]" />
          </div>
          <span className="text-xl font-semibold tracking-tighter text-white">bloom footwear</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 px-6">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-white ${
                location.pathname === link.path ? 'text-white' : 'text-white/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-3">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors">
            <User size={18} />
          </Link>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Search size={18} />
          </button>
          <Link to="/cart" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors relative">
            <ShoppingBag size={18} />
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 text-[10px] flex items-center justify-center text-white font-bold">2</span>
          </Link>
          <button 
            className="md:hidden w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-[80px] left-4 right-4 liquid-glass-strong rounded-3xl p-6 flex flex-col gap-4">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-lg font-medium text-white/80 hover:text-white border-b border-white/10 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
