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
} from "lucide-react";
import { MOCK_BUYERS } from "../data/mockBuyers";
import { useGetAdminUserDetailsQuery } from "@/redux/features/api/baseApi";

export function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const buyerId = id;
  const foundUser = MOCK_BUYERS.find((b) => b.id === buyerId);
  const { data } = useGetAdminUserDetailsQuery(id || "", {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  console.log(data);
  // Fallback if not found (though handling it gracefully is better, for now use default or first)
  const user = foundUser
    ? {
        ...foundUser,
        stats: {
          totalSpent: foundUser.totalSpent,
          totalOrders: foundUser.totalOrders,
          avgOrderValue: "$82.70", // Retain some mock logic if not in shared data yet
          lastOrder: "2 days ago",
        },
      }
    : {
        name: "User Not Found",
        email: "N/A",
        phone: "N/A",
        country: "N/A",
        joinDate: "N/A",
        verified: false,
        avatar: "",
        id: buyerId,
        stats: {
          totalSpent: "$0.00",
          totalOrders: 0,
          avgOrderValue: "$0.00",
          lastOrder: "N/A",
        },
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
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-24 w-24 rounded-full border-4 border-gray-50 object-cover"
                  />
                  {user.verified && (
                    <div
                      className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full border-2 border-white"
                      title="Verified User"
                    >
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-sm text-gray-500">
                  Customer ID: #{id || "1234"}
                </p>
              </div>

              <div className="space-y-4 border-t border-gray-50 pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {user.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {user.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {user.country}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  Joined {user.joinDate}
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
                  {user.stats.totalSpent}
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-1 text-xs text-gray-500">Total Orders</div>
                <div className="text-xl font-bold text-gray-900">
                  {user.stats.totalOrders}
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-1 text-xs text-gray-500">Avg. Order</div>
                <div className="text-xl font-bold text-gray-900">
                  {user.stats.avgOrderValue}
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-1 text-xs text-gray-500">Last Active</div>
                <div className="text-xl font-bold text-gray-900">
                  {user.stats.lastOrder}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Orders & History */}
          <div className="col-span-12 space-y-6 lg:col-span-8">
            {/* Orders Section with Tabs */}

            {/* Chat Section */}

            {/* Active Orders Card */}
            <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Active Orders
                </h3>
              </div>
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
                    <tr
                      onClick={() => navigate("/orders/ORD-7821")}
                      className="group cursor-pointer transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-primary">
                        #ORD-7821
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        Oct 24, 2023
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        2 items
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                        $120.50
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status="in-progress" />
                      </td>
                    </tr>
                    <tr
                      onClick={() => navigate("/orders/ORD-7822")}
                      className="group cursor-pointer transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-primary">
                        #ORD-7822
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        Oct 25, 2023
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        1 item
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                        $45.00
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status="waiting" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order History Card */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Order History
                </h3>
              </div>
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
                    <tr
                      onClick={() => navigate("/orders/ORD-7820")}
                      className="group cursor-pointer transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-primary">
                        #ORD-7820
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        Oct 20, 2023
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        1 item
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                        $85.00
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status="completed" />
                      </td>
                    </tr>
                    <tr
                      onClick={() => navigate("/orders/ORD-7815")}
                      className="group cursor-pointer transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-primary">
                        #ORD-7815
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        Sep 15, 2023
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        3 items
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                        $240.00
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status="completed" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
