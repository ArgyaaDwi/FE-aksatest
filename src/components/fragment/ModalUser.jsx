import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import user_img from "../../assets/images/user_img.png";

const ModalUser = ({ onClose, user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="absolute z-50 w-64 bg-white rounded-lg shadow-lg right-4 top-16 dark:bg-gray-800">
        <div className="flex flex-col items-center gap-2 p-4">
          <img
            src={user_img}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-black dark:text-white">
              {user.name}
            </p>
          </div>
        </div>
        <hr className="dark:border-gray-700" />
        <div className="flex gap-2 p-4">
          <Link
            to="/profile"
            onClick={onClose}
            className="block w-full px-3 py-1 text-center text-blue-500 transition border border-blue-400 rounded-md hover:bg-blue-600 hover:text-white"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-1 text-white transition bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-30"
        onClick={onClose}
      />
    </>
  );
};

export default ModalUser;
