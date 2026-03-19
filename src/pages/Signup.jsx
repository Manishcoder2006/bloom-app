import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight, User } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Can add updating the user's profile with their name here if needed
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md liquid-glass-strong p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-emerald-500/20 transition-colors duration-700" />
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Create Account</h1>
          <p className="text-white/60 text-sm">Join the void ecosystem.</p>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Full Name</label>
            <div className="relative flex items-center">
              <User size={18} className="absolute left-4 text-white/40" />
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="Marcus Aurelio"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail size={18} className="absolute left-4 text-white/40" />
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="void@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Password</label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-4 text-white/40" />
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="6"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <p className="text-[10px] text-white/40 pl-2">Must be at least 6 characters</p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-500 text-black font-semibold py-4 rounded-2xl hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] disabled:opacity-70 disabled:hover:bg-emerald-500 disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin text-black" /> : 'Join Now'}
            {!loading && <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-white/60">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
