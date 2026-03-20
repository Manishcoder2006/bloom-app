import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, Loader2, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserOrders(currentUser.email); // or uid depending on how you stored it
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserOrders = async (userEmail) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'orders'),
        where('email', '==', userEmail)
      );
      const querySnapshot = await getDocs(q);
      const userOrders = [];
      querySnapshot.forEach((doc) => {
        userOrders.push({ id: doc.id, ...doc.data() });
      });
      // Sort by newest first
      userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-amber-400 border-amber-400/30';
      case 'Shipped': return 'text-blue-400 border-blue-400/30';
      case 'Delivered': return 'text-emerald-400 border-emerald-400/30';
      case 'Cancelled': return 'text-red-400 border-red-400/30';
      default: return 'text-white/50 border-white/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock size={16} />;
      case 'Shipped': return <Truck size={16} />;
      case 'Delivered': return <CheckCircle size={16} />;
      case 'Cancelled': return <XCircle size={16} />;
      default: return null;
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen pt-24 w-full flex items-center justify-center text-white">
        <Loader2 size={40} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 w-full max-w-5xl mx-auto p-4 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 liquid-glass-strong rounded-[2.5rem] p-8 border border-white/5">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold uppercase border border-emerald-500/30">
            {user.email.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">My Dashboard</h1>
            <p className="text-white/60">{user.email}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="liquid-glass px-6 py-3 rounded-full flex items-center gap-2 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all border border-white/10"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Package className="text-emerald-400" size={24} />
        <h2 className="text-2xl font-medium">Order History</h2>
      </div>

      {orders.length === 0 ? (
        <div className="liquid-glass-strong rounded-[2.5rem] p-16 text-center border border-white/5 space-y-4">
          <Package size={48} className="mx-auto text-white/20" />
          <h3 className="text-xl font-medium text-white">No active orders found</h3>
          <p className="text-white/50 pb-6">Your hyper-premium footwear journey begins in the shop.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="liquid-glass px-8 py-3 rounded-full text-white font-medium hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all border border-white/10"
          >
            Explore Void
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="liquid-glass-strong rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row justify-between gap-8 border border-white/10 transition-colors hover:border-emerald-500/30">
              
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 border rounded-full flex items-center gap-2 text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </div>
                  <span className="text-xs text-white/40 font-mono">
                    ORDER #{order.id.toUpperCase().substring(0, 8)}
                  </span>
                </div>
                
                <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center liquid-glass p-3 rounded-xl border border-white/5">
                      <div className="flex flex-col">
                         <span className="font-medium">{item.name}</span>
                         <span className="text-xs text-white/50">Size: {item.size} • Qty: {item.quantity}</span>
                      </div>
                      <span className="font-mono text-emerald-400">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:w-64 flex flex-col justify-between p-6 liquid-glass rounded-3xl border border-white/5">
                <div className="space-y-4 mb-6">
                   <div className="space-y-1">
                     <span className="text-[10px] tracking-widest uppercase text-white/40">Date</span>
                     <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                   </div>
                   <div className="space-y-1">
                     <span className="text-[10px] tracking-widest uppercase text-white/40">Payment</span>
                     <p className="text-sm font-medium">{order.paymentMethod}</p>
                   </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-[10px] tracking-widest uppercase text-white/40 block mb-1">Order Total</span>
                  <p className="font-mono text-2xl text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    ${order.totalAmount?.toFixed(2)}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
