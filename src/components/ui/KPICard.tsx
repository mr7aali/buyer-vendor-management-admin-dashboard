import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  linkText?: string;
  linkTo?: string;
  trend?: 'up' | 'down';
}

export function KPICard({
  title,
  value,
  change,
  icon: Icon,
  linkText = 'View Details',
  linkTo = '#',
  trend
}: KPICardProps) {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow duration-200 flex flex-col h-full border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">
              {value}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isPositive ? 'bg-[#B4E34D]/20 text-green-800' : 'bg-red-100 text-red-700'}`}>
              {isPositive ? '+' : ''}
              {change}%
              <TrendIcon className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>
        <div className="p-2 bg-gray-50 rounded-full border border-gray-100">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-50">
        <Link to={linkTo} className="group flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors">
          {linkText}
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}