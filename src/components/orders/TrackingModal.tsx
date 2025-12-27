import React from 'react';
import { X, CheckCircle, Truck, Package, MapPin, Clock } from 'lucide-react';

interface TrackingStep {
    id: string;
    title: string;
    description: string;
    date: string;
    status: 'completed' | 'current' | 'pending';
    icon: any;
}

interface TrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

export function TrackingModal({ isOpen, onClose, orderId }: TrackingModalProps) {
    if (!isOpen) return null;

    const steps: TrackingStep[] = [
        {
            id: '1',
            title: 'Order Placed',
            description: 'Order confirmed and verified',
            date: 'Oct 24, 10:30 AM',
            status: 'completed',
            icon: Package
        },
        {
            id: '2',
            title: 'Processing',
            description: 'Vendor has packed the items',
            date: 'Oct 24, 02:45 PM',
            status: 'completed',
            icon: CheckCircle
        },
        {
            id: '3',
            title: 'In Transit',
            description: 'Package is on the way to logistics hub',
            date: 'Oct 25, 09:15 AM',
            status: 'current',
            icon: Truck
        },
        {
            id: '4',
            title: 'Customs Clearance',
            description: 'Pending customs approval at destination',
            date: 'Estimated Oct 27',
            status: 'pending',
            icon: MapPin
        },
        {
            id: '5',
            title: 'Out for Delivery',
            description: 'Last mile delivery attempt',
            date: 'Estimated Oct 28',
            status: 'pending',
            icon: Clock
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Track Order</h3>
                        <p className="text-sm text-gray-500">ID: {orderId}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-100" />

                        <div className="space-y-8">
                            {steps.map((step, index) => {
                                const isCompleted = step.status === 'completed';
                                const isCurrent = step.status === 'current';

                                return (
                                    <div key={step.id} className="relative flex gap-4">
                                        <div className={`relative z-10 w-14 h-14 rounded-full border-4 flex items-center justify-center bg-white transition-colors duration-300
                      ${isCompleted ? 'border-primary text-primary' : isCurrent ? 'border-primary text-primary shadow-[0_0_0_4px_rgba(39,134,135,0.1)]' : 'border-gray-100 text-gray-300'}
                    `}>
                                            <step.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`font-bold ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                                                    {step.title}
                                                </h4>
                                                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                                                    {step.date}
                                                </span>
                                            </div>
                                            <p className={`text-sm ${isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'}`}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
