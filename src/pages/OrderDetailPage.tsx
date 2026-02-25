import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "../components/dashboard/Header";
import { StatusBadge, type StatusType } from "../components/ui/StatusBadge";
import { OrderTimeline } from "../components/orders/OrderTimeline";

import {
  ArrowLeft,
  User,
  Store,
  CreditCard,
  Download,
  Printer,
  Loader2,
} from "lucide-react";
import { useGetAdminOrderDetailsQuery } from "@/redux/features/api/baseApi";
// import { useGetAdminOrderDetailsQuery } from "../redux/api/ordersApi"; // Adjust path as needed

export function OrderDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetAdminOrderDetailsQuery(
    id || "",
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    },
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#278687] mx-auto mb-4" />
            <p className="text-gray-500">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !data?.success || !data?.data) {
    return (
      <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Order Not Found
            </h2>
            <p className="mb-4 text-gray-500">
              {isError
                ? "Failed to load order details. Please try again."
                : `The order #${id} does not exist.`}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="text-[#278687] hover:underline font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const order = data.data;
  const payment = order.payments;

  const paymentMethodLabel = (() => {
    if (!payment) return "Not Available";
    if (payment.cardBrand && payment.lastFourDigits) {
      return `${payment.cardBrand.toUpperCase()} **** ${payment.lastFourDigits}`;
    }
    if (payment.paymentMethod) {
      return payment.paymentMethod
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
    }
    return "Not Available";
  })();

  const paymentStatusLabel = payment?.status
    ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1)
    : "Not Available";

  const getTimelineStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return "shipped";
      case "delivered":
        return "delivered";
      case "processing":
        return "confirmed";
      default:
        return "placed";
    }
  };

  const getBadgeStatus = (status: string): StatusType => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "completed";
      case "processing":
      case "shipped":
      case "out_for_delivered":
        return "in-progress";
      case "cancelled":
        return "cancelled";
      case "pending":
      default:
        return "pending";
    }
  };

  // Calculate subtotal from items
  const subtotal = order.items.reduce(
    (acc, item) => acc + parseFloat(item.totalPrice),
    0,
  );
  const shipping = 0; // Adjust if you have shipping data
  const total = parseFloat(order.totalAmount);

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50">
              <Printer className="h-4 w-4" />
              Print Invoice
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] transition-colors shadow-sm">
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 space-y-6 lg:col-span-8">
            {/* Order Header & Timeline */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h1 className="mb-1 text-2xl font-bold text-gray-900">
                    Order #{order.orderNumber}
                  </h1>
                  <p className="text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}{" "}
                    at {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <StatusBadge
                  status={getBadgeStatus(order.status)}
                  className="px-3 py-1 text-sm"
                />
              </div>
              <OrderTimeline status={getTimelineStatus(order.status)} />
            </div>

            {/* Order Items */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-6">
                <h3 className="font-bold text-gray-900">Order Items</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                            <img
                              src={
                                item.product.images[0] ||
                                item.product.imageUrl ||
                                "https://via.placeholder.com/100"
                              }
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.product.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              SKU: {item.product.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${parseFloat(item.unitPrice).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                        ${parseFloat(item.totalPrice).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                    >
                      Subtotal
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                    >
                      Shipping
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      ${shipping.toFixed(2)}
                    </td>
                  </tr>
                  {order.discountAmount !== "0" && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                      >
                        Discount
                      </td>
                      <td className="px-6 py-3 text-right text-sm font-medium text-green-600">
                        -${parseFloat(order.discountAmount).toFixed(2)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-3 text-right text-sm font-bold text-gray-900"
                    >
                      Total
                    </td>
                    <td className="px-6 py-3 text-right text-lg font-bold text-[#278687]">
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Delivery Tracking */}
            {/* <div style={{ border: "1px solid red" }}>
              <DeliveryTracker />
            </div> */}
          </div>

          {/* Sidebar */}
          <div className="col-span-12 space-y-6 lg:col-span-4">
            {/* Customer Info */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
                <User className="h-5 w-5 text-gray-400" />
                Customer Details
              </h3>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#278687] flex items-center justify-center text-white font-semibold">
                  {order.buyer?.fullName
                    ? order.buyer.fullName.charAt(0).toUpperCase()
                    : "U"}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {order.buyer.fullName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.buyer.user.email}
                  </div>
                </div>
              </div>
              <div className="space-y-3 border-t border-gray-50 pt-4 text-sm">
                <div>
                  <div className="mb-1 text-xs text-gray-500">
                    Shipping Address
                  </div>
                  <div className="text-gray-900">{order.shippingAddress}</div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-500">Phone</div>
                  <div className="text-gray-900">{order.buyer.phone}</div>
                </div>
              </div>
              <Link
                to={`/buyers/${order.buyerId}`}
                className="block mt-4 text-center text-sm font-medium text-[#278687] hover:underline"
              >
                View Profile
              </Link>
            </div>

            {/* Vendor Info */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
                <Store className="h-5 w-5 text-gray-400" />
                Vendor Details
              </h3>
              <div className="mb-4 flex items-center gap-3">
                {order.vendor.logoUrl ? (
                  <img
                    src={order.vendor.logoUrl}
                    alt={order.vendor.fullName}
                    className="h-10 w-10 rounded-lg border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-100">
                    <Store className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-gray-900">
                    {order.vendor.businessName || order.vendor.fullName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.vendor.vendorCode}
                  </div>
                </div>
              </div>
              <div className="space-y-2 border-t border-gray-50 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="text-gray-900">
                    {order.vendor.user.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-gray-900">{order.vendor.phone}</span>
                </div>
              </div>
              {/* <Link
                to={`/vendors/${order.vendorId}`}
                className="block mt-4 text-center text-sm font-medium text-[#278687] hover:underline"
              >
                View Store
              </Link> */}
            </div>

            {/* Payment Info */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
                <CreditCard className="h-5 w-5 text-gray-400" />
                Payment Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium text-gray-900">
                    {paymentMethodLabel}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment Status</span>
                  <span className="font-medium text-gray-900">
                    {paymentStatusLabel}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Order Number</span>
                  <span className="font-mono text-gray-900">
                    {order.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
                {order.coupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Coupon Applied</span>
                    <span className="font-medium text-green-600">Yes</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
