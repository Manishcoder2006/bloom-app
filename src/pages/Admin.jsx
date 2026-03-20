import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, orderBy, query, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadImage } from '../utils/cloudinary';
import { Upload, Plus, LogOut, Package, Loader2, ListOrdered, CheckCircle, Truck, XCircle, Clock, Trash2, MapPin } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tabs
  const [activeTab, setActiveTab] = useState('orders'); // 'products' or 'orders'

  // Dashboard state
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Product Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [sizes, setSizes] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Orders State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Products State
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // Check simple auth
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'mg1@gmail.com' && password === '12345678') {
      setIsAuthenticated(true);
      setLoginError('');
      fetchOrders();
      fetchProducts();
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const q = query(collection(db, 'orders'));
      const querySnapshot = await getDocs(q);
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() });
      });
      // Sort so 'Pending' is first, then by date descending
      fetchedOrders.sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (a.status !== 'Pending' && b.status === 'Pending') return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const q = query(collection(db, 'products'));
      const querySnapshot = await getDocs(q);
      const fetchedProducts = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() });
      });
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !imageFile) {
      setSuccessMsg('Please fill all required fields and select an image.');
      return;
    }

    setLoading(true);
    setSuccessMsg('');

    try {
      const imageUrl = await uploadImage(imageFile);

      const newProduct = {
        name,
        price: parseFloat(price),
        category,
        description,
        image: imageUrl,
        features: features.split(',').map(f => f.trim()).filter(f => f),
        sizes: sizes.split(',').map(s => parseFloat(s.trim())).filter(s => !isNaN(s)),
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'products'), newProduct);
      
      // Add it to the local state so it shows up instantly above
      setProducts([...products, { id: docRef.id, ...newProduct }]);

      setSuccessMsg('Product added successfully!');
      setName(''); setPrice(''); setCategory(''); setDescription(''); setFeatures(''); setSizes(''); setImageFile(null);
    } catch (error) {
      console.error('Error adding product:', error);
      setSuccessMsg(`Error: ${error.message}.`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Shipped': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Delivered': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-white/50 bg-white/5 border-white/10';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-12 w-full flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-md liquid-glass-strong p-8 rounded-[2.5rem] border border-white/10 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Admin Panel</h1>
            <p className="text-white/60 text-sm">Sign in to manage your store</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">{loginError}</div>}
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-colors" placeholder="admin@example.com" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-colors" placeholder="••••••••" />
            </div>

            <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-2xl hover:bg-emerald-400 transition-colors mt-4">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 w-full max-w-6xl mx-auto p-4 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
          <p className="text-emerald-400 text-sm uppercase tracking-widest font-medium mt-1">Control Panel</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="liquid-glass p-1 rounded-full flex border border-white/10">
            <button 
              onClick={() => { setActiveTab('orders'); fetchOrders(); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              Order Management
            </button>
            <button 
              onClick={() => { setActiveTab('products'); fetchProducts(); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              Product Management
            </button>
          </div>
          
          <button onClick={handleLogout} className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <ListOrdered className="text-emerald-400" size={24} />
            <h2 className="text-2xl font-medium">Customer Orders</h2>
          </div>

          {ordersLoading ? (
            <div className="liquid-glass-strong rounded-3xl p-12 flex justify-center border border-white/5">
              <Loader2 size={32} className="animate-spin text-emerald-500" />
            </div>
          ) : orders.length === 0 ? (
            <div className="liquid-glass-strong rounded-3xl p-12 text-center border border-white/5">
              <p className="text-white/50 text-lg">No orders found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="liquid-glass-strong rounded-[2rem] p-6 border border-white/10 transition-colors hover:border-white/20">
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    {/* Customer Info */}
                    <div className="space-y-3 lg:w-1/3">
                      <div>
                        <span className="text-xs tracking-widest uppercase text-white/40 block mb-1">Customer</span>
                        <p className="font-medium text-lg">{order.customerName}</p>
                        <p className="text-sm text-white/60">{order.email}</p>
                      </div>
                      <div>
                        <span className="text-xs tracking-widest uppercase text-white/40 block mb-1">Shipping</span>
                        <p className="text-sm text-white/80">{order.shippingDetails?.address}</p>
                        <p className="text-sm text-white/80">{order.shippingDetails?.city}, {order.shippingDetails?.postalCode}</p>
                        {order.shippingDetails?.lat && order.shippingDetails?.lng && (
                          <a 
                            href={`https://www.google.com/maps?q=${order.shippingDetails.lat},${order.shippingDetails.lng}`}
                            target="_blank"
                            rel="noreferrer" 
                            className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 mt-2 inline-flex"
                          >
                            <MapPin size={12} /> View Live Location
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-3 lg:w-1/3">
                      <span className="text-xs tracking-widest uppercase text-white/40 block mb-1">Items</span>
                      <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-black/30 p-2 rounded-lg text-sm">
                            <span className="truncate pr-2">{item.name} <span className="text-white/40 text-xs">x{item.quantity} (Sz {item.size})</span></span>
                            <span className="font-mono text-emerald-400">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/10">
                        <span className="font-medium">Total (COD)</span>
                        <span className="font-mono text-lg font-bold">₹{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Status Management */}
                    <div className="lg:w-1/3 flex flex-col items-end gap-4 h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs uppercase text-white/50 mr-2">Status:</span>
                        <div className={`px-4 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                          {order.status === 'Pending' && <Clock size={14} />}
                          {order.status === 'Shipped' && <Truck size={14} />}
                          {order.status === 'Delivered' && <CheckCircle size={14} />}
                          {order.status === 'Cancelled' && <XCircle size={14} />}
                          {order.status}
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-end gap-2 mt-auto">
                        {['Pending', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(order.id, status)}
                            disabled={order.status === status}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                              order.status === status 
                                ? 'bg-white/10 border-white/20 text-white/40 cursor-not-allowed' 
                                : 'bg-black/40 border-white/10 text-white/80 hover:bg-white hover:text-black hover:border-white'
                            }`}
                          >
                            Mark {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-8 animate-fade-in">
          {/* Add Product Section */}
          <div className="liquid-glass-strong rounded-[2.5rem] p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Plus size={20} />
              </div>
              <h2 className="text-xl font-medium">Add New Product</h2>
            </div>

            {successMsg && (
              <div className={`p-4 mb-6 rounded-2xl border ${successMsg.includes('Error') ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'}`}>
                {successMsg}
              </div>
            )}

            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Product Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Price (₹)</label>
                <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Category</label>
                <select required value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 appearance-none">
                  <option value="" disabled>Select a category</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Affordable">Affordable</option>
                  <option value="Good">Good</option>
                  <option value="Performance">Performance</option>
                  <option value="Casual">Casual</option>
                  <option value="Streetwear">Streetwear</option>
                  <option value="Limited Edition">Limited Edition</option>
                  <option value="Classics">Classics</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Sizes (comma separated)</label>
                <input placeholder="8, 9, 10, 11" type="text" value={sizes} onChange={e => setSizes(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Description</label>
                <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Features (comma separated)</label>
                <input placeholder="Feature 1, Feature 2" type="text" value={features} onChange={e => setFeatures(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50" />
              </div>

              <div className="space-y-1 md:col-span-2">
                 <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Product Image</label>
                 <div className="relative w-full h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center bg-black/30 hover:bg-white/5 transition-colors cursor-pointer overflow-hidden group">
                   <input 
                     required={!imageFile}
                     type="file" 
                     accept="image/*"
                     onChange={e => setImageFile(e.target.files[0])}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                   />
                   <Upload size={24} className="text-white/50 mb-2 group-hover:text-emerald-400 transition-colors" />
                   <p className="text-sm font-medium text-white/80">
                     {imageFile ? imageFile.name : 'Click or drag image to upload'}
                   </p>
                   {imageFile && (
                     <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <img src={URL.createObjectURL(imageFile)} alt="preview" className="h-full object-contain" />
                     </div>
                   )}
                 </div>
              </div>

              <div className="md:col-span-2 pt-4 border-t border-white/10">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full liquid-glass bg-white/5 border border-white/20 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all duration-300 shadow-lg disabled:opacity-50"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                  {loading ? 'Uploading & Saving...' : 'Add Product to Database'}
                </button>
              </div>
            </form>
          </div>

          {/* Manage Products Section */}
          <div className="liquid-glass-strong rounded-[2.5rem] p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Package size={20} />
              </div>
              <h2 className="text-xl font-medium">All Products Dashboard</h2>
              <span className="ml-auto bg-white/10 px-3 py-1 rounded-full text-xs">{products.length} Items</span>
            </div>

            {productsLoading ? (
              <div className="p-12 flex justify-center border border-white/5 rounded-2xl">
                <Loader2 size={32} className="animate-spin text-emerald-500" />
              </div>
            ) : products.length === 0 ? (
              <div className="p-12 text-center border border-white/5 rounded-2xl">
                <p className="text-white/50">No products found in database.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="liquid-glass p-4 rounded-2xl border border-white/5 flex gap-4 pr-12 relative group/item">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded-lg bg-white/5 p-1" />
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                      <p className="text-emerald-400 text-xs mt-1 font-mono">₹{product.price}</p>
                      <p className="text-white/40 text-[10px] mt-1">{product.category}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors opacity-0 group-hover/item:opacity-100"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
