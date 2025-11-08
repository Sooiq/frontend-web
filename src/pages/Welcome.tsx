import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-r from-[#17133C00] to-[#191542] relative overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-[18px]">
        <img src="/images/welcome_logo.svg" alt="Sooiq" />
        <button
          className="py-[20px] px-[66px] border-2 border-white rounded-[25px] text-white text-[32px] font-bold hover:bg-white/10 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
      <div className="fixed bottom-[90px] text-[24px] text-white font-bold">
        <span>Already have an account? </span>
        <span
          className="cursor-pointer underline"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default Welcome;
