"use client";
import React, { useState } from "react";
import Navbar from "../core/Navbar";
import Footer from "../core/Footer";
import {
  LayoutDashboard,
  GraduationCap,
  ChartLine,
  Files,
  CircleUserRound,
  School,
  Users,
  BriefcaseBusiness,
} from "lucide-react";
import Sidebar from "../core/Sidebar";
import SidebarItem from "../core/SidebarItem";
export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMobileMenuOpen(true);
  };
  const handleMobileClose = () => {
    setMobileMenuOpen(false);
  };
  return (
    // <main className="flex w-full h-screen">
    <main className="flex w-full h-screen overflow-hidden">
      <Sidebar
        title="Aksamedia Internship Test"
        user={null}
        mobileOpen={mobileMenuOpen}
        onMobileClose={handleMobileClose}
      >
        <p className="pl-1 text-xs font-thin">Menu</p>

        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          url="/"
        />
        <p className="pl-1 text-xs font-thin">Kelola</p>
        <SidebarItem
          icon={<Files size={20} />}
          text="CRUD Non API"
          url="/items"
        />
        <SidebarItem
          icon={<BriefcaseBusiness size={20} />}
          text="Divisi"
          url="/divisions"
        />
        <SidebarItem
          icon={<Users size={20} />}
          text="Karyawan"
          url="/employees"
        />
        <p className="pl-1 text-xs font-thin">Setting</p>
        <SidebarItem
          icon={<CircleUserRound size={20} />}
          text="Profil Saya"
          url="/profile"
        />
      </Sidebar>
      <div className="flex flex-col flex-1 h-screen overflow-hidden md:ml-0">
        <Navbar onMenuClick={handleMenuClick} />
        <div className="flex-1 p-4 overflow-x-hidden overflow-y-auto bg-bgColor dark:bg-gray-800">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}
