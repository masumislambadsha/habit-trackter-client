// components/DashboardLayout.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";
motion;
const DashboardLayout = ({ children, userRole = "user" }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userMenu = [
    { name: "Overview", path: "/dashboard", icon: "📊" },
    { name: "My Habits", path: "/dashboard/habits", icon: "📝" },
  ];

  const adminMenu = [
    ...userMenu,
    { name: "Users", path: "/dashboard/users", icon: "👥" },
    { name: "Featured", path: "/dashboard/featured", icon: "⭐" },
  ];

  const menu = userRole === "admin" ? adminMenu : userMenu;

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-white"}`}>
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link to="/dashboard" className="ml-3 text-xl font-bold text-[#016B61] dark:text-[#9ECFD4]">
                Habit Tracker
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {userRole === "admin" ? "Admin" : "User"}
              </span>
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/api/avatar-placeholder"
                    alt="Profile"
                  />
                  <span className="hidden md:block">Profile</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profile
                    </Link>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Dashboard Home
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 shadow-lg border-r border-gray-200 dark:border-gray-700`}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-[#016B61] dark:text-[#9ECFD4]">
                Dashboard
              </h3>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {menu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-[#E5E9C5] dark:hover:bg-gray-800 hover:text-[#016B61] transition-colors duration-200"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
