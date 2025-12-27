import React from 'react';
import { Check, Package, Truck, Home, ShoppingBag } from 'lucide-react';
interface TimelineStep {
  status: 'completed' | 'current' | 'pending';
  label: string;
  date?: string;
  icon: any;
}
interface OrderTimelineProps {
  status: 'placed' | 'confirmed' | 'shipped' | 'delivered';
}
export function OrderTimeline({
  status
}: OrderTimelineProps) {
  const getStepStatus = (stepIndex: number, currentIndex: number): TimelineStep['status'] => {
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };
  const statusIndex = {
    placed: 0,
    confirmed: 1,
    shipped: 2,
    delivered: 3
  }[status];
  const steps: TimelineStep[] = [{
    label: 'Order Placed',
    icon: ShoppingBag,
    status: getStepStatus(0, statusIndex)
  }, {
    label: 'Confirmed',
    icon: Package,
    status: getStepStatus(1, statusIndex)
  }, {
    label: 'Shipped',
    icon: Truck,
    status: getStepStatus(2, statusIndex)
  }, {
    label: 'Delivered',
    icon: Home,
    status: getStepStatus(3, statusIndex)
  }];
  return <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Connecting Line */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-100 -z-10" />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#278687] -z-10 transition-all duration-500" style={{
        width: `${statusIndex / 3 * 100}%`
      }} />

        {steps.map((step, index) => {
        const Icon = step.icon;
        return <div key={index} className="flex flex-col items-center gap-2 bg-white px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step.status === 'completed' ? 'bg-[#278687] border-[#278687] text-white' : step.status === 'current' ? 'bg-white border-[#278687] text-[#278687] shadow-lg scale-110' : 'bg-white border-gray-200 text-gray-300'}`}>
                {step.status === 'completed' ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={`text-xs font-medium ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                {step.label}
              </span>
            </div>;
      })}
      </div>
    </div>;
}