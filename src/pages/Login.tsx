// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userService } from "../services";
import { useUserStore } from "../store/useUserStore";
import { watchlistService } from "../services/watchlist.service";
import { useWatchlistStore } from "../store/useWatchlistStore";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const setWatchlist = useWatchlistStore((state) => state.setWatchlist);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await userService.login(formData.email, formData.password);
      setUser(user); // Store user in Zustand
      const watchlist = await watchlistService.getWatchlist();
      setWatchlist(watchlist); // Store watchlist in Zustand
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Login failed! ${error}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-r from-[#17133C00] to-[#191542] relative overflow-hidden px-8">
      <div className="flex flex-col items-center justify-center gap-[18px] mb-8">
        <img src="/images/welcome_logo.svg" alt="Sooiq" className="h-[240px]" />
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[450px] flex flex-col gap-4"
      >
        {/* Email/ID */}
        <div>
          <label htmlFor="email" className="text-white text-[18px] block pb-2">
            Email/ID
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="johndoe1234@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-transparent border-2 border-white/30 rounded-[30px] text-white text-[20px] placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-white text-[18px] block pb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="****************"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-transparent border-2 border-white/30 rounded-[30px] text-white text-[20px] placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all"
            required
          />
        </div>

        {/* Forgot Password */}
        <div className="text-left">
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-white text-[16px] underline cursor-pointer hover:text-white/80 transition-colors"
          >
            Forgot Password?
          </span>
        </div>

        {/* Sign In Button and Continue with Google - Side by Side */}
        <div className="flex items-center gap-5 py-4">
          {/* Sign In Button */}
          <button
            type="submit"
            className="w-[200px] px-12 py-4 bg-transparent border-2 border-white rounded-[25px] text-white text-[24px] font-bold hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            Sign In
          </button>

          {/* OR Divider */}
          <span className="text-white text-[18px]">or</span>

          {/* Continue with Google */}
          <div className="flex flex-row items-center justify-center gap-4">
            <span className="text-white text-[18px]">Continue with</span>
            <button
              type="button"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
