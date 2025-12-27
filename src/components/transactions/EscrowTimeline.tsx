import React from 'react';
import { Check, Clock, DollarSign, ShieldCheck, Truck, UserCheck } from 'lucide-react';
interface EscrowStep {
  id: number;
  label: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  icon: any;
}
interface EscrowTimelineProps {
  currentStep: number;
}
export function EscrowTimeline({
  currentStep
}: EscrowTimelineProps) {
  const steps: EscrowStep[] = [{
    id: 1,
    label: 'Payment Secured',
    description: 'Buyer completes payment, funds held in escrow',
    status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending',
    icon: DollarSign
  }, {
    id: 2,
    label: 'Order Confirmed',
    description: 'Vendor accepts order and prepares shipment',
    status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending',
    icon: UserCheck
  }, {
    id: 3,
    label: 'In Transit',
    description: 'Order shipped and tracking provided',
    status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending',
    icon: Truck
  }, {
    id: 4,
    label: 'Delivery Verified',
    description: 'Buyer confirms receipt and quality',
    status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'pending',
    icon: ShieldCheck
  }, {
    id: 5,
    label: 'Funds Released',
    description: 'Payout processed to vendor account',
    status: currentStep > 5 ? 'completed' : currentStep === 5 ? 'current' : 'pending',
    icon: Check
  }];
  return <div className="relative">
    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100" />
    <div className="space-y-8">
      {steps.map(step => {
        const Icon = step.icon;
        return <div key={step.id} className="relative flex items-start gap-6 group">
          <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 ${step.status === 'completed' ? 'bg-green-50 border-green-100 text-green-600' : step.status === 'current' ? 'bg-primary/5 border-primary text-primary shadow-lg shadow-primary/20' : 'bg-white border-gray-100 text-gray-300'}`}>
            <Icon className={`w-6 h-6 ${step.status === 'current' ? 'animate-pulse' : ''}`} />
            {step.status === 'completed' && <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>}
          </div>
          <div className="flex-1 pt-2">
            <div className="flex justify-between items-start">
              <h4 className={`font-bold text-lg ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                {step.label}
              </h4>
              {step.date && <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                {step.date}
              </span>}
            </div>
            <p className={`text-sm mt-1 ${step.status === 'pending' ? 'text-gray-300' : 'text-gray-500'}`}>
              {step.description}
            </p>
          </div>
        </div>;
      })}
    </div>
  </div>;
}