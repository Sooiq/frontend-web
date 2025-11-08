import React, { useState } from 'react';

interface ToggleSwitchProps {
  label: string;
  defaultOn?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, defaultOn = false }) => {
  const [isOn, setIsOn] = useState(defaultOn);

  return (
    <div className="flex items-center justify-between">
      <span className="text-lg text-white">{label}</span>
      <button
        onClick={() => setIsOn(!isOn)}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors
          ${isOn ? 'bg-accent-purple' : 'bg-gray-600'}`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform
            ${isOn ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
};