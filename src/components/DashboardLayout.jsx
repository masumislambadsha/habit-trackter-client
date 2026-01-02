import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { useTheme } from "../context/ThemeProvider";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import {
  Home,
  BarChart3,
  PlusCircle,
  ListTodo,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  TrendingUp,
  Calendar,
  Target,
  ChevronDown,
  Bell,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
motion;
const DashboardLayout = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed", error);
    }
  };

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      path: "/dashboard",
      exact: true,
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Analytics",
      path: "/dashboard/analytics",
    },
    {
      icon: <PlusCircle size={20} />,
      label: "Add Habit",
      path: "/dashboard/add-habit",
    },
    {
      icon: <ListTodo size={20} />,
      label: "My Habits",
      path: "/dashboard/my-habits",
    },
    {
      icon: <User size={20} />,
      label: "Profile",
      path: "/dashboard/profile",
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={` ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}>
      <div
      className={`lg:container mx-auto min-h-screen transition-colors duration-300 flex ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <aside
        className={`hidden lg:flex flex-col w-64 transition-colors duration-300 ${
          isDark
            ? "bg-gray-800 border-r border-gray-700"
            : "bg-white border-r border-gray-200"
        }`}
      >
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#016B61] to-[#70B2B2] flex items-center justify-center text-white font-bold text-xl">
              H
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-[#016B61] to-[#70B2B2] bg-clip-text text-transparent">
              HabitTracker
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive(item.path, item.exact)
                  ? "bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white shadow-lg"
                  : isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div
          className={`p-4 border-t ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
              isDark
                ? "text-red-400 hover:bg-red-400/10"
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className={`fixed inset-y-0 left-0 w-64 ${
              isDark ? "bg-gray-800" : "bg-white"
            } shadow-xl`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#016B61] to-[#70B2B2] flex items-center justify-center text-white font-bold text-xl">
                    H
                  </div>
                  <span className="text-2xl font-bold bg-linear-to-r from-[#016B61] to-[#70B2B2] bg-clip-text text-transparent">
                    HabitTracker
                  </span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="p-2">
                  <X
                    size={24}
                    className={isDark ? "text-gray-300" : "text-gray-600"}
                  />
                </button>
              </div>
            </div>

            <nav className="px-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item.path, item.exact)
                      ? "bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white shadow-lg"
                      : isDark
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div
              className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={handleLogout}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "text-red-400 hover:bg-red-400/10"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <header
          className={`sticky top-0 z-30 border-b transition-colors duration-300 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2"
                >
                  <Menu
                    size={24}
                    className={isDark ? "text-gray-300" : "text-gray-600"}
                  />
                </button>
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`pl-10 pr-4 py-2 rounded-xl w-64 transition-colors duration-300 ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun size={22} className="text-yellow-400" />
                  ) : (
                    <Moon size={22} className="text-gray-600" />
                  )}
                </button>

                <button
                  className={`p-2 rounded-xl ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <Bell
                    size={22}
                    className={isDark ? "text-gray-300" : "text-gray-600"}
                  />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-linear-to-br from-[#016B61] to-[#70B2B2]">
                        {user?.displayName?.[0]?.toUpperCase() ||
                          user?.email?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="hidden md:block text-left">
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {user?.displayName || user?.email?.split("@")[0]}
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {user?.email}
                      </p>
                    </div>
                    <ChevronDown
                      size={20}
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    />
                  </button>

                  {profileDropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg border py-2 z-50 ${
                        isDark
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <User size={18} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <Home size={18} />
                        <span>Dashboard Home</span>
                      </Link>
                      <hr
                        className={`my-2 ${
                          isDark ? "border-gray-700" : "border-gray-200"
                        }`}
                      />
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left ${
                          isDark ? "text-red-400" : "text-red-600"
                        }`}
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: isDark ? "#9ECFD4" : "#016B61",
            color: "#fff",
            fontFamily: "inherit",
            borderRadius: "12px",
          },
        }}
      />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
    </div>
  );
};

export default DashboardLayout;
