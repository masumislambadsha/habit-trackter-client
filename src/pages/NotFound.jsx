import { Link } from "react-router";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";
import { useEffect } from "react";
motion;
const NotFound = () => {
  useEffect(() => {
      document.title = "Habit Tracker | Error Page";
    }, []);
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-gray-900 to-gray-800"
          : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
      }`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <h1
            className={`text-9xl font-bold mb-4 transition-colors duration-300 ${
              isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
            }`}
          >
            404
          </h1>
          <motion.div
            className={`absolute -top-4 -left-4 w-8 h-8 rounded-full ${
              isDark ? "bg-[#70B2B2]/30" : "bg-[#016B61]/30"
            }`}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={`absolute -bottom-4 -right-4 w-6 h-6 rounded-full ${
              isDark ? "bg-[#E5E9C5]/30" : "bg-[#70B2B2]/30"
            }`}
            animate={{
              y: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`text-2xl mb-8 transition-colors duration-300 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Oops! Page Not Found
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`text-lg mb-12 max-w-md mx-auto transition-colors duration-300 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          The page you're looking for seems to have wandered off. Let's get you
          back on track!
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 ${
              isDark
                ? "bg-linear-to-r from-[#70B2B2] to-[#9ECFD4] text-white hover:from-[#9ECFD4] hover:to-[#E5E9C5]"
                : "bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white hover:from-[#70B2B2] hover:to-[#9ECFD4]"
            }`}
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className={`px-8 py-4 rounded-xl font-bold text-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDark
                ? "border-[#70B2B2] text-[#9ECFD4] hover:bg-[#70B2B2] hover:text-white"
                : "border-[#016B61] text-[#016B61] hover:bg-[#016B61] hover:text-white"
            }`}
          >
            Go Back
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className={`mt-12 p-6 rounded-2xl backdrop-blur-sm border transition-colors duration-300 ${
            isDark
              ? "bg-gray-800/50 border-gray-600"
              : "bg-white/50 border-[#9ECFD4]"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
              isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
            }`}
          >
            Need Help?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/browse"
              className={`text-sm hover:underline transition-colors duration-300 ${
                isDark
                  ? "text-gray-400 hover:text-[#9ECFD4]"
                  : "text-gray-600 hover:text-[#016B61]"
              }`}
            >
              Explore Public Habits
            </Link>
            <Link
              to="/add-habit"
              className={`text-sm hover:underline transition-colors duration-300 ${
                isDark
                  ? "text-gray-400 hover:text-[#9ECFD4]"
                  : "text-gray-600 hover:text-[#016B61]"
              }`}
            >
              Create New Habit
            </Link>
            <Link
              to="dashboard/my-habits"
              className={`text-sm hover:underline transition-colors duration-300 ${
                isDark
                  ? "text-gray-400 hover:text-[#9ECFD4]"
                  : "text-gray-600 hover:text-[#016B61]"
              }`}
            >
              View My Habits
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={`absolute bottom-10 left-10 w-20 h-20 rounded-full opacity-10 ${
            isDark ? "bg-[#9ECFD4]" : "bg-[#016B61]"
          }`}
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className={`absolute top-10 right-10 w-16 h-16 rounded-full opacity-10 ${
            isDark ? "bg-[#70B2B2]" : "bg-[#E5E9C5]"
          }`}
          animate={{
            scale: [1.5, 1, 1.5],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
};

export default NotFound;
