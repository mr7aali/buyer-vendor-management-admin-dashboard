import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
export function ResetSuccessPage() {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-[#E8F3F1] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden text-center">
        <div className="p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Password Reset!
          </h1>
          <p className="text-gray-500 mb-8">
            Your password has been successfully reset. You can now login with
            your new password.
          </p>

          <button onClick={() => navigate('/login')} className="w-full py-3 bg-[#278687] text-white rounded-xl font-semibold hover:bg-[#1e6b6c] transition-colors shadow-sm">
            Back to Login
          </button>
        </div>
      </div>
    </div>;
}