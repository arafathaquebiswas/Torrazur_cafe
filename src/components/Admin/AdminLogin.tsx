import React, { useState } from 'react';
import { Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { TorrazurLogo } from '../TorrazurLogo';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess(data.user);
      } else {
        setErrorMsg(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setErrorMsg('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9F7F2] text-[#1A1A1A] py-16 px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-[#E8E4D9] border border-[#1A1A1A]/15 p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#556B2F]/15 border border-[#556B2F] text-[#556B2F] rounded-full flex items-center justify-center mx-auto mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <div className="flex justify-center my-2">
            <TorrazurLogo variant="burgundy" className="h-16 w-auto" />
          </div>
          <p className="text-xs text-[#1A1A1A]/60 font-medium tracking-wider uppercase pt-1">
            Management Portal Login
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-[#C62828]/10 border border-[#C62828] text-[#C62828] text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter admin password..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
            />
            <p className="text-[10px] text-[#1A1A1A]/60 mt-1 italic">
              Default password: <code className="text-[#556B2F] font-bold">torrazur2026</code> or <code className="text-[#556B2F] font-bold">admin</code>
            </p>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="w-1/3 py-2.5 bg-[#F9F7F2] hover:bg-[#E8E4D9] border border-[#1A1A1A]/20 text-[#1A1A1A] text-xs font-bold uppercase transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-2.5 bg-[#1A1A1A] hover:bg-[#3D2B1F] text-[#F9F7F2] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
