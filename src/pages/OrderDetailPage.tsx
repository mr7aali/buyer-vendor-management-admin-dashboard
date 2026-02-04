import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "../components/dashboard/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import { OrderTimeline } from "../components/orders/OrderTimeline";
import { DeliveryTracker } from "../components/orders/DeliveryTracker";
import {
  ArrowLeft,
  User,
  Store,
  CreditCard,
  Download,
  Printer,
} from "lucide-react";

export function OrderDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Expanded Mock Data (In a real app, fetch from API)
  const orders = [
    {
      id: "ORD-7829",
      date: "Oct 24, 2023",
      time: "10:30 AM",
      customer: {
        name: "Alice Johnson",
        email: "alice.j@example.com",
        phone: "+1 (555) 123-4567",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "123 Main Street, Apt 4B, New York, NY 10001, USA",
      },
      status: "processing",
      items: [
        {
          name: "Wireless Earbuds",
          variant: "White",
          price: 156.0,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 156.0,
      shipping: 0.0,
      total: 156.0,
      payment: {
        method: "Visa ending 4242",
        txnId: "TRX-8892",
        status: "Paid",
      },
      vendor: { name: "TechGiant Solutions", category: "Electronics" },
    },
    {
      id: "ORD-7828",
      date: "Oct 24, 2023",
      time: "09:15 AM",
      customer: {
        name: "Michael Smith",
        email: "m.smith@example.com",
        phone: "+1 (555) 234-5678",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "456 Oak Avenue, Springfield, IL 62704, USA",
      },
      status: "shipped",
      items: [
        {
          name: "Smart Watch Series 5",
          variant: "Black",
          price: 45.5,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 45.5,
      shipping: 0.0,
      total: 45.5,
      payment: {
        method: "Mastercard ending 5543",
        txnId: "TRX-7721",
        status: "Paid",
      },
      vendor: { name: "GadgetUp", category: "Wearables" },
    },
    {
      id: "ORD-7827",
      date: "Oct 23, 2023",
      time: "16:45 PM",
      customer: {
        name: "Emma Wilson",
        email: "emma.w@example.com",
        phone: "+1 (555) 345-6789",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "789 Pine Road, Seattle, WA 98101, USA",
      },
      status: "delivered",
      items: [
        {
          name: "Bluetooth Speaker",
          variant: "Blue",
          price: 89.99,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 89.99,
      shipping: 0.0,
      total: 89.99,
      payment: { method: "PayPal", txnId: "TRX-9982", status: "Paid" },
      vendor: { name: "SoundWave", category: "Audio" },
    },
    {
      id: "ORD-7826",
      date: "Oct 23, 2023",
      time: "11:20 AM",
      customer: {
        name: "James Brown",
        email: "j.brown@example.com",
        phone: "+1 (555) 456-7890",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "321 Maple Drive, Toronto, ON M5V 2T6, Canada",
      },
      status: "pending",
      items: [
        {
          name: "Mechanical Keyboard",
          variant: "RGB",
          price: 115.0,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1587829741301-dc798b91a95e?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 230.0,
      shipping: 0.0,
      total: 230.0,
      payment: {
        method: "Visa ending 1234",
        txnId: "TRX-1122",
        status: "Pending",
      },
      vendor: { name: "KeyMasters", category: "Accessories" },
    },
    {
      id: "ORD-7825",
      date: "Oct 22, 2023",
      time: "13:00 PM",
      customer: {
        name: "Sophia Lee",
        email: "s.lee@example.com",
        phone: "+1 (555) 567-8901",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "654 Birch Street, Austin, TX 78701, USA",
      },
      status: "cancelled",
      items: [
        {
          name: "Gaming Mouse",
          variant: "Wireless",
          price: 120.0,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 120.0,
      shipping: 0.0,
      total: 120.0,
      payment: {
        method: "Mastercard ending 9988",
        txnId: "TRX-4433",
        status: "Refunded",
      },
      vendor: { name: "GamerGear", category: "Accessories" },
    },
    {
      id: "ORD-7824",
      date: "Oct 25, 2023",
      time: "16:20 PM",
      customer: {
        name: "Liam Garcia",
        email: "liam.g@example.com",
        phone: "+1 (555) 444-9999",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "101 Elm St, Berlin, Germany",
      },
      status: "processing",
      items: [
        {
          name: "USB-C Hub",
          variant: "Silver",
          price: 540.0,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1628842060188-1215440539ec?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 540.0,
      shipping: 0.0,
      total: 540.0,
      payment: {
        method: "Visa ending 1111",
        txnId: "TRX-0000",
        status: "Paid",
      },
      vendor: { name: "TechGiant Solutions", category: "Electronics" },
    },
    {
      id: "ORD-7823",
      date: "Oct 26, 2023",
      time: "11:45 AM",
      customer: {
        name: "Olivia Martinez",
        email: "olivia.m@example.com",
        phone: "+1 (555) 555-0123",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "789 Pine Ln, Mexico City, Mexico",
      },
      status: "delivered",
      items: [
        {
          name: "Tablet Stand",
          variant: "Aluminum",
          price: 32.5,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 65.0,
      shipping: 0.0,
      total: 65.0,
      payment: {
        method: "Amex ending 1001",
        txnId: "TRX-7782",
        status: "Paid",
      },
      vendor: { name: "TechGiant Solutions", category: "Electronics" },
    },
    {
      id: "ORD-7822",
      date: "Oct 27, 2023",
      time: "09:15 AM",
      customer: {
        name: "Noah Rodriguez",
        email: "noah.r@example.com",
        phone: "+1 (555) 987-6543",
        avatar:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "456 Oak Ave, San Francisco, CA 94103, USA",
      },
      status: "pending",
      items: [
        {
          name: "Phone Case",
          variant: "Clear",
          price: 25.0,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 25.0,
      shipping: 0.0,
      total: 25.0,
      payment: {
        method: "Mastercard ending 8822",
        txnId: "TRX-3341",
        status: "Unpaid",
      },
      vendor: { name: "TechGiant Solutions", category: "Electronics" },
    },
    {
      id: "ORD-7821",
      date: "Oct 28, 2023",
      time: "14:30 PM",
      customer: {
        name: "Ava Hernandez",
        email: "ava.h@example.com",
        phone: "+1 (555) 123-4567",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "123 Main Street, Apt 4B, New York, NY 10001, USA",
      },
      status: "shipped",
      items: [
        {
          name: "ProBook X15",
          variant: "Silver • 512GB",
          price: 210.0,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 210.0,
      shipping: 0.0,
      total: 210.0,
      payment: {
        method: "Visa ending 4242",
        txnId: "TRX-9921",
        status: "Paid",
      },
      vendor: { name: "TechGiant Solutions", category: "Electronics" },
    },
    {
      id: "ORD-7820",
      date: "Oct 20, 2023",
      time: "10:00 AM",
      customer: {
        name: "William Lopez",
        email: "w.lopez@example.com",
        phone: "+1 (555) 678-9012",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "101 Pine St, Miami, FL 33101, USA",
      },
      status: "delivered",
      items: [
        {
          name: "Desk Lamp",
          variant: "White",
          price: 95.0,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1507473888900-52e1adad8ce2?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 95.0,
      shipping: 0.0,
      total: 95.0,
      payment: { method: "Visa", txnId: "TRX-7820", status: "Paid" },
      vendor: { name: "HomeDecor", category: "Home" },
    },
    {
      id: "ORD-7819",
      date: "Oct 19, 2023",
      time: "15:30 PM",
      customer: {
        name: "Isabella Gonzalez",
        email: "i.gonzalez@example.com",
        phone: "+1 (555) 789-0123",
        avatar:
          "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "202 Oak St, Rome, Italy",
      },
      status: "processing",
      items: [
        {
          name: "Scarf",
          variant: "Silk",
          price: 40.0,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1520903920248-0c6559798442?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 40.0,
      shipping: 0.0,
      total: 40.0,
      payment: { method: "Mastercard", txnId: "TRX-7819", status: "Paid" },
      vendor: { name: "FashionHub", category: "Fashion" },
    },
    {
      id: "ORD-7818",
      date: "Oct 19, 2023",
      time: "12:00 PM",
      customer: {
        name: "Mason Wilson",
        email: "m.wilson@example.com",
        phone: "+1 (555) 890-1234",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "303 Cedar St, Denver, CO 80201, USA",
      },
      status: "delivered",
      items: [
        {
          name: "Sneakers",
          variant: "Size 10",
          price: 80.0,
          quantity: 4,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 320.0,
      shipping: 0.0,
      total: 320.0,
      payment: { method: "Visa", txnId: "TRX-7818", status: "Paid" },
      vendor: { name: "ShoeMart", category: "Footwear" },
    },
    {
      id: "ORD-7817",
      date: "Oct 18, 2023",
      time: "09:00 AM",
      customer: {
        name: "Mia Anderson",
        email: "m.anderson@example.com",
        phone: "+1 (555) 901-2345",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "404 Birch St, Tokyo, Japan",
      },
      status: "pending",
      items: [
        {
          name: "Tea Set",
          variant: "Ceramic",
          price: 37.5,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 75.0,
      shipping: 0.0,
      total: 75.0,
      payment: { method: "PayPal", txnId: "TRX-7817", status: "Pending" },
      vendor: { name: "HomeGoods", category: "Home" },
    },
    {
      id: "ORD-7816",
      date: "Oct 18, 2023",
      time: "14:00 PM",
      customer: {
        name: "Benjamin Thomas",
        email: "b.thomas@example.com",
        phone: "+1 (555) 012-3456",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "505 Walnut St, London, UK",
      },
      status: "shipped",
      items: [
        {
          name: "Backpack",
          variant: "Grey",
          price: 60.0,
          quantity: 3,
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 180.0,
      shipping: 0.0,
      total: 180.0,
      payment: { method: "Mastercard", txnId: "TRX-7816", status: "Paid" },
      vendor: { name: "TravelGear", category: "Travel" },
    },
    {
      id: "ORD-7815",
      date: "Oct 17, 2023",
      time: "11:00 AM",
      customer: {
        name: "Charlotte Taylor",
        email: "c.taylor@example.com",
        phone: "+1 (555) 123-0000",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "606 Maple St, Chicago, IL 60007, USA",
      },
      status: "cancelled",
      items: [
        {
          name: "Laptop Sleeve",
          variant: "13 inch",
          price: 50.0,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 50.0,
      shipping: 0.0,
      total: 50.0,
      payment: { method: "Visa", txnId: "TRX-7815", status: "Refunded" },
      vendor: { name: "TechAcc", category: "Electronics" },
    },
    {
      id: "ORD-7712",
      date: "Oct 15, 2023",
      time: "08:45 AM",
      customer: {
        name: "Michael Smith",
        email: "m.smith@example.com",
        phone: "+1 (555) 999-8888",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        address: "777 Lucky St, Las Vegas, NV 89109, USA",
      },
      status: "delivered",
      items: [
        {
          name: "Poker Set",
          variant: "Professional",
          price: 150.0,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=100&q=80",
        },
      ],
      subtotal: 150.0,
      shipping: 10.0,
      total: 160.0,
      payment: { method: "Amex", txnId: "TRX-7712", status: "Paid" },
      vendor: { name: "GameNight", category: "Entertainment" },
    },
  ];

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Order Not Found
          </h2>
          <p className="mb-4 text-gray-500">The order #{id} does not exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
                    Order #{order.id}
                  </h1>
                  <p className="text-gray-500">
                    Placed on {order.date} at {order.time}
                  </p>
                </div>
                <StatusBadge
                  status={order.status as any}
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
                  {order.items.map((item, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.variant}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
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
                      ${order.subtotal.toFixed(2)}
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
                      ${order.shipping.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-3 text-right text-sm font-bold text-gray-900"
                    >
                      Total
                    </td>
                    <td className="px-6 py-3 text-right text-lg font-bold text-[#278687]">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Delivery Tracking */}
            <DeliveryTracker />
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
                <img
                  src={order.customer.avatar}
                  alt={order.customer.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {order.customer.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.customer.email}
                  </div>
                </div>
              </div>
              <div className="space-y-3 border-t border-gray-50 pt-4 text-sm">
                <div>
                  <div className="mb-1 text-xs text-gray-500">
                    Shipping Address
                  </div>
                  <div className="text-gray-900">{order.customer.address}</div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-500">Phone</div>
                  <div className="text-gray-900">{order.customer.phone}</div>
                </div>
              </div>
              <Link
                to="/buyers/1"
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
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-100">
                  <Store className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {order.vendor.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.vendor.category}
                  </div>
                </div>
              </div>
              <Link
                to="/vendors/1"
                className="block mt-4 text-center text-sm font-medium text-[#278687] hover:underline"
              >
                View Store
              </Link>
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
                    {order.payment.method}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="font-mono text-gray-900">
                    {order.payment.txnId}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      order.payment.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.payment.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
