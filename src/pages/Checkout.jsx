import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, MapPin, Truck, CheckCircle2, Navigation, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Checkout() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Form State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Fetch and manage Cart
  const { cartItems, clearCart } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  
  // Location State
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    // Automatically fetch user location for the map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setLocationError('Unable to retrieve automatic location. Continuing without it.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmail(currentUser.email);
        setAuthLoading(false);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // 1. Prepare Order Data
      const newOrder = {
        userId: user ? user.uid : null,
        email: email,
        customerName: `${firstName} ${lastName}`,
        shippingDetails: {
          address,
          city,
          postalCode,
          lat: userLocation ? userLocation.lat : null,
          lng: userLocation ? userLocation.lng : null
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size
        })),
        totalAmount: subtotal,
        status: 'Pending',
        paymentMethod: 'Cash on Delivery (COD)',
        createdAt: new Date().toISOString() // Or use serverTimestamp()
      };

      // 2. Save Order to Firestore
      await addDoc(collection(db, 'orders'), newOrder);

      // 3. Clear Cart & Show Success
      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/profile');
      }, 3000);

    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
      setIsProcessing(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 w-full flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        <p className="text-white/60">Verifying secure session...</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-12 w-full flex items-center justify-center">
        <div className="liquid-glass-strong rounded-[3rem] p-12 text-center max-w-lg border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-medium text-white mb-4">Order Confirmed</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Thank you for your order. Your hyper-premium footwear is being assembled. You can pay on delivery. Redirecting to your orders...
          </p>
          <div className="w-8 h-8 rounded-full border-t-2 border-emerald-500 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-12 w-full max-w-6xl mx-auto px-4">
      <Link to="/cart" className="inline-flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors mb-8">
        <ArrowLeft size={16} /> Return to Cart
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* CHECKOUT FORM */}
        <div className="w-full lg:w-2/3 space-y-8">
          <div>
            <h1 className="text-4xl font-medium tracking-tight text-white mb-2">Checkout</h1>
            <p className="text-white/60">Complete your order details.</p>
          </div>

          <form onSubmit={handleCheckout} className="space-y-8">
            {/* Contact Info */}
            <div className="liquid-glass-strong p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <h2 className="text-xl font-medium text-white">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-white/50 pl-1">Email Address</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="void@example.com" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-white/50 pl-1">First Name</label>
                  <input required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-white/50 pl-1">Last Name</label>
                  <input required type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="liquid-glass-strong p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <h2 className="text-xl font-medium text-white">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-white/50 pl-1">Street Address</label>
                  <input required type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Void Street" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-white/50 pl-1">City</label>
                  <input required type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Metropolis" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-white/50 pl-1">Postal Code</label>
                  <input required type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="10001" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
              </div>

              {/* Automatic Map Location */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-white">
                   <Navigation size={18} className="text-emerald-400" />
                   <h3 className="text-sm font-medium">Automatic Live Location</h3>
                </div>
                {userLocation ? (
                  <div className="w-full h-48 rounded-xl overflow-hidden border border-emerald-500/30">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      scrolling="no" 
                      marginHeight="0" 
                      marginWidth="0" 
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${userLocation.lng-0.005},${userLocation.lat-0.005},${userLocation.lng+0.005},${userLocation.lat+0.005}&layer=mapnik&marker=${userLocation.lat},${userLocation.lng}`}
                    ></iframe>
                  </div>
                ) : (
                  <div className="w-full p-4 liquid-glass rounded-xl flex items-center justify-center text-sm text-white/50">
                    {locationError || 'Fetching your live location for precise delivery...'}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="liquid-glass-strong p-8 rounded-[2.5rem] border border-emerald-500/30 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Truck size={100} />
              </div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-medium text-white">Payment Method</h2>
              </div>
              
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3">
                 <CheckCircle2 className="text-emerald-400 mt-0.5 shrink-0" size={20} />
                 <div>
                   <p className="text-white font-medium">Cash on Delivery (COD)</p>
                   <p className="text-white/60 text-sm mt-1">Pay with cash or card when your order arrives at your door. No upfront payment required.</p>
                 </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full py-5 rounded-full bg-emerald-500 text-black font-semibold text-lg hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-500 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:hover:bg-emerald-500 disabled:hover:shadow-none"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 rounded-full border-t-2 border-black animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Confirm Order & Pay on Delivery'
              )}
            </button>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="liquid-glass-strong rounded-[2.5rem] p-8 border border-white/5 sticky top-24">
            <h2 className="text-2xl font-medium text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-16 h-16 liquid-glass rounded-xl p-2 bg-white/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs text-white/50">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-mono text-white/80">
                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[1px] w-full bg-white/10 my-6" />

            <div className="space-y-4 text-white/80 font-light text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-emerald-400">Free</span>
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/10 my-4" />

            <div className="flex justify-between items-end">
              <span className="text-lg font-medium text-white">Total</span>
              <span className="font-mono text-3xl text-emerald-300">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
