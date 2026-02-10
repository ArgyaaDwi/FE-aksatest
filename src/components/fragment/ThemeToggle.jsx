import { useTheme } from "../../features/theme/ThemeContext";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const currentTheme = themeOptions.find((opt) => opt.value === mode);
  const CurrentIcon = currentTheme.icon;

  const handleSelect = (value) => {
    setMode(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
      >
        <CurrentIcon size={16} />
        <span className="hidden sm:inline">{currentTheme.label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-40 mt-2 bg-white border rounded shadow-lg dark:bg-gray-800 dark:border-gray-700">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = mode === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={16} />
                <span>{option.label}</span>
                {isActive && (
                  <span className="ml-auto text-blue-600 dark:text-blue-400">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
