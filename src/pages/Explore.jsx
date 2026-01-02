import { useState, useEffect, useMemo } from "react";
import api from "../utils/Api";
import { Link } from "react-router"; // Fixed import
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";
import HabitCardSkeleton from "../components/HabitCardSkeleton";
motion;
const categories = ["All", "Morning", "Fitness", "Study", "Work", "Evening"];

const Explore = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { isDark } = useTheme();

  useEffect(() => {
    document.title = "Habit Tracker | Public Habits";
  }, []);

  useEffect(() => {
    const fetchPublicHabits = async () => {
      try {
        const res = await api.get("/habits/public");
        const data = Array.isArray(res?.data) ? res.data : [];
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortOrder]);

  // Helper function to safely parse dates
  const safeParseDate = (dateString) => {
    if (!dateString) return new Date(0); // Return epoch for undefined/null

    try {
      const date = new Date(dateString);
      // Check if date is valid
      return isNaN(date.getTime()) ? new Date(0) : date;
    } catch (error) {
      console.error("Error parsing date:", dateString, error);
      return new Date(0); // Return epoch for invalid dates
    }
  };

  const filteredAndSortedHabits = useMemo(() => {
    const query = search.trim().toLowerCase();
    const selected = category.toLowerCase();

    let filtered = habits.filter((habit) => {
      const title = (habit?.title || "").toString().trim().toLowerCase();
      const cat = (habit?.category || "").toString().trim().toLowerCase();
      const matchesSearch = !query || title.includes(query);
      const matchesCategory = selected === "all" || cat === selected;
      return matchesSearch && matchesCategory;
    });

    // Apply sorting
    if (sortOrder === "newest") {
      return filtered.sort((a, b) => {
        const dateA = safeParseDate(a.createdAt);
        const dateB = safeParseDate(b.createdAt);
        return dateB.getTime() - dateA.getTime(); // Newest first
      });
    } else if (sortOrder === "oldest") {
      return filtered.sort((a, b) => {
        const dateA = safeParseDate(a.createdAt);
        const dateB = safeParseDate(b.createdAt);
        return dateA.getTime() - dateB.getTime(); // Oldest first
      });
    }

    return filtered;
  }, [habits, search, category, sortOrder]);

  const totalItems = filteredAndSortedHabits.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHabits = filteredAndSortedHabits.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Debug: Log some sample dates to verify sorting
  useEffect(() => {
    if (habits.length > 0 && sortOrder !== "none") {
      const sampleDates = habits.slice(0, 3).map((h) => ({
        title: h.title,
        createdAt: h.createdAt,
        parsed: safeParseDate(h.createdAt).toISOString(),
      }));
      console.log("Sample dates for sorting:", sampleDates);
    }
  }, [habits, sortOrder]);

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
          <div className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <HabitCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 pt-25 ${
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

        <div className="flex flex-col items-start md:items-center md:flex-row justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-2 h-12 bg-linear-to-b from-[#016B61] to-[#70B2B2] rounded-full" />
            <div>
              <h2
                className={`text-4xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                {totalItems}
              </h2>
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Habits Found
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search habits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`flex-1 px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-300 placeholder-gray-500 ${
                isDark
                  ? "border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                  : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-[#016B61]"
              }`}
            />

            <div className="relative w-full md:w-auto">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`appearance-none w-full md:w-auto bg-transparent px-5 py-3.5 pr-12 border rounded-xl text-base font-medium focus:outline-none focus:ring-2 transition-all duration-300 cursor-pointer min-w-[140px] ${
                  isDark
                    ? "border-gray-600 text-white focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] text-[#016B61] focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${
                    isDark ? "%23e5e7eb" : "%236b7280"
                  }' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.2em",
                }}
              >
                {categories.map((c) => (
                  <option
                    key={c}
                    value={c}
                    className="bg-white dark:bg-base-300"
                  >
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full md:w-auto">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`appearance-none w-full md:w-auto bg-transparent px-5 py-3.5 pr-12 border rounded-xl text-base font-medium focus:outline-none focus:ring-2 transition-all duration-300 cursor-pointer min-w-[170px] ${
                  isDark
                    ? "border-gray-600 text-white focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] text-[#016B61] focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${
                    isDark ? "%23e5e7eb" : "%236b7280"
                  }' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.2em",
                }}
              >
                <option value="none" className="bg-white dark:bg-base-300">
                  Sort: Default
                </option>
                <option value="newest" className="bg-white dark:bg-base-300">
                  Newest first
                </option>
                <option value="oldest" className="bg-white dark:bg-base-300">
                  Oldest first
                </option>
              </select>
            </div>
          </div>
        </div>

        {filteredAndSortedHabits.length > 0 && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
            }`}
          >
            <p>
              Debug: Showing {currentHabits.length} of {totalItems} habits
            </p>
            <p>Sort order: {sortOrder}</p>
            {sortOrder !== "none" && filteredAndSortedHabits.length > 0 && (
              <>
                <p>
                  Date range (all filtered):{" "}
                  {safeParseDate(
                    filteredAndSortedHabits[0].createdAt
                  ).toLocaleDateString()}
                  {" to "}
                  {safeParseDate(
                    filteredAndSortedHabits[filteredAndSortedHabits.length - 1]
                      .createdAt
                  ).toLocaleDateString()}
                </p>
                <p className="mt-1">
                  Date range (current page):{" "}
                  {currentHabits.length > 0
                    ? safeParseDate(
                        currentHabits[0].createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                  {" to "}
                  {currentHabits.length > 0
                    ? safeParseDate(
                        currentHabits[currentHabits.length - 1].createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </>
            )}
          </div>
        )}

        {totalItems === 0 ? (
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentHabits.map((habit, i) => (
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

                    {/* Show date info */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Created:{" "}
                        {habit.createdAt
                          ? safeParseDate(habit.createdAt).toLocaleDateString()
                          : "Unknown"}
                      </span>
                    </div>

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

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                  isDark
                    ? "border-gray-600 text-gray-200 disabled:opacity-40"
                    : "border-[#9ECFD4] text-[#016B61] disabled:opacity-40"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-full text-sm font-medium border flex items-center justify-center ${
                      isActive
                        ? "bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white border-transparent"
                        : isDark
                        ? "border-gray-600 text-gray-200 hover:bg-gray-800"
                        : "border-[#9ECFD4] text-[#016B61] hover:bg-[#E5E9C5]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                  isDark
                    ? "border-gray-600 text-gray-200 disabled:opacity-40"
                    : "border-[#9ECFD4] text-[#016B61] disabled:opacity-40"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
