"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    if (phone.length >= 8) {
      setOtpSent(true);
    }
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // For demo, go to home or agency based on role
      if (loginType === 'email' && email.includes('agency')) {
        router.push('/agency');
      } else if (loginType === 'email') {
        router.push('/home');
      } else {
        router.push('/home');
      }
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pb-[88px]">
      {/* Header */}
      <div className="pt-[60px] px-5 pb-6 bg-primary rounded-b-[28px]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-5xl mb-4 text-center"
        >
          🚌
        </motion.div>
        <h1 className="text-[24px] font-extrabold text-white text-center">
          Welcome Back
        </h1>
        <p className="text-[14px] text-white/70 text-center mt-2">
          Login to your Urugendo account
        </p>
      </div>

      {/* Login Type Toggle */}
      <div className="px-5 mt-6">
        <div className="bg-surface-secondary rounded-xl p-1 flex">
          <button
            onClick={() => setLoginType('phone')}
            className={`flex-1 py-2.5 rounded-lg text-[14px] font-semibold transition-colors ${
              loginType === 'phone' ? 'bg-white text-primary shadow-sm' : 'text-text-muted'
            }`}
          >
            Phone (Passenger)
          </button>
          <button
            onClick={() => setLoginType('email')}
            className={`flex-1 py-2.5 rounded-lg text-[14px] font-semibold transition-colors ${
              loginType === 'email' ? 'bg-white text-primary shadow-sm' : 'text-text-muted'
            }`}
          >
            Email (Agency/Driver)
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div className="px-5 mt-6">
        {loginType === 'phone' ? (
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <div>
                  <label className="text-[13px] font-semibold text-text-primary block mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+250 7XX XXX XXX"
                      className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-white text-[15px] focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSendOTP}
                  disabled={phone.length < 8}
                  className={`w-full h-12 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
                    phone.length >= 8 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  Send OTP
                  <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <>
                <div className="bg-green-50 rounded-xl p-3 border border-green-200 mb-4">
                  <p className="text-[12px] text-green-800">
                    📱 OTP sent to {phone}. Enter the 6-digit code.
                  </p>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-text-primary block mb-2">
                    Enter OTP Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="______"
                    className="w-full h-12 pl-4 pr-4 rounded-xl border border-border bg-white text-[20px] font-mono text-center tracking-widest focus:outline-none focus:border-primary"
                    maxLength={6}
                  />
                </div>
                <button
                  onClick={handleLogin}
                  disabled={otp.length !== 6 || loading}
                  className={`w-full h-12 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
                    otp.length === 6 && !loading ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {loading ? 'Verifying...' : 'Login'}
                </button>
                <button
                  onClick={() => setOtpSent(false)}
                  className="w-full text-[13px] text-text-muted text-center mt-2"
                >
                  Change phone number
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-[13px] font-semibold text-text-primary block mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agency@volcano.rw"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-white text-[15px] focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="text-[13px] font-semibold text-text-primary block mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-10 rounded-xl border border-border bg-white text-[15px] focus:outline-none focus:border-primary"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              onClick={handleLogin}
              disabled={!email || !password || loading}
              className={`w-full h-12 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
                email && password && !loading ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        )}
      </div>

      {/* Quick Demo Links */}
      <div className="px-5 mt-8">
        <p className="text-[12px] text-text-muted text-center mb-4">Quick Demo Access:</p>
        <div className="space-y-2">
          <button
            onClick={() => router.push('/home')}
            className="w-full py-3 rounded-xl border border-border text-[13px] font-medium text-text-secondary hover:bg-surface-secondary flex items-center justify-center gap-2"
          >
            👤 Passenger App (Book Tickets)
          </button>
          <button
            onClick={() => router.push('/agency')}
            className="w-full py-3 rounded-xl border border-primary bg-primary-light text-[13px] font-medium text-primary hover:bg-primary/20 flex items-center justify-center gap-2"
          >
            🏢 Agency Dashboard (Manage Trips & Revenue)
          </button>
          <button
            onClick={() => router.push('/driver')}
            className="w-full py-3 rounded-xl border border-blue-200 bg-blue-50 text-[13px] font-medium text-blue-700 hover:bg-blue-100 flex items-center justify-center gap-2"
          >
            🚌 Driver Dashboard (Verify Passengers)
          </button>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="px-5 mt-6 text-center">
        <p className="text-[13px] text-text-muted">
          Don't have an account?{' '}
          <button className="text-primary font-semibold">Sign up</button>
        </p>
      </div>

      {/* Security Note */}
      <div className="px-5 mt-6 flex items-center justify-center gap-2 text-[11px] text-text-muted">
        <Shield size={14} />
        <span>256-bit encrypted • Safe & secure</span>
      </div>
    </div>
  );
}
