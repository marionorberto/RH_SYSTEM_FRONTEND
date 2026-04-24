// src/components/ui/switch/Switch.tsx
import { useState, useEffect } from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  description?: string;
}

export default function Switch({
  checked,
  onChange,
  disabled = false,
  size = "md",
  label,
  description,
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  const sizeClasses = {
    sm: {
      switch: "w-8 h-4",
      knob: "w-3 h-3",
      translate: "translate-x-4",
    },
    md: {
      switch: "w-11 h-6",
      knob: "w-5 h-5",
      translate: "translate-x-5",
    },
    lg: {
      switch: "w-14 h-7",
      knob: "w-6 h-6",
      translate: "translate-x-7",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`
          relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:ring-offset-2
          ${currentSize.switch}
          ${isChecked ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block transform rounded-full bg-white shadow-lg 
            ring-0 transition duration-200 ease-in-out
            ${currentSize.knob}
            ${isChecked ? currentSize.translate : "translate-x-0"}
          `}
        />
      </button>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
