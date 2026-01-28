import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "../components/dashboard/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import { DocumentViewer } from "../components/verification/DocumentViewer";
import { TrackingModal } from "../components/orders/TrackingModal";
import { EditProductModal } from "../components/products/EditProductModal";
import {
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  Store,
  Star,
  ExternalLink,
  ArrowLeft,
  Package,
  Truck,
  Clock,
  Phone,
  Globe,
  DollarSign,
  Users,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  AlertCircle,
} from "lucide-react";

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
  status: "active" | "out_of_stock" | "draft";
  description?: string;
  sku?: string;
  sizes?: string[];
  colors?: string[];
  images?: string[];
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
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
}

export function VendorDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders"
  >("overview");
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Products Tab State
  const [productView, setProductView] = useState<
    "categories" | "list" | "detail"
  >("categories");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [productStatusFilter, setProductStatusFilter] = useState("all");
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  // Orders Tab State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock Data
  const vendor = {
    name: "TechGiant Solutions",
    email: "contact@techgiant.com",
    phone: "+1 (555) 123-4567",
    website: "https://techgiant.example.com",
    category: "Electronics",
    country: "United States",
    address: "123 Tech Valley Dr, San Francisco, CA 94043",
    joinDate: "Jan 15, 2023",
    verified: true,
    rating: 4.8,
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    description:
      "TechGiant Solutions is a premier provider of high-quality electronics and computer hardware. We specialize in enterprise-grade equipment and consumer electronics with a focus on reliability and customer service.",
    stats: {
      revenue: "$45,230",
      products: 145,
      orders: 892,
      returns: "1.2%",
      responseTime: "2 hours",
      completionRate: "98%",
    },
  };

  const categories: Category[] = [
    {
      id: "laptops",
      name: "Laptops",
      count: 45,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "phones",
      name: "Smartphones",
      count: 32,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "accessories",
      name: "Accessories",
      count: 68,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    },
  ];

  const products: Product[] = [
    {
      id: "1",
      name: "ProBook X15",
      category: "laptops",
      price: 1299,
      stock: 45,
      sales: 120,
      rating: 4.8,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=100&q=80",
      description: "High performance laptop for professionals.",
      sku: "PBX-15-2023",
      sizes: ['13"', '15"'],
      colors: ["Silver", "Space Gray"],
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1531297461136-82lw8fca9198?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      id: "2",
      name: "UltraPhone 12",
      category: "phones",
      price: 999,
      stock: 20,
      sales: 350,
      rating: 4.9,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=100&q=80",
      description: "Latest flagship smartphone.",
      sku: "UP-12-PRO",
      sizes: ["128GB", "256GB"],
      colors: ["Midnight", "Starlight"],
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      id: "3",
      name: "NoiseCanceller 3000",
      category: "accessories",
      price: 299,
      stock: 0,
      sales: 85,
      rating: 4.5,
      status: "out_of_stock",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80",
      description: "Premium noise cancelling headphones.",
      sku: "NC-3000-WL",
      sizes: ["One Size"],
      colors: ["Black", "White"],
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      id: "4",
      name: "GamingLaptop Y7",
      category: "laptops",
      price: 1899,
      stock: 12,
      sales: 45,
      rating: 4.7,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=100&q=80",
      description: "Ultimate gaming experience.",
      sku: "GL-Y7-ULT",
      sizes: ['17"'],
      colors: ["Black/Red"],
      images: [
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      ],
    },
  ];

  const orders: Order[] = [
    {
      id: "ORD-7821",
      customer: "Alice Johnson",
      date: "Oct 28, 2023",
      amount: 1299.0,
      status: "shipped",
      items: 1,
    },
    {
      id: "ORD-7822",
      customer: "Bob Smith",
      date: "Oct 27, 2023",
      amount: 299.5,
      status: "delivered",
      items: 2,
    },
    {
      id: "ORD-7823",
      customer: "Carol White",
      date: "Oct 26, 2023",
      amount: 999.0,
      status: "processing",
      items: 1,
    },
    {
      id: "ORD-7824",
      customer: "David Brown",
      date: "Oct 25, 2023",
      amount: 45.0,
      status: "cancelled",
      items: 1,
    },
  ];

  const documents = [
    {
      id: "1",
      name: "Business License.pdf",
      type: "License",
      uploadDate: "Jan 15, 2023",
      status: "approved" as const,
      url: "#",
    },
    {
      id: "2",
      name: "Tax Registration.pdf",
      type: "Tax",
      uploadDate: "Jan 15, 2023",
      status: "approved" as const,
      url: "#",
    },
    {
      id: "3",
      name: "Identity Proof.jpg",
      type: "ID",
      uploadDate: "Jan 16, 2023",
      status: "pending" as const,
      url: "#",
    },
  ];

  const handleTrackOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsTrackingOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "out_of_stock":
        return "bg-red-100 text-red-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-amber-100 text-amber-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Products Logic
  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;

    // Status Filter
    if (productStatusFilter !== "all") {
      if (
        productStatusFilter === "in_stock" &&
        (product.status !== "active" || product.stock === 0)
      )
        return false;
      if (
        productStatusFilter === "out_of_stock" &&
        product.status !== "out_of_stock" &&
        product.stock > 0
      )
        return false;
    }

    if (!productSearchQuery) return true;
    const query = productSearchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.sku?.toLowerCase().includes(query) ||
      product.id.includes(query)
    );
  });

  const totalProductPages = Math.ceil(
    filteredProducts.length / productsPerPage,
  );
  const paginatedProducts = filteredProducts.slice(
    (currentProductPage - 1) * productsPerPage,
    currentProductPage * productsPerPage,
  );

  // Orders Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>

        {/* Header Card */}
        <div className="p-6 mb-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex-shrink-0 w-20 h-20 p-1 border border-gray-100 rounded-xl bg-gray-50">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {vendor.name}
                </h1>
                {vendor.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Store className="w-4 h-4" /> {vendor.category}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {vendor.country}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Since {vendor.joinDate}
                </div>
                <div className="flex items-center gap-1 font-medium text-amber-500">
                  <Star className="w-4 h-4 fill-current" /> {vendor.rating}{" "}
                  Rating
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/chats")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-primary hover:bg-primary/90"
              >
                <Mail className="w-4 h-4" /> Message
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mt-8 border-b border-gray-100">
            {["overview", "products", "orders"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
                  // Reset views when switching tabs
                  if (tab === "products") {
                    setProductView("categories");
                    setSelectedCategory(null);
                    setSelectedProduct(null);
                    setProductSearchQuery("");
                  }
                }}
                className={`pb-4 text-sm font-medium capitalize transition-colors relative ${
                  activeTab === tab
                    ? "text-primary"
                    : "text-gray-500 hover:text-gray-700"
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
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-green-50">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="mb-1 text-sm text-gray-500">Total Revenue</div>
                <div className="text-2xl font-bold text-gray-900">
                  {vendor.stats.revenue}
                </div>
              </div>
              <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="mb-1 text-sm text-gray-500">Total Products</div>
                <div className="text-2xl font-bold text-gray-900">
                  {vendor.stats.products}
                </div>
              </div>
              <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-amber-50">
                    <Package className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <div className="mb-1 text-sm text-gray-500">Total Orders</div>
                <div className="text-2xl font-bold text-gray-900">
                  {vendor.stats.orders}
                </div>
              </div>
              <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-purple-50">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="mb-1 text-sm text-gray-500">Return Rate</div>
                <div className="text-2xl font-bold text-gray-900">
                  {vendor.stats.returns}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* About Section */}
              <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  About the Vendor
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  {vendor.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="mb-1 text-sm text-gray-500">
                      Business Email
                    </div>
                    <div className="flex items-center gap-2 font-medium text-gray-900">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {vendor.email}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="mb-1 text-sm text-gray-500">
                      Phone Number
                    </div>
                    <div className="flex items-center gap-2 font-medium text-gray-900">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {vendor.phone}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="mb-1 text-sm text-gray-500">
                      Headquarters
                    </div>
                    <div className="flex items-center gap-2 font-medium text-gray-900">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {vendor.address}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="mb-1 text-sm text-gray-500">Website</div>
                    <div className="flex items-center gap-2 font-medium text-gray-900">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        techgiant.example.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Documents */}
              <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Verification Status
                </h3>
                <div className="mb-6">
                  <DocumentViewer
                    documents={documents}
                    onApprove={(id) => console.log("Approve", id)}
                    onReject={(id, reason) => console.log("Reject", id, reason)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Products Navigation Breadcrumb */}
            {productView !== "categories" && (
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                <button
                  onClick={() => setProductView("categories")}
                  className="transition-colors hover:text-primary"
                >
                  Categories
                </button>
                <ChevronRight className="w-4 h-4" />
                {selectedCategory && (
                  <>
                    <button
                      onClick={() => setProductView("list")}
                      className={`hover:text-primary transition-colors ${productView === "list" ? "font-medium text-gray-900" : ""}`}
                    >
                      {categories.find((c) => c.id === selectedCategory)
                        ?.name || selectedCategory}
                    </button>
                  </>
                )}
                {productView === "detail" && selectedProduct && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="font-medium text-gray-900">
                      {selectedProduct.name}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Categories View */}
            {productView === "categories" && (
              <div>
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Product Categories
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setProductView("list");
                      }}
                      className="relative overflow-hidden transition-all bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-md"
                    >
                      <div className="aspect-[16/9] w-full bg-gray-100 relative">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute text-white bottom-4 left-4">
                          <h3 className="text-xl font-bold">{cat.name}</h3>
                          <p className="text-sm text-white/80">
                            {cat.count} Products
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products List View */}
            {productView === "list" && (
              <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">
                    {categories.find((c) => c.id === selectedCategory)?.name}{" "}
                    Products
                  </h2>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={productSearchQuery}
                        onChange={(e) => {
                          setProductSearchQuery(e.target.value);
                          setCurrentProductPage(1);
                        }}
                        className="py-2 pr-4 text-sm border border-gray-200 rounded-lg pl-9 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <select
                      value={productStatusFilter}
                      onChange={(e) => {
                        setProductStatusFilter(e.target.value);
                        setCurrentProductPage(1);
                      }}
                      className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-gray-50"
                    >
                      <option value="all">All Status</option>
                      <option value="in_stock">In Stock</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>

                    <select
                      value={productsPerPage}
                      onChange={(e) => {
                        setProductsPerPage(Number(e.target.value));
                        setCurrentProductPage(1);
                      }}
                      className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-gray-50"
                    >
                      <option value="10">10 per page</option>
                      <option value="20">20 per page</option>
                      <option value="50">50 per page</option>
                      <option value="100">100 per page</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-xs font-medium text-left text-gray-500 uppercase">
                          Product
                        </th>
                        <th className="px-6 py-4 text-xs font-medium text-left text-gray-500 uppercase">
                          Price
                        </th>
                        <th className="px-6 py-4 text-xs font-medium text-left text-gray-500 uppercase">
                          Stock
                        </th>
                        <th className="px-6 py-4 text-xs font-medium text-left text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-4 text-xs font-medium text-left text-gray-500 uppercase">
                          Sales
                        </th>
                        <th className="px-6 py-4 text-xs font-medium text-right text-gray-500 uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paginatedProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="object-cover w-full h-full rounded-lg"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: #{product.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {product.stock} units
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {product.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {product.sales} sold
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setSelectedImage(
                                  product.images
                                    ? product.images[0]
                                    : product.image,
                                );
                                setProductView("detail");
                              }}
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

                {/* Product Pagination */}
                {filteredProducts.length > 0 && (
                  <div className="flex items-center justify-between gap-4 p-4">
                    <div className="text-sm text-gray-500">
                      Showing {(currentProductPage - 1) * productsPerPage + 1}-
                      {Math.min(
                        currentProductPage * productsPerPage,
                        filteredProducts.length,
                      )}{" "}
                      of {filteredProducts.length}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentProductPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentProductPage === 1}
                        className="p-2 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      {Array.from(
                        { length: totalProductPages },
                        (_, i) => i + 1,
                      ).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentProductPage(page)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                            currentProductPage === page
                              ? "bg-primary text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setCurrentProductPage((prev) =>
                            Math.min(prev + 1, totalProductPages),
                          )
                        }
                        disabled={currentProductPage === totalProductPages}
                        className="p-2 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Product Detail View */}
            {productView === "detail" && selectedProduct && (
              <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                  <div className="flex flex-col gap-4">
                    <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={selectedImage || selectedProduct.image}
                        alt={selectedProduct.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Thumbnails */}
                    {selectedProduct.images &&
                      selectedProduct.images.length > 0 && (
                        <div className="flex gap-4 pb-2 overflow-x-auto">
                          {selectedProduct.images.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedImage(img)}
                              className={`relative w-24 aspect-[4/3] rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                                selectedImage === img
                                  ? "border-primary ring-2 ring-primary/20"
                                  : "border-transparent hover:border-gray-200"
                              }`}
                            >
                              <img
                                src={img}
                                alt={`Product view ${idx + 1}`}
                                className="object-cover w-full h-full"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                  </div>

                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-wide">
                            {
                              categories.find(
                                (c) => c.id === selectedProduct.category,
                              )?.name
                            }
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${getStatusColor(selectedProduct.status)}`}
                          >
                            {selectedProduct.status.replace("_", " ")}
                          </span>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                          {selectedProduct.name}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="flex text-amber-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-4 h-4 ${s <= selectedProduct.rating ? "fill-current" : "text-gray-200"}`}
                              />
                            ))}
                          </div>
                          <span>({selectedProduct.sales} sales)</span>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        ${selectedProduct.price}
                      </div>
                    </div>

                    <div className="mb-8 prose prose-gray max-w-none">
                      <p className="text-gray-600">
                        {selectedProduct.description ||
                          "No description available."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="mb-1 text-sm text-gray-500">
                          Available Stock
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {selectedProduct.stock} Units
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="mb-1 text-sm text-gray-500">
                          Total Sales
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          ${selectedProduct.sales * selectedProduct.price}
                        </div>
                      </div>
                    </div>

                    <div className="mb-8 space-y-4">
                      {selectedProduct.sku && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium">SKU:</span>{" "}
                          {selectedProduct.sku}
                        </div>
                      )}

                      {selectedProduct.sizes && (
                        <div>
                          <span className="block mb-2 text-sm font-medium text-gray-900">
                            Available Sizes
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.sizes.map((size) => (
                              <span
                                key={size}
                                className="px-3 py-1 text-sm text-gray-600 border border-gray-200 rounded-lg bg-gray-50"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProduct.colors && (
                        <div>
                          <span className="block mb-2 text-sm font-medium text-gray-900">
                            Available Colors
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.colors.map((color) => (
                              <span
                                key={color}
                                className="px-3 py-1 text-sm text-gray-600 border border-gray-200 rounded-lg bg-gray-50"
                              >
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex-1 px-6 py-3 font-medium text-white transition-colors shadow-sm bg-primary rounded-xl hover:bg-primary/90"
                      >
                        Edit Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
            <div className="flex flex-col gap-4 p-4 border-b border-gray-100 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-900 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-900 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-900 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-900 uppercase">
                      Items
                    </th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-900 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-900 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-right text-gray-900 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-primary">
                        <Link
                          to={`/orders/${order.id}`}
                          className="hover:underline"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {order.items} items
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
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
                  {paginatedOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        No orders found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredOrders.length > 0 && (
              <div className="flex flex-col items-center justify-between gap-4 p-4 bg-white border-t border-gray-100 sm:flex-row">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Rows per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span>
                    Showing {(currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredOrders.length,
                    )}{" "}
                    of {filteredOrders.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <TrackingModal
          isOpen={isTrackingOpen}
          onClose={() => setIsTrackingOpen(false)}
          orderId={selectedOrderId || ""}
        />

        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={selectedProduct}
          onSave={(updatedProduct) => {
            // Update the product in the local state (mock data logic)
            // In a real app, this would be an API call
            if (selectedProduct) {
              setSelectedProduct({ ...selectedProduct, ...updatedProduct });
            }
            // Also would need to update the list of products if that state was lifted or managed properly
          }}
        />
      </main>
    </div>
  );
}
