import React from "react";
import { Truck, MapPin, Clock, Package } from "lucide-react";
interface TrackingUpdate {
  status: string;
  location: string;
  timestamp: string;
  icon: any;
}
export function DeliveryTracker() {
  const updates: TrackingUpdate[] = [
    {
      status: "Out for Delivery",
      location: "New York, NY",
      timestamp: "Today, 09:30 AM",
      icon: Truck,
    },
    {
      status: "Arrived at Sorting Facility",
      location: "Newark, NJ",
      timestamp: "Yesterday, 08:15 PM",
      icon: Package,
    },
    {
      status: "In Transit",
      location: "Philadelphia, PA",
      timestamp: "Yesterday, 02:00 PM",
      icon: Clock,
    },
    {
      status: "Picked Up",
      location: "Washington DC",
      timestamp: "Oct 24, 10:00 AM",
      icon: MapPin,
    },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Delivery Status</h3>
        <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          In Transit
        </span>
      </div>

      <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">Courier</span>
          <span className="text-sm font-semibold text-gray-900">
            FedEx Express
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Tracking Number</span>
          <span className="text-sm font-mono font-medium text-[#278687]">
            TRK-8921-9920
          </span>
        </div>
      </div>

      <div className="relative pl-4 space-y-8 before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
        {updates.map((update, index) => {
          const Icon = update.icon;
          return (
            <div key={index} className="relative flex items-start gap-4">
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${index === 0 ? "bg-white border-[#278687] text-[#278687]" : "bg-gray-50 border-gray-200 text-gray-400"}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 pt-1">
                <p
                  className={`text-sm font-medium ${index === 0 ? "text-gray-900" : "text-gray-500"}`}
                >
                  {update.status}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {update.location}
                  </span>
                  <span className="text-xs text-gray-400">
                    {update.timestamp}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
