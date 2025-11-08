import React from 'react';

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  disabled?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ label, id, type = 'text', value, disabled = false }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        disabled={disabled}
        readOnly // Assuming these are read-only for now
        className="w-full bg-dark-tertiary border-0 rounded-lg py-2.5 px-4 text-white placeholder-gray-500"
      />
    </div>
  );
};