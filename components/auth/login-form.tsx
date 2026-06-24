"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Check, AlertCircle, ArrowLeft } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email || !password) {
        setError("Email dan password tidak boleh kosong");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Email atau password salah");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/admin");
      }, 1200);
    } catch (err) {
      setError("Terjadi kesalahan saat login");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Back to Home */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium mb-5 transition-colors group"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Kembali ke Beranda
      </Link>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        {/* Header - Clean & Minimal */}
        <div className="px-8 pt-10 pb-8">
          <div className="space-y-2 mb-1">
            <h1 className="text-3xl font-bold text-slate-900">
              Selamat Datang
            </h1>
            <p className="text-slate-500 text-sm">
              Masuk ke portal administrasi Desa Dradahblumbang
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  disabled={isLoading || isSuccess}
                  autoComplete="email"
                  className="pl-10 h-12 rounded-lg border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-0 transition-all text-sm font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password Anda"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  disabled={isLoading || isSuccess}
                  autoComplete="current-password"
                  className="pl-10 pr-11 h-12 rounded-lg border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-0 transition-all text-sm font-medium placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || isSuccess}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`w-full h-12 rounded-lg font-semibold text-sm transition-all duration-300 ${
                isSuccess
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memverifikasi...
                </span>
              ) : isSuccess ? (
                <span className="flex items-center justify-center gap-2">
                  <Check size={18} className="animate-pulse" />
                  Berhasil masuk!
                </span>
              ) : (
                <span>Masuk</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
