import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, Crown, Lock, Mail, AlertCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useApp();
  const navigate = useNavigate();

  if (user) {
    navigate(user.role === "admin" ? "/admin" : "/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate(email === "admin@grillandthrill.com" ? "/admin" : "/");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&auto=format)` }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#141414] border border-[rgba(200,155,60,0.2)] rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl border border-primary/20 mb-4">
              <Crown className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#f0ebe0]">Welcome to Grill & Thrill</h1>
            <p className="text-sm text-[#5a5040] mt-1">Sign in to your account</p>
          </div>

          {/* Admin hint */}
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-3 mb-6">
            <p className="text-xs text-[#7a7065] text-center">
              <span className="text-primary font-medium">Admin demo:</span> admin@grillandthrill.com / admin123
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5040]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-[rgba(200,155,60,0.15)] rounded-xl text-[#f0ebe0] placeholder:text-[#3a3025] focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5040]" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-[#0a0a0a] border border-[rgba(200,155,60,0.15)] rounded-xl text-[#f0ebe0] placeholder:text-[#3a3025] focus:outline-none focus:border-primary transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5a5040] hover:text-[#c8b89a] transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-[#0a0a0a] font-bold rounded-xl hover:bg-[#d4a843] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(200,155,60,0.25)]"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#5a5040]">
              Don't have an account?{" "}
              <span className="text-primary cursor-pointer hover:underline">Register</span>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[rgba(200,155,60,0.1)] text-center">
            <Link to="/" className="text-xs text-[#5a5040] hover:text-primary transition-colors">
            ← Back to Grill & Thrill
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
