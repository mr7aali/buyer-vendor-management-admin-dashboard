import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type StatusType = 'completed' | 'in-progress' | 'waiting' | 'cancelled' | 'pending' | 'failed' | 'active' | 'inactive';
interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}
const statusStyles: Record<StatusType, string> = {
  completed: 'bg-[#E6F4EA] text-[#1E7E34] border-[#1E7E34]/20', // Green pill
  active: 'bg-[#E6F4EA] text-[#1E7E34] border-[#1E7E34]/20', // Green pill (Same as completed)
  'in-progress': 'bg-[#E8F0FE] text-[#1967D2] border-[#1967D2]/20', // Blue pill
  waiting: 'bg-[#FEF7E0] text-[#B06000] border-[#B06000]/20', // Yellow pill
  cancelled: 'bg-[#FCE8E6] text-[#C5221F] border-[#C5221F]/20',
  inactive: 'bg-[#FCE8E6] text-[#C5221F] border-[#C5221F]/20', // Red pill (Same as cancelled)
  pending: 'bg-[#FEF7E0] text-[#B06000] border-[#B06000]/20', // Same as waiting
  failed: 'bg-[#FCE8E6] text-[#C5221F] border-[#C5221F]/20'
};

const statusLabels: Record<StatusType, string> = {
  completed: 'Delivered',
  active: 'Active',
  'in-progress': 'In Transit',
  waiting: 'Waiting',
  cancelled: 'Cancelled',
  inactive: 'Inactive',
  pending: 'Pending',
  failed: 'Failed'
};

export function StatusBadge({
  status,
  className
}: StatusBadgeProps) {
  return <span className={cn('inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border', statusStyles[status], className)}>
    {statusLabels[status]}
  </span>;
}