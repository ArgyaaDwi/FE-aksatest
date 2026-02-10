const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {

  const variants = {
    primary: "bg-secondary hover:bg-primary text-white",
    outline:
      "border hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded flex items-center gap-2 transition ${variants[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
