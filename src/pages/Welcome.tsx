import { redirect } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0b1a] via-[#1a1c37] to-[#2a2d5a] relative overflow-hidden">
      <div className="flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-white mb-8 tracking-wide">
          Welcome to Sooiq
        </h1>
        <button
          className="w-full max-w-xs mx-auto py-4 px-8 border-2 border-white/80 rounded-full text-white text-xl font-medium hover:bg-white/10 transition-all duration-300 mb-6"
          onClick={() => redirect("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Welcome;
