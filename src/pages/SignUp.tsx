// src/pages/SignUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNupber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign up logic
    console.log("Sign up submitted:", formData);
    toast.success("Sign up successful!");
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-linear-to-r from-[#17133C00] to-[#191542] relative overflow-y-auto">
      {/* Logo */}
      <div className="absolute top-[23px] left-[33px]">
        <img src="/images/signup_logo.svg" alt="Sooiq" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col justify-center gap-[23px] px-[135px] mt-[87px]">
        {/* Heading */}
        <h1 className="text-white text-[48px] font-bold">Welcome to Sooiq!</h1>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="text-white text-[18px] block pb-2"
              >
                First Name*
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-transparent border-2 border-white/30 rounded-[30px] text-white text-[20px] placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="text-white text-[18px] block pb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-transparent border-2 border-white/30 rounded-[30px] text-white text-[20px] placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all"
              />
            </div>
          </div>

          {/* Username and Email */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="username"
                className="text-white text-[18px] block pb-2"
              >
                Username*
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="john.doe041"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-transparent border-2 border-white/30 rounded-[30px] text-white text-[20px] placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-white text-[18px] block pb-2"
              >
                Email*
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
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="password"
                className="text-white text-[18px] block pb-2"
              >
                Password*
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="****************"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-transparent border-2 border-white/30 rounded-[30px] text-white text-[20px] placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-white text-[18px] block pb-2"
              >
                Confirm Password*
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="****************"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 bg-transparent border-2 ${
                    formData.confirmPassword && !passwordsMatch
                      ? "border-red-500"
                      : "border-white/30"
                  } rounded-[30px] text-white text-[20px] placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="text-red-500 text-[14px] mt-2">
                  Password did not match!
                </p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-3 mt-8">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-5 h-5 border-2 border-white/30 rounded bg-transparent cursor-pointer accent-white"
              required
            />
            <label
              htmlFor="terms"
              className="text-white text-[16px] cursor-pointer"
            >
              I have read and agreed to all{" "}
              <span className="underline">terms and conditions</span>
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={!agreeToTerms}
            className="w-[200px] mt-3 px-12 py-4 bg-transparent border-2 border-white rounded-[25px] text-white text-[24px] font-bold hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Create account with Google */}
        <div className="flex flex-row justify-between items-center gap-4 mt-6">
          <div className="flex flex-row items-center gap-4">
            <span className="text-white text-[18px]">Create account with</span>
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

          {/* Login Link - Bottom Right */}
          <div className="text-[24px] text-white font-bold">
            <span>Already have an account? </span>
            <span
              className="cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
