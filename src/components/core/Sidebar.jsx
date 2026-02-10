import { X } from "lucide-react";
import { createContext, useEffect } from "react";
import logo from "../../assets/images/aksa-logo.png";
const SidebarContext = createContext(null);

export default function Sidebar({
  title,
  children,
  mobileOpen,
  onMobileClose,
}) {
  const expanded = true;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && mobileOpen) {
        onMobileClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen, onMobileClose]);
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/40 md:hidden"
          onClick={onMobileClose}
        />
      )}
      <aside
        className={`h-screen w-64 transition-transform duration-300 ease-in-out fixed md:static z-50 
          ${mobileOpen ? "translate-x-0 bg-white dark:bg-gray-900" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <nav className="flex flex-col h-full border-r border-gray-200 shadow-sm dark:border-gray-700">
          <div className="flex items-center justify-between p-4 pb-2 mb-5">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                width={56}
                height={56}
                className="w-14"
              />
              <p className="ml-3 text-lg font-bold text-primary dark:text-sky-300">
                {title}
              </p>
            </div>
            <button
              onClick={onMobileClose}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 md:hidden"
            >
              <X color="black" size={20} />
            </button>
          </div>
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 overflow-y-auto">{children}</ul>
          </SidebarContext.Provider>
        </nav>
      </aside>
    </>
  );
}
export { SidebarContext };
