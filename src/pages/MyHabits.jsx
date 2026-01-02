import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../utils/Api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { format, isToday } from "date-fns";
import Lottie from "lottie-react";
import completeAnimation from "../assets/complete-animation.json";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Search,
  Filter,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle,
  Edit,
  Trash2,
  Eye,
  Flame,
  Clock,
  CheckCheck,
  XCircle,
} from "lucide-react";

const MyHabits = () => {
  useEffect(() => {
    document.title = "Habit Tracker | My Habits";
  }, []);

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchMyHabits();
  }, []);

  const fetchMyHabits = async () => {
    try {
      const res = await api.get("/habits/my");
      setHabits(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load habits");
    } finally {
      setLoading(false);
    }
  };

  // Function to check if habit is completed today
  const isCompletedToday = (habit) => {
    if (!habit.completionHistory || !habit.completionHistory.length)
      return false;

    return habit.completionHistory.some((completionDate) => {
      const date = new Date(completionDate);
      return isToday(date);
    });
  };

  const handleComplete = async (id, habitTitle) => {
    if (completingId) return;

    const habit = habits.find((h) => h._id === id);
    if (!habit) return;

    // Check if already completed today
    if (isCompletedToday(habit)) {
      toast.error(`${habitTitle} is already completed for today!`, {
        icon: "✅",
        duration: 3000,
        style: {
          background: isDark ? "#1f2937" : "#f3f4f6",
          color: isDark ? "#fff" : "#000",
        },
      });
      return;
    }

    setCompletingId(id);
    try {
      const { data } = await api.patch(`/habits/${id}/complete`);
      setHabits((prev) =>
        prev.map((h) =>
          h._id === id
            ? {
                ...h,
                completionHistory: data.completionHistory,
                streak: data.streak,
              }
            : h
        )
      );
      toast.success(`${habitTitle} marked as completed for today!`, {
        icon: "🎉",
        duration: 2000,
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
    } catch (err) {
      // Check if error is "Already completed today"
      if (
        err.response?.data?.error === "Already completed today" ||
        err.response?.data?.error?.includes("already completed")
      ) {
        toast.error(`${habitTitle} is already completed for today!`, {
          icon: "✅",
          duration: 3000,
          style: {
            background: isDark ? "#1f2937" : "#f3f4f6",
            color: isDark ? "#fff" : "#000",
          },
        });
        // Update local state to reflect completion
        setHabits((prev) =>
          prev.map((h) =>
            h._id === id
              ? {
                  ...h,
                  completionHistory: [
                    ...(h.completionHistory || []),
                    new Date(),
                  ],
                }
              : h
          )
        );
      } else {
        toast.error(err.response?.data?.error || "Failed to mark complete");
      }
    } finally {
      setTimeout(() => setCompletingId(null), 1500);
    }
  };

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are deleting "${title}". This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      background: isDark ? "#1f2937" : "#fff",
      color: isDark ? "#fff" : "#000",
    });
    if (result.isConfirmed) {
      try {
        await api.delete(`/habits/${id}`);
        setHabits(habits.filter((h) => h._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: `"${title}" has been removed.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          background: isDark ? "#1f2937" : "#fff",
          color: isDark ? "#fff" : "#000",
        });
      } catch {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete habit.",
          icon: "error",
          background: isDark ? "#1f2937" : "#fff",
          color: isDark ? "#fff" : "#000",
        });
      }
    }
  };

  // Get unique categories
  const categories = [
    "All",
    ...new Set(habits.map((h) => h.category).filter(Boolean)),
  ];

  // Filter and sort habits
  const filteredHabits = habits
    .filter((habit) => {
      const matchesSearch =
        habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        habit.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || habit.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "streak-high":
          return (b.streak || 0) - (a.streak || 0);
        case "streak-low":
          return (a.streak || 0) - (b.streak || 0);
        case "completed-today":
          const aCompleted = isCompletedToday(a);
          const bCompleted = isCompletedToday(b);
          return bCompleted - aCompleted;
        default:
          return 0;
      }
    });

  // Calculate stats
  const stats = {
    totalHabits: habits.length,
    totalCompletions: habits.reduce(
      (sum, h) => sum + (h.completionHistory?.length || 0),
      0
    ),
    completedToday: habits.filter(isCompletedToday).length,
    averageStreak:
      habits.length > 0
        ? Math.round(
            habits.reduce((sum, h) => sum + (h.streak || 0), 0) / habits.length
          )
        : 0,
    completionRate:
      habits.length > 0
        ? Math.round(
            (habits.filter((h) => (h.completionHistory?.length || 0) > 0)
              .length /
              habits.length) *
              100
          )
        : 0,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            My Habits
          </h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Track and manage your daily habits
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-2xl p-6 shadow-lg ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <Target
                  className={isDark ? "text-[#9ECFD4]" : "text-[#016B61]"}
                  size={24}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Total Habits
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#016B61] to-[#70B2B2] bg-clip-text text-transparent">
              {stats.totalHabits}
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Active habits tracking
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl p-6 shadow-lg ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <CheckCircle
                  className={isDark ? "text-green-400" : "text-green-600"}
                  size={24}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Completed Today
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
              {stats.completedToday}/{stats.totalHabits}
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {stats.totalHabits > 0
                ? `${Math.round(
                    (stats.completedToday / stats.totalHabits) * 100
                  )}% done`
                : "No habits yet"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-2xl p-6 shadow-lg ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <Flame
                  className={isDark ? "text-[#FF6B6B]" : "text-[#FF6B6B]"}
                  size={24}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Average Streak
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#FF6B6B] to-[#FFA8A8] bg-clip-text text-transparent">
              {stats.averageStreak} days
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Average consistency
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-2xl p-6 shadow-lg ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <TrendingUp
                  className={isDark ? "text-[#9ECFD4]" : "text-[#9ECFD4]"}
                  size={24}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Success Rate
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#9ECFD4] to-[#E5E9C5] bg-clip-text text-transparent">
              {stats.completionRate}%
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Overall completion rate
            </p>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div
          className={`rounded-2xl shadow-lg p-6 mb-8 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search habits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                      : "border-gray-300 focus:ring-[#016B61] focus:border-[#016B61]"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className={`appearance-none pl-4 pr-10 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 cursor-pointer ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                      : "border-gray-300 focus:ring-[#016B61] focus:border-[#016B61]"
                  }`}
                >
                  <option value="All">All Categories</option>
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <Filter
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={20}
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`appearance-none pl-4 pr-10 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 cursor-pointer ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                      : "border-gray-300 focus:ring-[#016B61] focus:border-[#016B61]"
                  }`}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="streak-high">Highest Streak</option>
                  <option value="streak-low">Lowest Streak</option>
                  <option value="completed-today">Completed Today</option>
                </select>
                <Calendar
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={20}
                />
              </div>

              <button
                onClick={() => navigate("/dashboard/add-habit")}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#016B61] to-[#70B2B2] text-white rounded-xl font-bold hover:shadow-lg transition-shadow"
              >
                <PlusCircle size={20} />
                Add Habit
              </button>
            </div>
          </div>
        </div>

        {/* Habits Grid */}
        {filteredHabits.length === 0 ? (
          <div
            className={`rounded-2xl shadow-lg p-12 text-center ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="max-w-md mx-auto">
              <div
                className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <Target
                  className={`${isDark ? "text-gray-400" : "text-gray-400"}`}
                  size={36}
                />
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                No habits found
              </h3>
              <p
                className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {habits.length === 0
                  ? "You haven't created any habits yet. Start building your first habit today!"
                  : "No habits match your search criteria. Try a different search or filter."}
              </p>
              <button
                onClick={() => navigate("/dashboard/add-habit")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#016B61] to-[#70B2B2] text-white rounded-xl font-bold hover:shadow-lg transition-shadow"
              >
                <PlusCircle size={20} />
                Create Your First Habit
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHabits.map((habit) => {
              const completedToday = isCompletedToday(habit);

              return (
                <motion.div
                  key={habit._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-2xl h-150 shadow-lg overflow-hidden border ${
                    isDark
                      ? "bg-gray-800 grid border-gray-700"
                      : "bg-white grid border-gray-200"
                  }`}
                >
                  <div className="relative h-40">
                    {habit.image ? (
                      <img
                        src={habit.image}
                        alt={habit.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/800x400/016B61/FFFFFF?text=Habit";
                        }}
                      />
                    ) : (
                      <div
                        className={`w-full h-full flex items-center justify-center ${
                          isDark
                            ? "bg-gradient-to-br from-gray-700 to-gray-600"
                            : "bg-gradient-to-br from-[#E5E9C5] to-[#9ECFD4]"
                        }`}
                      >
                        <Target
                          className={`${
                            isDark ? "text-gray-400" : "text-[#016B61]"
                          }`}
                          size={48}
                        />
                      </div>
                    )}

                    {/* Status Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          habit.public
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {habit.public ? "Public" : "Private"}
                      </span>
                      {completedToday && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                          ✅ Completed Today
                        </span>
                      )}
                    </div>

                    {completingId === habit._id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lottie
                          animationData={completeAnimation}
                          loop={false}
                          style={{ width: 100 }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3
                          className={`text-xl font-bold mb-1 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {habit.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {habit.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame
                          className={
                            isDark ? "text-orange-400" : "text-orange-500"
                          }
                          size={16}
                        />
                        <span
                          className={`font-bold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {habit.streak || 0}
                        </span>
                      </div>
                    </div>

                    <p
                      className={`mb-4 line-clamp-2 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {habit.description}
                    </p>

                    <div
                      className={`text-sm mb-4 p-3 rounded-lg ${
                        isDark ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Created
                        </span>
                        <span
                          className={`${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {habit.createdAt
                            ? format(new Date(habit.createdAt), "MMM d, yyyy")
                            : "N/A"}
                        </span>
                      </div>
                      {habit.reminderTime && (
                        <div className="flex items-center justify-between">
                          <span
                            className={`${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            Reminder
                          </span>
                          <div className="flex items-center gap-1">
                            <Clock
                              size={14}
                              className={
                                isDark ? "text-gray-400" : "text-gray-500"
                              }
                            />
                            <span
                              className={`${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {habit.reminderTime}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <span
                          className={`${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Today's Status
                        </span>
                        <div className="flex items-center gap-1">
                          {completedToday ? (
                            <>
                              <CheckCheck
                                size={14}
                                className="text-green-500"
                              />
                              <span className="text-green-600 dark:text-green-400 font-medium">
                                Completed
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle size={14} className="text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">
                                Not completed
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Completion Section */}
                    <div
                      className={`p-3 rounded-lg mb-4 ${
                        completedToday
                          ? "bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800"
                          : "bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                      }`}
                    >
                      {completedToday ? (
                        <div className="flex items-center justify-center gap-4">
                          <div className="flex items-center gap-2">
                            <CheckCheck
                              className="text-green-600 dark:text-green-400"
                              size={20}
                            />
                          </div>
                          <button
                            onClick={() =>
                              handleComplete(habit._id, habit.title)
                            }
                            disabled
                            className="px-3 py-1 rounded-lg text-sm font-medium text-black cursor-not-allowed opacity-50"
                          >
                            Completed
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-4">
                          <div className="flex items-center gap-2">
                            <Target
                              className="text-blue-600 dark:text-blue-400"
                              size={20}
                            />
                          </div>
                          <button
                            onClick={() =>
                              handleComplete(habit._id, habit.title)
                            }
                            disabled={completingId === habit._id}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                              completingId === habit._id
                                ? "bg-green-500 text-white cursor-not-allowed"
                                : "bg-gradient-to-r from-[#016B61] to-[#70B2B2] text-white hover:shadow-md"
                            }`}
                          >
                            {completingId === habit._id
                              ? "Completing..."
                              : "Complete"}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-2">
                      <Link
                        to={`/habit/${habit._id}`}
                        className={`flex items-center justify-center gap-1 py-2 rounded-lg font-medium text-sm ${
                          isDark
                            ? "bg-gray-700 text-blue-400 hover:bg-gray-600"
                            : "bg-blue-600 text-white hover:bg-blue-800"
                        }`}
                      >
                        <Eye size={16} />
                        View
                      </Link>

                      <Link
                        to={`/dashboard/update-habit/${habit._id}`}
                        className={`flex items-center justify-center gap-1 py-2 rounded-lg font-medium text-sm ${
                          isDark
                            ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                            : "bg-orange-400 text-white hover:bg-amber-800"
                        }`}
                      >
                        <Edit size={16} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(habit._id, habit.title)}
                        className={`flex items-center justify-center gap-1 py-2 rounded-lg font-medium text-sm cursor-pointer ${
                          isDark
                            ? "bg-gray-700 text-red-400 hover:bg-gray-600"
                            : "bg-red-600 text-white hover:bg-red-800"
                        }`}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Daily Completion Summary */}
        {habits.length > 0 && (
          <div className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl shadow-lg p-6 ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3
                className={`text-lg font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                📊 Today's Completion Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Completed today
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {stats.completedToday}
                    </span>
                    <span
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      / {stats.totalHabits} habits
                    </span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.totalHabits > 0
                          ? (stats.completedToday / stats.totalHabits) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {stats.completedToday === stats.totalHabits ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCheck size={16} />
                      <span>🎉 All habits completed! You're amazing!</span>
                    </div>
                  ) : stats.completedToday === 0 ? (
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                      <Target size={16} />
                      <span>
                        Start your day by completing your first habit!
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <TrendingUp size={16} />
                      <span>
                        {stats.totalHabits - stats.completedToday} more to go
                        for today!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl shadow-lg p-6 ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              💡 Habit Completion Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <h4
                  className={`font-medium mb-2 flex items-center gap-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <CheckCircle className="text-green-500" size={16} />
                  Daily Completion
                </h4>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Complete each habit at least once per day to maintain your
                  streaks and build consistency.
                </p>
              </div>
              <div
                className={`p-4 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <h4
                  className={`font-medium mb-2 flex items-center gap-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <Clock className="text-blue-500" size={16} />
                  Optimal Timing
                </h4>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Complete habits at your set reminder time for better
                  consistency and habit formation.
                </p>
              </div>
              <div
                className={`p-4 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <h4
                  className={`font-medium mb-2 flex items-center gap-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <Flame className="text-orange-500" size={16} />
                  Streak Maintenance
                </h4>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Don't break your streak! Even if you miss a day, get back on
                  track the next day.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyHabits;
