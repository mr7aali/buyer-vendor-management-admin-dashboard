import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "../components/dashboard/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useGetAdminUserDetailsQuery } from "@/redux/features/api/baseApi";

export function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAdminUserDetailsQuery(id || "", {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
            <p className="text-gray-500">Loading user details...</p>
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
              User Not Found
            </h2>
            <p className="mb-4 text-gray-500">
              The user #{id} does not exist or failed to load.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="font-medium text-primary hover:underline"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const buyer = data.data;

  // Calculate stats from API data
  const totalSpent = buyer.orders.reduce(
    (acc, order) => acc + parseFloat(order.totalAmount || "0"),
    0,
  );
  const totalOrders = buyer._count.orders;
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

  // Get last order date
  const lastOrderDate =
    buyer.orders.length > 0 ? new Date(buyer.orders[0].createdAt) : null;

  const getLastOrderText = () => {
    if (!lastOrderDate) return "No orders yet";
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastOrderDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return lastOrderDate.toLocaleDateString();
  };

  // Separate active and completed orders
  const activeOrders = buyer.orders.filter(
    (order) =>
      order.status === "pending" ||
      order.status === "processing" ||
      order.status === "shipped" ||
      order.status === "out_for_delivered",
  );

  const completedOrders = buyer.orders.filter(
    (order) => order.status === "delivered" || order.status === "cancelled",
  );

  // Map status to StatusBadge format
  const getStatusBadgeStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "pending";
      case "processing":
        return "in-progress";
      case "shipped":
      case "out_for_delivered":
        return "in-progress";
      case "delivered":
        return "completed";
      case "cancelled":
        return "cancelled";
      default:
        return "waiting";
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back
        </button>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column: Profile & Stats */}
          <div className="col-span-12 space-y-6 lg:col-span-4">
            {/* Profile Card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  {buyer.profilePhotoUrl ? (
                    <img
                      src={buyer.profilePhotoUrl}
                      alt={buyer.fulllName}
                      className="h-24 w-24 rounded-full border-4 border-gray-50 object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-gray-50 bg-primary text-3xl font-bold text-white">
                      {buyer.fulllName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {buyer.nidNumber && (
                    <div
                      className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full border-2 border-white"
                      title="Verified User"
                    >
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  {buyer.fulllName}
                </h1>
                <p className="text-sm text-gray-500">
                  Customer ID: #{buyer.id}
                </p>
              </div>

              <div className="space-y-4 border-t border-gray-50 pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {buyer.user.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {buyer.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />

                  {buyer.user.evanAddress ? (
                    <>
                      {buyer.user.evanAddress.charAt(0).toUpperCase() +
                        buyer.user.evanAddress.slice(1)}
                    </>
                  ) : (
                    <>N/A</>
                  )}
                  <>
                    {buyer.user.evanAddress.charAt(0).toUpperCase() +
                      buyer.user.evanAddress.slice(1)}
                  </>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  Joined {new Date(buyer.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/chats"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <MessageSquare className="h-4 w-4" />
                  Message User
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-1 text-xs text-gray-500">Total Spent</div>
                <div className="text-xl font-bold text-gray-900">
                  ${totalSpent.toFixed(2)}
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-1 text-xs text-gray-500">Total Orders</div>
                <div className="text-xl font-bold text-gray-900">
                  {totalOrders}
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-1 text-xs text-gray-500">Avg. Order</div>
                <div className="text-xl font-bold text-gray-900">
                  ${avgOrderValue.toFixed(2)}
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-1 text-xs text-gray-500">Last Active</div>
                <div className="text-xl font-bold text-gray-900">
                  {getLastOrderText()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Orders & History */}
          <div className="col-span-12 space-y-6 lg:col-span-8">
            {/* Active Orders Card */}
            <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Active Orders
                </h3>
              </div>
              {activeOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {activeOrders.map((order) => (
                        <tr
                          key={order.id}
                          onClick={() => navigate(`/orders/${order.id}`)}
                          className="group cursor-pointer transition-colors hover:bg-gray-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-primary">
                            #{order.orderNumber}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            {order._count.items}{" "}
                            {order._count.items === 1 ? "item" : "items"}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                            ${parseFloat(order.totalAmount).toFixed(2)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <StatusBadge
                              status={getStatusBadgeStatus(order.status) as any}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  No active orders
                </div>
              )}
            </div>

            {/* Order History Card */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Order History
                </h3>
              </div>
              {completedOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {completedOrders.map((order) => (
                        <tr
                          key={order.id}
                          onClick={() => navigate(`/orders/${order.id}`)}
                          className="group cursor-pointer transition-colors hover:bg-gray-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-primary">
                            #{order.orderNumber}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            {order._count.items}{" "}
                            {order._count.items === 1 ? "item" : "items"}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                            ${parseFloat(order.totalAmount).toFixed(2)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <StatusBadge
                              status={getStatusBadgeStatus(order.status) as any}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  No order history
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
