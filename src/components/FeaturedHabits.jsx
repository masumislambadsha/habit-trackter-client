import { useState, useEffect } from "react";
import api from "../utils/Api";
import { Link } from "react-router";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import { FaFire } from "react-icons/fa";
import { useTheme } from "../context/ThemeProvider";
import HabitCardSkeleton from "./HabitCardSkeleton";
motion;
const FeaturedHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    let isMounted = true;
    api
      .get("/habits/featured")
      .then((res) => {
        if (isMounted) {
          setHabits(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("API Error:", err);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

if (loading) {
  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-b from-gray-800 to-gray-900"
          : "bg-linear-to-b from-[#E5E9C5] to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-linear-to-r from-[#016B61] to-[#70B2B2]">
          Featured Habits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <HabitCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}


  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-b from-gray-800 to-gray-900"
          : "bg-linear-to-b from-[#E5E9C5] to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-linear-to-r from-[#016B61] to-[#70B2B2]"
        >
          Featured Habits
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {habits.map((habit, i) => (
            <motion.div
              key={habit._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 ${
                isDark
                  ? "bg-gray-800/90 backdrop-blur-sm border-gray-600"
                  : "bg-white/90 backdrop-blur-sm border-[#9ECFD4]"
              }`}
            >
              {habit.image ? (
                <img
                  src={habit.image}
                  alt={habit.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform"
                />
              ) : (
                <div
                  className={`h-56 flex items-center justify-center ${
                    isDark
                      ? "bg-linear-to-br from-gray-700 to-gray-600"
                      : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
                  }`}
                >
                  <FaFire
                    className={`text-6xl ${
                      isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                    } opacity-50`}
                  />
                </div>
              )}
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                  }`}
                >
                  {habit.title}
                </h3>
                <p
                  className={`text-sm mb-3 line-clamp-2 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {habit.description}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs ${
                      isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                    }`}
                  >
                    by {habit.userName}
                  </span>
                  <Link
                    to={`/habit/${habit._id}`}
                    className="px-4 py-2 bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white rounded-full text-sm font-medium hover:shadow-lg transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHabits;
