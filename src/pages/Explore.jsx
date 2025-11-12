import { useState, useEffect, useMemo } from "react";
import api from "../utils/Api";
import { Link } from "react-router";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTheme } from "../context/ThemeProvider";

const categories = ["All", "Morning", "Fitness", "Study", "Work", "Evening"];

const Explore = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchPublicHabits = async () => {
      try {
        const res = await api.get("/habits/public");
        const data = Array.isArray(res?.data) ? res.data : [];
        console.log("Fetched public habits:", data);
        setHabits(data);
      } catch (err) {
        console.error("Failed to fetch public habits:", err);
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicHabits();
  }, []);

  const filteredHabits = useMemo(() => {
    const query = search.trim().toLowerCase();
    const selected = category.toLowerCase();
    return habits.filter((habit) => {
      const title = (habit?.title || "").toString().trim().toLowerCase();
      const cat = (habit?.category || "").toString().trim().toLowerCase();
      const matchesSearch = !query || title.includes(query);
      const matchesCategory = selected === "all" || cat === selected;
      return matchesSearch && matchesCategory;
    });
  }, [habits, search, category]);

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-gray-900 to-gray-800"
          : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl md:text-5xl font-bold text-center mb-10 ${
            isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
          }`}
        >
          Explore Public Habits
        </motion.h1>
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search habits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`flex-1 px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-300 placeholder-gray-500 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-[#016B61]"
            }`}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-300 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-[#016B61]"
            }`}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {filteredHabits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p
              className={`text-xl font-medium ${
                isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
              }`}
            >
              No habits found matching your filters.
            </p>
            <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Try adjusting your search or category. (Total loaded:{" "}
              {habits.length})
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHabits.map((habit, i) => (
              <motion.div
                key={habit._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl shadow-lg overflow-hidden border hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                    : "bg-white border-[#9ECFD4] hover:bg-gray-50"
                }`}
              >
                {habit.image ? (
                  <img
                    src={habit.image}
                    alt={habit.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x200/016B61/FFFFFF?text=No+Image";
                    }}
                  />
                ) : (
                  <div
                    className={`h-48 flex items-center justify-center ${
                      isDark
                        ? "bg-linear-to-br from-gray-700 to-gray-600"
                        : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                      }`}
                    >
                      No Image
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <h3
                    className={`text-xl font-bold mb-2 line-clamp-1 ${
                      isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                    }`}
                  >
                    {habit.title || "Untitled"}
                  </h3>
                  <p
                    className={`text-sm mb-3 line-clamp-2 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {habit.description || "No description"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium border ${
                        isDark
                          ? "bg-gray-700 text-[#9ECFD4] border-gray-600"
                          : "bg-[#E5E9C5] text-[#016B61] border-[#016B61]/20"
                      }`}
                    >
                      {habit.category || "Uncategorized"}
                    </span>
                    <Link
                      to={`/habit/${habit._id}`}
                      className={`text-sm font-semibold hover:underline flex items-center gap-1 ${
                        isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                      }`}
                    >
                      View Details
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
