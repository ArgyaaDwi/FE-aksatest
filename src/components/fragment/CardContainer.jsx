const CardContainer = ({ children, title, subtitle }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-900">
      <h1 className="px-4 pt-3 text-lg font-bold">{title}</h1>
      <p className="px-4 pb-3 text-xs font-normal dark:text-gray-300">
        {subtitle}
      </p>
      <hr />
      <div className="px-4 py-3">{children}</div>
    </div>
  );
};
export default CardContainer;
