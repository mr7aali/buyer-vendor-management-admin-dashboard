import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Search, Filter, Star, MoreVertical, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const vendors = [{
    id: '1',
    name: 'TechGiant Solutions',
    category: 'Electronics',
    products: 145,
    revenue: '$45,230',
    rating: 4.8,
    status: 'Active',
    verified: true,
    country: 'USA',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  }, {
    id: '2',
    name: 'Fashion Forward',
    category: 'Clothing',
    products: 320,
    revenue: '$28,450',
    rating: 4.5,
    status: 'Active',
    verified: true,
    country: 'UK',
    logo: 'https://images.unsplash.com/photo-1554774853-719586f8c277?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  }, {
    id: '3',
    name: 'Home & Living Co.',
    category: 'Home Decor',
    products: 85,
    revenue: '$12,100',
    rating: 4.2,
    status: 'Pending',
    verified: false,
    country: 'Canada',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  }];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
    const matchesCountry = countryFilter === 'all' || vendor.country === countryFilter;
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesCategory && matchesCountry && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Vendor Directory
            </h1>
            <p className="text-gray-500">
              Monitor vendor performance, approvals, and compliance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
              Invite Vendor
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home Decor">Home Decor</option>
          </select>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Countries</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVendors.map(vendor => (
            <div key={vendor.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 p-1">
                  <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex gap-2">
                  <StatusBadge status={vendor.status.toLowerCase() as any} />
                </div>
              </div>

              <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-1">
                {vendor.name}
                {vendor.verified && <ShieldCheck className="w-4 h-4 text-green-500" title="Verified" />}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {vendor.category} • {vendor.country}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-gray-50">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Revenue</div>
                  <div className="font-bold text-gray-900">
                    {vendor.revenue}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Products</div>
                  <div className="font-bold text-gray-900">
                    {vendor.products}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  {vendor.rating}
                </div>
                <Link to={`/vendors/${vendor.id}`} className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                  View Profile <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
          {filteredVendors.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No vendors found matching your filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}