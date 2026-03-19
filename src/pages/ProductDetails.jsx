import { useParams, Link } from 'react-router-dom';
import { products as staticProducts } from '../data/products';
import { ArrowLeft, Check, Truck, Shield, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      // 1. Check static products
      let found = staticProducts.find(p => p.id === id);
      if (found) {
        setProduct(found);
        setSelectedSize(found?.sizes ? found.sizes[2] || found.sizes[0] : null);
        setLoading(false);
        return;
      }

      // 2. Fallback to Firebase
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fbProduct = { id: docSnap.id, ...docSnap.data() };
          setProduct(fbProduct);
          setSelectedSize(fbProduct?.sizes ? fbProduct.sizes[2] || fbProduct.sizes[0] : null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-white">
        <Loader2 size={40} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-white">
        Product not found
      </div>
    );
  }

  return (
    <div className="pt-28 pb-12 w-full max-w-7xl mx-auto space-y-8">
      <Link to="/shop" className="inline-flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors mb-4 ml-4">
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* IMAGE SECTION */}
        <div className="w-full lg:w-3/5 liquid-glass-strong rounded-[3rem] p-12 min-h-[600px] flex items-center justify-center relative border border-white/5 group">
          <div className="absolute w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-[85%] h-auto object-contain z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* DETAILS SECTION */}
        <div className="w-full lg:w-2/5 flex flex-col space-y-8 p-4">
          <div>
            <span className="text-xs tracking-[0.2em] font-bold uppercase text-emerald-400 mb-2 block">{product.category}</span>
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-4">{product.name}</h1>
            <p className="text-3xl font-mono text-white/90 font-light">${product.price}</p>
          </div>

          <p className="text-white/60 leading-relaxed font-light">
            {product.description}
          </p>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-medium text-white/80">Select Size (US)</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                    selectedSize === size 
                      ? 'bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                      : 'liquid-glass text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {!isAdded ? (
            <button 
              onClick={() => setIsAdded(true)}
              className="w-full py-5 rounded-full bg-white text-black font-semibold text-lg hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-500 mt-8 mb-4"
            >
              Add to Bag - ${(product.price).toFixed(2)}
            </button>
          ) : (
            <Link 
              to="/cart"
              className="w-full py-5 rounded-full bg-emerald-500 text-black font-semibold text-lg hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all duration-500 mt-8 mb-4 flex items-center justify-center gap-2"
            >
              <Check size={20} /> Go to Bag
            </Link>
          )}

          <div className="liquid-glass rounded-3xl p-6 border border-white/5 space-y-4">
            <div className="flex items-start gap-4 text-sm text-white/70">
              <Truck size={20} className="text-emerald-400 shrink-0" />
              <p><span className="text-white block font-medium mb-1">Free Priority Shipping</span> Delivering in 2-3 business days.</p>
            </div>
            <div className="h-[1px] w-full bg-white/10" />
            <div className="flex items-start gap-4 text-sm text-white/70">
              <Shield size={20} className="text-emerald-400 shrink-0" />
              <p><span className="text-white block font-medium mb-1">Lifetime Authenticity</span> NFC verified block-chain tagging.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
