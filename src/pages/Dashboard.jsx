import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";
import api from "../utils/Api";
import { Link } from "react-router";
import {
  TrendingUp,
  Target,
  Calendar,
  Award,
  BarChart3,
  PlusCircle,
  Clock,
  FireExtinguisher,
  ListTodo,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
motion;
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    totalHabits: 0,
    currentStreak: 0,
    totalCompletions: 0,
    successRate: 0,
  });
  const [recentHabits, setRecentHabits] = useState([]);
  const [analytics, setAnalytics] = useState({
    dailyCompletion: [],
    categoryDistribution: [],
    weeklyProgress: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const habitsRes = await api.get("/habits/my");
      const habits = habitsRes.data;

      const totalHabits = habits.length;
      const totalCompletions = habits.reduce(
        (sum, habit) => sum + (habit.completionHistory?.length || 0),
        0
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let currentStreak = 0;
      let checkDate = new Date(today);

      while (true) {
        const dateStr = checkDate.toISOString().split("T")[0];
        const hasCompletion = habits.some((habit) =>
          habit.completionHistory?.some((completion) => {
            const compDate = new Date(completion);
            compDate.setHours(0, 0, 0, 0);
            return compDate.toISOString().split("T")[0] === dateStr;
          })
        );

        if (hasCompletion) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }

      const daysTracked = 30;
      const totalPossible = totalHabits * daysTracked;
      const successRate =
        totalPossible > 0
          ? Math.round((totalCompletions / totalPossible) * 100)
          : 0;

      setStats({
        totalHabits,
        currentStreak,
        totalCompletions,
        successRate,
      });

      const sortedHabits = [...habits]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentHabits(sortedHabits);

      const dailyCompletion = generateDailyCompletionData(habits);
      const categoryDistribution = generateCategoryDistribution(habits);
      const weeklyProgress = generateWeeklyProgress(habits);

      setAnalytics({
        dailyCompletion,
        categoryDistribution,
        weeklyProgress,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const generateDailyCompletionData = (habits) => {
    const data = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString("en-US", { weekday: "short" });

      const completions = habits.reduce((sum, habit) => {
        const hasCompletion = habit.completionHistory?.some((completion) => {
          const compDate = new Date(completion);
          return compDate.toDateString() === date.toDateString();
        });
        return sum + (hasCompletion ? 1 : 0);
      }, 0);

      data.push({ day: dateStr, completions });
    }

    return data;
  };

  const generateCategoryDistribution = (habits) => {
    const categories = {};

    habits.forEach((habit) => {
      const category = habit.category || "Uncategorized";
      categories[category] = (categories[category] || 0) + 1;
    });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
      color: getCategoryColor(name),
    }));
  };

  const generateWeeklyProgress = (habits) => {
    const data = [];

    habits.slice(0, 5).forEach((habit) => {
      const completionRate =
        habit.completionHistory?.length > 0
          ? Math.round((habit.completionHistory.length / 30) * 100)
          : 0;

      data.push({
        name:
          habit.title?.substring(0, 20) +
          (habit.title?.length > 20 ? "..." : ""),
        progress: completionRate,
      });
    });

    return data;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Morning: "#016B61",
      Fitness: "#70B2B2",
      Study: "#9ECFD4",
      Work: "#E5E9C5",
      Evening: "#4A90E2",
      Health: "#50C878",
      Productivity: "#FF6B6B",
      Uncategorized: "#95A5A6",
    };
    return colors[category] || "#95A5A6";
  };

  const COLORS = [
    "#016B61",
    "#70B2B2",
    "#9ECFD4",
    "#E5E9C5",
    "#4A90E2",
    "#50C878",
    "#FF6B6B",
  ];

  return (
    <div
      className={`mt-7 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
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
            Welcome back, {user?.displayName || user?.email?.split("@")[0]}!
          </h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Track your progress and build better habits every day.
          </p>
        </motion.div>

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
            <h3 className="text-3xl font-bold mb-1 bg-linear-to-r from-[#016B61] to-[#70B2B2] bg-clip-text text-transparent">
              {stats.totalHabits}
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Active habits you're tracking
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
                <FireExtinguisher
                  className={isDark ? "text-[#FF6B6B]" : "text-[#FF6B6B]"}
                  size={24}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Current Streak
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 bg-linear-to-r from-[#FF6B6B] to-[#FFA8A8] bg-clip-text text-transparent">
              {stats.currentStreak} days
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Keep the fire burning!
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
                <Award
                  className={isDark ? "text-[#70B2B2]" : "text-[#70B2B2]"}
                  size={24}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Total Completions
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 bg-linear-to-r from-[#70B2B2] to-[#9ECFD4] bg-clip-text text-transparent">
              {stats.totalCompletions}
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Successful habit completions
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
            <h3 className="text-3xl font-bold mb-1 bg-linear-to-r from-[#9ECFD4] to-[#E5E9C5] bg-clip-text text-transparent">
              {stats.successRate}%
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Your consistency score
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`rounded-2xl p-6 shadow-lg ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Daily Completions (Last 7 Days)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.dailyCompletion}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? "#374151" : "#E5E7EB"}
                  />
                  <XAxis
                    dataKey="day"
                    stroke={isDark ? "#9CA3AF" : "#6B7280"}
                    fontSize={12}
                  />
                  <YAxis
                    stroke={isDark ? "#9CA3AF" : "#6B7280"}
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1F2937" : "white",
                      border: isDark
                        ? "1px solid #374151"
                        : "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completions"
                    stroke="#016B61"
                    strokeWidth={2}
                    dot={{ fill: "#016B61" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className={`rounded-2xl p-6 shadow-lg ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Habit Categories
            </h3>
            <div className="h-64">
              {analytics.categoryDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analytics.categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p
                    className={`text-gray-500 ${isDark ? "text-gray-400" : ""}`}
                  >
                    No category data available
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`rounded-2xl shadow-lg ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Recent Habits
              </h3>
            </div>
            <div className="p-6">
              {recentHabits.length > 0 ? (
                <div className="space-y-4">
                  {recentHabits.map((habit) => (
                    <div
                      key={habit._id}
                      className={`flex items-center justify-between p-4 rounded-xl ${
                        isDark ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <div>
                        <h4
                          className={`font-medium ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {habit.title}
                        </h4>
                        <p
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {habit.category} • {habit.streak || 0} day streak
                        </p>
                      </div>
                      <Link
                        to={`/habit/${habit._id}`}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          isDark
                            ? "bg-gray-600 hover:bg-gray-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        }`}
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p
                    className={`mb-4 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No habits yet. Start tracking your first habit!
                  </p>
                  <Link
                    to="/dashboard/add-habit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
                  >
                    <PlusCircle size={20} />
                    Add First Habit
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`rounded-2xl shadow-lg ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Quick Actions
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/dashboard/add-habit"
                  className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 ${
                    isDark
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <PlusCircle
                    size={32}
                    className={`mb-3 ${
                      isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Add Habit
                  </span>
                </Link>

                <Link
                  to="/dashboard/my-habits"
                  className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 ${
                    isDark
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <ListTodo
                    size={32}
                    className={`mb-3 ${
                      isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    My Habits
                  </span>
                </Link>

                <Link
                  to="/dashboard/analytics"
                  className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 ${
                    isDark
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <BarChart3
                    size={32}
                    className={`mb-3 ${
                      isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Analytics
                  </span>
                </Link>

                <Link
                  to="/browse"
                  className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 ${
                    isDark
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <Target
                    size={32}
                    className={`mb-3 ${
                      isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Explore
                  </span>
                </Link>
              </div>

              <div
                className={`mt-6 p-4 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <h4
                  className={`font-medium mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Daily Tip
                </h4>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Consistency is key! Try to complete at least one habit every
                  day to maintain your streak.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
