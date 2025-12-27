import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DocumentViewer } from '../components/verification/DocumentViewer';
import { TrackingModal } from '../components/orders/TrackingModal';
import {
  Mail, MapPin, Calendar, ShieldCheck, Store, Star, ExternalLink, ArrowLeft,
  Package, Truck, Clock, Phone, Globe, DollarSign, Users, TrendingUp,
  ChevronRight, Search, Filter, AlertCircle
} from 'lucide-react';

// Interfaces
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  image: string;
  status: 'active' | 'out_of_stock' | 'draft';
  description?: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

export function VendorDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'deliveries' | 'orders'>('overview');
  const [deliveryTab, setDeliveryTab] = useState<'active' | 'history'>('active');
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Products Tab State
  const [productView, setProductView] = useState<'categories' | 'list' | 'detail'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock Data
  const vendor = {
    name: 'TechGiant Solutions',
    email: 'contact@techgiant.com',
    phone: '+1 (555) 123-4567',
    website: 'https://techgiant.example.com',
    category: 'Electronics',
    country: 'United States',
    address: '123 Tech Valley Dr, San Francisco, CA 94043',
    joinDate: 'Jan 15, 2023',
    verified: true,
    rating: 4.8,
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    description: 'TechGiant Solutions is a premier provider of high-quality electronics and computer hardware. We specialize in enterprise-grade equipment and consumer electronics with a focus on reliability and customer service.',
    stats: {
      revenue: '$45,230',
      products: 145,
      orders: 892,
      returns: '1.2%',
      responseTime: '2 hours',
      completionRate: '98%'
    }
  };

  const categories: Category[] = [
    { id: 'laptops', name: 'Laptops', count: 45, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80' },
    { id: 'phones', name: 'Smartphones', count: 32, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'accessories', name: 'Accessories', count: 68, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80' },
  ];

  const products: Product[] = [
    { id: '1', name: 'ProBook X15', category: 'laptops', price: 1299, stock: 45, sales: 120, rating: 4.8, status: 'active', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=100&q=80', description: 'High performance laptop for professionals.' },
    { id: '2', name: 'UltraPhone 12', category: 'phones', price: 999, stock: 20, sales: 350, rating: 4.9, status: 'active', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=100&q=80', description: 'Latest flagship smartphone.' },
    { id: '3', name: 'NoiseCanceller 3000', category: 'accessories', price: 299, stock: 0, sales: 85, rating: 4.5, status: 'out_of_stock', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80', description: 'Premium noise cancelling headphones.' },
    { id: '4', name: 'GamingLaptop Y7', category: 'laptops', price: 1899, stock: 12, sales: 45, rating: 4.7, status: 'active', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=100&q=80', description: 'Ultimate gaming experience.' },
  ];

  const orders: Order[] = [
    { id: 'ORD-7821', customer: 'Alice Johnson', date: 'Oct 28, 2023', amount: 1299.00, status: 'shipped', items: 1 },
    { id: 'ORD-7822', customer: 'Bob Smith', date: 'Oct 27, 2023', amount: 299.50, status: 'delivered', items: 2 },
    { id: 'ORD-7823', customer: 'Carol White', date: 'Oct 26, 2023', amount: 999.00, status: 'processing', items: 1 },
    { id: 'ORD-7824', customer: 'David Brown', date: 'Oct 25, 2023', amount: 45.00, status: 'cancelled', items: 1 },
  ];

  const documents = [
    { id: '1', name: 'Business License.pdf', type: 'License', uploadDate: 'Jan 15, 2023', status: 'approved' as const, url: '#' },
    { id: '2', name: 'Tax Registration.pdf', type: 'Tax', uploadDate: 'Jan 15, 2023', status: 'approved' as const, url: '#' },
    { id: '3', name: 'Identity Proof.jpg', type: 'ID', uploadDate: 'Jan 16, 2023', status: 'pending' as const, url: '#' }
  ];

  const handleTrackOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsTrackingOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'out_of_stock': return 'bg-red-100 text-red-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <Link to="/vendors" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Vendors
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 p-1 flex-shrink-0">
              <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{vendor.name}</h1>
                {vendor.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1"><Store className="w-4 h-4" /> {vendor.category}</div>
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {vendor.country}</div>
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Since {vendor.joinDate}</div>
                <div className="flex items-center gap-1 text-amber-500 font-medium">
                  <Star className="w-4 h-4 fill-current" /> {vendor.rating} Rating
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a href={vendor.website} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> Visit Store
              </a>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
                <Mail className="w-4 h-4" /> Message
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mt-8 border-b border-gray-100">
            {['overview', 'products', 'orders', 'deliveries'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
                  // Reset views when switching tabs
                  if (tab === 'products') {
                    setProductView('categories');
                    setSelectedCategory(null);
                    setSelectedProduct(null);
                  }
                }}
                className={`pb-4 text-sm font-medium capitalize transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-green-50 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
                </div>
                <div className="text-gray-500 text-sm mb-1">Total Revenue</div>
                <div className="text-2xl font-bold text-gray-900">{vendor.stats.revenue}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg"><Package className="w-5 h-5 text-blue-600" /></div>
                </div>
                <div className="text-gray-500 text-sm mb-1">Total Products</div>
                <div className="text-2xl font-bold text-gray-900">{vendor.stats.products}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-amber-50 rounded-lg"><Package className="w-5 h-5 text-amber-600" /></div>
                </div>
                <div className="text-gray-500 text-sm mb-1">Total Orders</div>
                <div className="text-2xl font-bold text-gray-900">{vendor.stats.orders}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg"><TrendingUp className="w-5 h-5 text-purple-600" /></div>
                </div>
                <div className="text-gray-500 text-sm mb-1">Return Rate</div>
                <div className="text-2xl font-bold text-gray-900">{vendor.stats.returns}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* About Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">About the Vendor</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{vendor.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Business Email</div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {vendor.email}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Phone Number</div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {vendor.phone}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Headquarters</div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {vendor.address}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Website</div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        techgiant.example.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Documents */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Verification Status</h3>
                <div className="mb-6">
                  <DocumentViewer
                    documents={documents}
                    onApprove={(id) => console.log('Approve', id)}
                    onReject={(id, reason) => console.log('Reject', id, reason)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Products Navigation Breadcrumb */}
            {productView !== 'categories' && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <button onClick={() => setProductView('categories')} className="hover:text-primary transition-colors">Categories</button>
                <ChevronRight className="w-4 h-4" />
                {selectedCategory && (
                  <>
                    <button
                      onClick={() => setProductView('list')}
                      className={`hover:text-primary transition-colors ${productView === 'list' ? 'font-medium text-gray-900' : ''}`}
                    >
                      {categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
                    </button>
                  </>
                )}
                {productView === 'detail' && selectedProduct && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="font-medium text-gray-900">{selectedProduct.name}</span>
                  </>
                )}
              </div>
            )}

            {/* Categories View */}
            {productView === 'categories' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Product Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setProductView('list'); }}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all"
                    >
                      <div className="aspect-[16/9] w-full bg-gray-100 relative">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold">{cat.name}</h3>
                          <p className="text-white/80 text-sm">{cat.count} Products</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products List View */}
            {productView === 'list' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">
                    {categories.find(c => c.id === selectedCategory)?.name} Products
                  </h2>
                  <div className="flex gap-3">
                    <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <Search className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <Filter className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.filter(p => p.category === selectedCategory).map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-xs text-gray-500">ID: #{product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-medium">${product.price}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{product.stock} units</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {product.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{product.sales} sold</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => { setSelectedProduct(product); setProductView('detail'); }}
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Product Detail View */}
            {productView === 'detail' && selectedProduct && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-wide">
                            {categories.find(c => c.id === selectedProduct.category)?.name}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${getStatusColor(selectedProduct.status)}`}>
                            {selectedProduct.status.replace('_', ' ')}
                          </span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="flex text-amber-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-4 h-4 ${s <= selectedProduct.rating ? 'fill-current' : 'text-gray-200'}`} />
                            ))}
                          </div>
                          <span>({selectedProduct.sales} sales)</span>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-primary">${selectedProduct.price}</div>
                    </div>

                    <div className="prose prose-gray max-w-none mb-8">
                      <p className="text-gray-600">{selectedProduct.description || 'No description available.'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="text-sm text-gray-500 mb-1">Available Stock</div>
                        <div className="text-xl font-bold text-gray-900">{selectedProduct.stock} Units</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="text-sm text-gray-500 mb-1">Total Sales</div>
                        <div className="text-xl font-bold text-gray-900">${selectedProduct.sales * selectedProduct.price}</div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm">
                        Edit Product
                      </button>
                      <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                        View Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Order History</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-primary">
                      <Link to={`/orders/${order.id}`} className="hover:underline">{order.id}</Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.items} items</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">${order.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/orders/${order.id}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Deliveries Tab */}
        {activeTab === 'deliveries' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-4">
              <button
                onClick={() => setDeliveryTab('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${deliveryTab === 'active' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                Ongoing Deliveries
              </button>
              <button
                onClick={() => setDeliveryTab('history')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${deliveryTab === 'history' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                Delivery History
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">ETA</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-primary">#ORD-782{i}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">Customer Name</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          <Truck className="w-3 h-3" /> In Transit
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">Oct 28, 2023</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleTrackOrder(`#ORD-782${i}`)}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Track Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <TrackingModal
          isOpen={isTrackingOpen}
          onClose={() => setIsTrackingOpen(false)}
          orderId={selectedOrderId || ''}
        />
      </main>
    </div>
  );
}