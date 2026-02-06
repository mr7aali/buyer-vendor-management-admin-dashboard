import React from "react";
import {
  Check,
  Package,
  Truck,
  Home,
  ShoppingBag,
  Clock,
  X,
} from "lucide-react";

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  OUT_FOR_DELIVERED = "out_for_delivered",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

interface TimelineStep {
  status: "completed" | "current" | "pending";
  label: string;
  date?: string;
  icon: any;
}

interface OrderTimelineProps {
  status: OrderStatus | string;
}

export function OrderTimeline({ status }: OrderTimelineProps) {
  const getStepStatus = (
    stepIndex: number,
    currentIndex: number,
    isCancelled: boolean,
  ): TimelineStep["status"] => {
    if (isCancelled) return "pending";
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

  const isCancelled = status === OrderStatus.CANCELLED;

  const statusIndex: { [key: string]: number } = {
    [OrderStatus.PENDING]: 0,
    [OrderStatus.PROCESSING]: 1,
    [OrderStatus.SHIPPED]: 2,
    [OrderStatus.OUT_FOR_DELIVERED]: 3,
    [OrderStatus.DELIVERED]: 4,
  };

  const currentStatusIndex = isCancelled ? -1 : (statusIndex[status] ?? 0);

  // If cancelled, show a different timeline
  if (isCancelled) {
    return (
      <div className="w-full py-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-red-100">
            <X className="h-8 w-8 text-red-500" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-red-600">
              Order Cancelled
            </p>
            <p className="mt-1 text-sm text-gray-500">
              This order has been cancelled
            </p>
          </div>
        </div>
      </div>
    );
  }

  const steps: TimelineStep[] = [
    {
      label: "Order Placed",
      icon: ShoppingBag,
      status: getStepStatus(0, currentStatusIndex, isCancelled),
    },
    {
      label: "Processing",
      icon: Clock,
      status: getStepStatus(1, currentStatusIndex, isCancelled),
    },
    {
      label: "Shipped",
      icon: Package,
      status: getStepStatus(2, currentStatusIndex, isCancelled),
    },
    {
      label: "Out for Delivery",
      icon: Truck,
      status: getStepStatus(3, currentStatusIndex, isCancelled),
    },
    {
      label: "Delivered",
      icon: Home,
      status: getStepStatus(4, currentStatusIndex, isCancelled),
    },
  ];

  return (
    <div className="w-full py-6">
      <div className="relative flex items-center justify-between">
        {/* Connecting Line */}
        <div className="absolute left-0 right-0 top-1/2 -z-10 h-1 -translate-y-1/2 transform bg-gray-100" />
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#278687] -z-10 transition-all duration-500"
          style={{
            width: `${(currentStatusIndex / 4) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 bg-white px-2"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step.status === "completed"
                    ? "bg-[#278687] border-[#278687] text-white"
                    : step.status === "current"
                      ? "bg-white border-[#278687] text-[#278687] shadow-lg scale-110"
                      : "bg-white border-gray-200 text-gray-300"
                }`}
              >
                {step.status === "completed" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={`text-xs font-medium text-center max-w-[80px] ${
                  step.status === "pending" ? "text-gray-400" : "text-gray-900"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
