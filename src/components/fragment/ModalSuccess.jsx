const ModalSuccess = ({ title, onClose }) => {
  return (
    <div className="relative px-4 py-4 mb-4 text-green-700 bg-green-100 rounded text-md">
      <button
        className="absolute text-xl font-bold leading-none text-green-700 bg-transparent top-2 right-2 hover:text-green-900"
        onClick={onClose}
      >
        ✕
      </button>
      <div className="pr-8">{title}</div>
    </div>
  );
};

export default ModalSuccess;
