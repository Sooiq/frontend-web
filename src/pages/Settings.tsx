import React from "react";
import { Card } from "../components/ui/Card";
import { FormInput } from "../components/ui/FormInput";
import { ToggleSwitch } from "../components/ui/ToggleSwitch";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useUserStore } from "../store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userService } from "../services";

const Settings: React.FC = () => {
  // Hard-coded mock data
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userService.logout();
      clearUser();
      navigate("/login");
    } catch (error) {
      toast.error(`Logout failed: ${error}`);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await userService.deleteUser();
      clearUser();
      navigate("/login");
    } catch (error) {
      toast.error(`Delete account failed: ${error}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* --- Profile Settings Card --- */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Profile Settings
        </h2>

        {/* Profile Pic & Username */}
        <div className="flex items-center gap-4 mb-6">
          <HiOutlineUserCircle size={64} className="text-gray-400" />
          <span className="text-lg text-gray-300">
            {user?.username || "Unknown"}
          </span>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="First Name*"
              id="firstName"
              value={user?.first_name || "Unknown"}
            />
            <FormInput
              label="Last Name*"
              id="lastName"
              value={user?.last_name || ""}
            />
          </div>

          {/* Full-width Email (as requested) */}
          <FormInput
            label="Email*"
            id="email"
            type="email"
            value={user?.email || "Unknown"}
          />

          {/* Change Password Button (as requested) */}
          <div className="pt-2">
            <button className="font-medium text-white hover:text-accent-purple underline">
              Change Password
            </button>
          </div>
        </div>
      </Card>

      {/* --- Notification Settings Card --- */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Notification Settings
        </h2>
        <div className="space-y-4">
          <ToggleSwitch label="Desktop Notification" defaultOn={true} />
          <ToggleSwitch label="Play Sound" />
        </div>
      </Card>

      {/* --- Account Actions --- */}
      <div className="flex flex-col md:flex-row gap-4" onClick={handleLogout}>
        <button
          className="w-full md:w-auto bg-dark-tertiary text-white font-semibold py-2 px-6 
            rounded-lg hover:bg-opacity-80 transition-colors"
        >
          Logout
        </button>

        {/* Delete Account Button (as requested) */}
        <button
          className="w-full md:w-auto text-white font-semibold py-2 px-6 rounded-lg 
            transition-colors bg-[#821713] hover:bg-opacity-80"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
