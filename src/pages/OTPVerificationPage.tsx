import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Timer } from 'lucide-react';
export function OTPVerificationPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || 'your email';
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    pastedData.forEach((value, index) => {
      if (index < 6 && !isNaN(Number(value))) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);
    if (pastedData.length > 0) {
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) return;
    setIsSubmitting(true);
    // Simulate verification
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/reset-password', {
        state: { email, otp: otp.join('') },
      });
    }, 1000);
  };
  const handleResend = () => {
    setTimer(59);
    // Logic to resend OTP would go here
  };
  return <div className="min-h-screen bg-[#E8F3F1] flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
      <div className="p-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verify OTP
          </h1>
          <p className="text-gray-500">
            We've sent a 6-digit code to <br />
            <span className="font-medium text-gray-900">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => <input key={index} ref={el => inputRefs.current[index] = el} type="text" maxLength={1} value={digit} onChange={e => handleChange(index, e.target.value)} onKeyDown={e => handleKeyDown(index, e)} onPaste={handlePaste} className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687] transition-all" />)}
          </div>

          <div className="text-center">
            {timer > 0 ? <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Timer className="w-4 h-4" />
              Resend code in{' '}
              <span className="font-medium text-gray-900">{timer}s</span>
            </div> : <button type="button" onClick={handleResend} className="text-sm font-medium text-[#278687] hover:underline">
              Resend Code
            </button>}
          </div>

          <button type="submit" disabled={isSubmitting || otp.some(d => !d)} className="w-full py-3 bg-[#278687] text-white rounded-xl font-semibold hover:bg-[#1e6b6c] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
            {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verify & Proceed'}
          </button>
        </form>
      </div>
    </div>
  </div>;
}
