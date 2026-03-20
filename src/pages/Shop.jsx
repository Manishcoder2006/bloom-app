import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Loader2, ArrowUpDown } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering and Sorting State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'lowToHigh', 'highToLow'
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    // Click outside handler for sort dropdown
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const firebaseProducts = [];
        querySnapshot.forEach((doc) => {
          firebaseProducts.push({ id: doc.id, ...doc.data() });
        });
        setProducts(firebaseProducts);
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Compute categories dynamically based on available products
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Derive filtered and sorted products
  const displayedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedCategory, sortOrder]);

  return (
    <div className="pt-32 pb-12 w-full max-w-7xl mx-auto space-y-8 px-4 relative">
      {/* Header */}
      <div className="liquid-glass-strong rounded-[2.5rem] p-8 border border-white/5 relative z-10">
        <div>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-white mb-2">Shop The Void</h2>
          <p className="text-white/60">Our latest collection of hyper-premium bio-digital footwear.</p>
        </div>
      </div>

      {/* Controls Container outside of liquid-glass-strong to prevent clipping */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-[100]">
        {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'liquid-glass text-white/60 hover:text-white border-white/5 hover:bg-emerald-500/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Menu */}
          <div className="relative z-50" ref={sortRef}>
            <div 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors border border-white/10 cursor-pointer ${sortOrder !== 'none' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'liquid-glass text-white/80'}`}
            >
              <ArrowUpDown size={16} />
              {sortOrder === 'lowToHigh' ? 'Price: Low to High' : sortOrder === 'highToLow' ? 'Price: High to Low' : 'Sort by'}
            </div>
            
            <div className={`absolute right-0 top-full mt-2 w-48 liquid-glass-strong rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 shadow-2xl z-[100] ${isSortOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <button 
                onClick={() => { setSortOrder('none'); setIsSortOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm text-white/80 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
              >
                Featured (Default)
              </button>
              <button 
                onClick={() => { setSortOrder('lowToHigh'); setIsSortOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm text-white/80 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
              >
                Price: Low to High
              </button>
              <button 
                onClick={() => { setSortOrder('highToLow'); setIsSortOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm text-white/80 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
              >
                Price: High to Low
              </button>
            </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-24">
          <Loader2 size={40} className="animate-spin text-emerald-500" />
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="liquid-glass-strong rounded-[2.5rem] p-16 text-center border border-white/5">
          <ShoppingCart size={48} className="mx-auto text-white/20 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No products found</h3>
          <p className="text-white/50">There are no shoes in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group liquid-glass-strong p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500 flex flex-col h-[480px] hover:-translate-y-2 relative"
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-[10px] tracking-widest uppercase text-emerald-400 font-medium">{product.category}</span>
                <span className="font-mono text-white/80">₹{Number(product.price).toFixed(2)}</span>
              </div>
              
              <div className="flex-1 w-full flex items-center justify-center relative my-4">
                <div className="absolute w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-colors" />
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 space-y-3 relative z-10">
                <h3 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">{product.name}</h3>
                <button className="w-full liquid-glass py-3 rounded-full flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white hover:bg-emerald-500/20 active:scale-95 transition-all">
                  <ShoppingCart size={16} />
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
