import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { SidebarContext } from "./Sidebar";
import { Link } from "react-router-dom";

export default function SidebarItem({ icon, text, url }) {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "SidebarItem must be used within a SidebarContext.Provider",
    );
  }

  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <li className="my-1">
      <Link
        to={url}
        className={`relative flex items-center py-2 px-3
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-primary text-white"
              : "hover:bg-sky-100 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          }
        `}
      >
        {icon}
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
}
