import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "react-hot-toast";
import { ChevronDown, Sun, Moon } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { user, signOutUser } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully!");
      setDropdownOpen(false);
      if (setMobileMenuOpen) setMobileMenuOpen(false);
    } catch {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    setDropdownOpen(false);
    if (setMobileMenuOpen) setMobileMenuOpen(false);
  }, [setMobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/browse", label: "Public Habits" },
    ...(user
      ? [
          { to: "/add-habit", label: "Add Habit" },
          { to: "/my-habits", label: "My Habits" },
          { to: "/analytics", label: "Analytics" },
        ]
      : []),
  ];

  return (
    <nav className="glass fixed top-0 z-50 w-full border-b transition-all duration-300 bg-base-100 border-neutral/20 dark:bg-base-300 dark:border-base-200">
      <div className="max-w-7xl mx-auto px- sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link
            to="/"
            className="flex items-center gap-3 md:pr-5 pr-1 group ml-5"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-linear-to-br from-[#016B61] to-[#70B2B2] flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-all duration-300">
              H
            </div>
            <span className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-[#016B61] to-[#70B2B2] bg-clip-text text-transparent">
              HabitTracker
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 lg:px-5 py-2 lg:py-2.5 rounded-2xl text-sm lg:text-base font-medium transition-all duration-300 ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary shadow-md border border-primary/20 dark:bg-accent/20 dark:text-accent dark:border-accent/20"
                    : "text-base-content/70 hover:bg-base-200/50 hover:text-primary dark:hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 lg:p-3 rounded-2xl hover:bg-base-200/50 dark:hover:bg-base-200/30 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
              )}
            </button>

            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-2xl hover:bg-base-200/50 dark:hover:bg-base-200/30 transition-all duration-300 group"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-9 h-9 lg:w-11 lg:h-11 rounded-full object-cover ring-2 lg:ring-4 ring-primary/20 dark:ring-accent/20 group-hover:ring-primary/40 dark:group-hover:ring-accent/40 transition-all"
                    />
                  ) : (
                    <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-lg ring-2 lg:ring-4 ring-primary/20 dark:ring-accent/20 bg-linear-to-br from-primary to-secondary">
                      {user.displayName?.[0]?.toUpperCase() ||
                        user.email[0].toUpperCase()}
                    </div>
                  )}
                  <span className="font-semibold text-base-content/80 hidden xl:inline">
                    {user.displayName || user.email.split("@")[0]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 lg:w-5 lg:h-5 text-base-content/60 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 md:w-96 rounded-2xl shadow-2xl border p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300 bg-base-100 border-base-200 dark:bg-base-300 dark:border-base-200">
                    <div className="flex items-center gap-4 mb-6">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-white text-3xl lg:text-4xl font-bold bg-linear-to-br from-primary to-secondary">
                          {user.displayName?.[0]?.toUpperCase() ||
                            user.email[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-lg text-base-content">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-sm text-base-content/60">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <hr className="border-base-200/30" />
                      <button
                        onClick={handleLogout}
                        className="w-full btn btn-outline btn-error rounded-xl h-12 text-sm font-medium flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn rounded-xl px-6 h-12 text-sm font-medium shadow-lg border-0  btn-primary  text-white bg-linear-to-r from-[#016B61] to-[#70B2B2]  hover:shadow-[#9ECFD4]/50 transition-all duration-300 overflow-hidden"
              >
                Login
              </Link>
            )}
          </div>
          <button
            onClick={() =>
              setMobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen)
            }
            className="md:hidden px-7 md:p-2 rounded-xl hover:bg-base-200/50 dark:hover:bg-base-200/30 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t transition-colors border-base-200 bg-base-100 dark:border-base-200 dark:bg-base-300 ">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all my-2 ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary border border-primary/20 dark:bg-accent/20 dark:text-accent dark:border-accent/20"
                    : "text-base-content/70 hover:bg-base-200/50 dark:hover:bg-base-200/30"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="pt-3 border-t border-base-200">
                <div className="flex items-center gap-3 px-4 py-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-linear-to-br from-primary to-secondary">
                      {user.displayName?.[0]?.toUpperCase() ||
                        user.email[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm text-base-content">
                      {user.displayName || user.email.split("@")[0]}
                    </p>
                    <p className="text-xs text-base-content/60">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full mt-3 btn btn-outline btn-error btn-sm rounded-xl h-10 text-sm font-medium flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-3 border-t border-base-200">
                <Link
                  to="/login"
                  className="text-white bg-linear-to-r from-[#016B61] to-[#70B2B2] rounded-full shadow-2xl hover:shadow-[#9ECFD4]/50 transition-all duration-300 overflow-hidden"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn rounded-xl h-10 text-sm font-medium transition-all btn-primary hover:shadow-primary/20"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
