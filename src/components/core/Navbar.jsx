import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../../features/auth/AuthContext";
import ModalUser from "../fragment/ModalUser";
import user_img from "../../assets/images/user_img.png";
import ThemeToggle from "../fragment/ThemeToggle";
export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    };
    setCurrentDate(now.toLocaleDateString("id-ID", options));
  }, []);

  const handleAvatarClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="relative flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-900">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
      >
        <Menu size={24} />
      </button>
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 md:text-base">
        {currentDate || "Memuat tanggal..."}
      </div>
      <div className="relative flex items-center gap-2">
        <ThemeToggle />
        <span className="hidden font-normal text-gray-800 dark:text-gray-200 md:block">
          {user?.name}
        </span>

        <img
          src={user_img}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
          onClick={handleAvatarClick}
        />

        {isModalOpen && (
          <ModalUser
            onClose={handleCloseModal}
            user={{
              name: user?.name,
            }}
          />
        )}
      </div>
    </header>
  );
}
