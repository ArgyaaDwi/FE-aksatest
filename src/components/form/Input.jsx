const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      {...props}
    />
  );
};

export default Input;
