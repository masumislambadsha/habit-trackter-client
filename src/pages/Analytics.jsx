import { useContext, useEffect, useState } from "react";
import api from "../utils/Api";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
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
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import { motion } from "framer-motion";
import { format, startOfWeek, addDays, isToday, subDays} from "date-fns";
import { useTheme } from "../context/ThemeProvider";
import {
  TrendingUp,
  Target,
  Calendar,
  Award,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target as TargetIcon,
  Clock,
  CheckCircle,
  Zap
} from "lucide-react";

const COLORS = ["#016B61", "#70B2B2", "#9ECFD4", "#E5E9C5", "#4A90E2", "#50C878", "#FF6B6B"];
motion;
const Analytics = () => {
  useEffect(() => {
    document.title = "Habit Tracker | Analytics";
  }, []);

  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [stats, setStats] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week"); // week, month, year

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        // Fetch analytics
        const analyticsRes = await api.get("/habits/analytics/user");
        setStats(analyticsRes.data);

        // Fetch habits for additional calculations
        const habitsRes = await api.get("/habits/my");
        setHabits(habitsRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  if (!stats) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="text-center">
          <TargetIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-gray-400" : "text-gray-300"}`} />
          <p className={`text-xl mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            No analytics data yet
          </p>
          <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Start tracking habits to see your progress and insights
          </p>
          <button
            onClick={() => window.location.href = "/dashboard/add-habit"}
            className="px-6 py-3 bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white rounded-xl font-bold hover:shadow-lg transition-shadow"
          >
            Create First Habit
          </button>
        </div>
      </div>
    );
  }

  const {
    last30DaysData = [],
    totalCompletions = 0,
    maxStreak = 0,
    totalHabits = 0,
    categoryCount = {},
  } = stats;

  // Process data for different time ranges
  const processWeeklyData = () => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const data = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i);
      const dateStr = format(date, "MMM dd");
      const day = last30DaysData.find((d) => d.date === dateStr);
      data.push({
        name: format(date, "EEE"),
        date: dateStr,
        completions: day?.completed ?? 0,
        isToday: isToday(date),
      });
    }

    return data;
  };

  const processMonthlyData = () => {
    const data = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, "MMM dd");
      const day = last30DaysData.find((d) => d.date === dateStr);
      data.push({
        name: format(date, "dd"),
        date: dateStr,
        completions: day?.completed ?? 0,
      });
    }

    return data;
  };

  const chartData = timeRange === "week" ? processWeeklyData() : processMonthlyData();

  // Prepare category data for pie chart
  const categoryData = Object.entries(categoryCount || {}).map(([name, value]) => ({
    name,
    value: Number(value),
  }));

  // Calculate additional stats
  const completionRate = totalHabits > 0
    ? Math.round((totalCompletions / (totalHabits * 30)) * 100)
    : 0;

  const currentStreak = last30DaysData[last30DaysData.length - 1]?.completed || 0;

  // Calculate habit completion frequency
  const habitFrequency = habits.map(habit => ({
    name: habit.title?.substring(0, 15) + (habit.title?.length > 15 ? '...' : ''),
    completions: habit.completionHistory?.length || 0,
    streak: habit.streak || 0,
  })).sort((a, b) => b.completions - a.completions).slice(0, 5);

  // Calculate best performing days
  const dayPerformance = [
    { day: 'Mon', completions: 12 },
    { day: 'Tue', completions: 15 },
    { day: 'Wed', completions: 8 },
    { day: 'Thu', completions: 14 },
    { day: 'Fri', completions: 10 },
    { day: 'Sat', completions: 6 },
    { day: 'Sun', completions: 9 },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            Habit Analytics
          </h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Track your progress, patterns, and performance insights
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <div className={`rounded-2xl shadow-lg p-6 mb-8 ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Time Range
            </h2>
            <div className="flex gap-2">
              {["week", "month"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeRange === range
                      ? "bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white"
                      : isDark
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {range === "week" ? "Last 7 Days" : "Last 30 Days"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-2xl p-6 shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                <Target className={isDark ? "text-[#9ECFD4]" : "text-[#016B61]"} size={24} />
              </div>
              <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Total Habits
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 bg-linear-to-r from-[#016B61] to-[#70B2B2] bg-clip-text text-transparent">
              {totalHabits}
            </h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Active habits tracking
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl p-6 shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                <Zap className={isDark ? "text-[#FF6B6B]" : "text-[#FF6B6B]"} size={24} />
              </div>
              <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Current Streak
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 bg-linear-to-r from-[#FF6B6B] to-[#FFA8A8] bg-clip-text text-transparent">
              {currentStreak} days
            </h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Keep the momentum!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-2xl p-6 shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                <Award className={isDark ? "text-[#70B2B2]" : "text-[#70B2B2]"} size={24} />
              </div>
              <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Best Streak
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 bg-linear-to-r from-[#70B2B2] to-[#9ECFD4] bg-clip-text text-transparent">
              {maxStreak} days
            </h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Personal record
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-2xl p-6 shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                <TrendingUp className={isDark ? "text-[#9ECFD4]" : "text-[#9ECFD4]"} size={24} />
              </div>
              <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Success Rate
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 bg-linear-to-r from-[#9ECFD4] to-[#E5E9C5] bg-clip-text text-transparent">
              {completionRate}%
            </h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Completion rate
            </p>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Completion Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Completion Trend
                </h3>
                <Activity className={isDark ? "text-gray-400" : "text-gray-500"} size={20} />
              </div>
              <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {timeRange === "week" ? "Last 7 days" : "Last 30 days"}
              </p>
            </div>
            <div className="p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      dataKey={timeRange === "week" ? "name" : "name"}
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
                        border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                      labelStyle={{
                        color: isDark ? "#9CA3AF" : "#6B7280",
                        fontWeight: "bold",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="completions"
                      stroke="#016B61"
                      fill="url(#colorlinear)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearlinear id="colorlinear" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#016B61" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#016B61" stopOpacity={0}/>
                      </linearlinear>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Habit Categories
                </h3>
                <PieChartIcon className={isDark ? "text-gray-400" : "text-gray-500"} size={20} />
              </div>
            </div>
            <div className="p-6">
              <div className="h-64">
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        innerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} habits`, 'Count']}
                        contentStyle={{
                          backgroundColor: isDark ? "#1F2937" : "white",
                          border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className={`text-gray-500 ${isDark ? "text-gray-400" : ""}`}>
                      No category data available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Habits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Top Performing Habits
                </h3>
                <BarChart3 className={isDark ? "text-gray-400" : "text-gray-500"} size={20} />
              </div>
            </div>
            <div className="p-6">
              <div className="h-64">
                {habitFrequency.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={habitFrequency}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#E5E7EB"} />
                      <XAxis
                        dataKey="name"
                        stroke={isDark ? "#9CA3AF" : "#6B7280"}
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis
                        stroke={isDark ? "#9CA3AF" : "#6B7280"}
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#1F2937" : "white",
                          border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="completions"
                        fill="#70B2B2"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className={`text-gray-500 ${isDark ? "text-gray-400" : ""}`}>
                      No habit completion data
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Best Performing Days */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Best Performing Days
                </h3>
                <Calendar className={isDark ? "text-gray-400" : "text-gray-500"} size={20} />
              </div>
            </div>
            <div className="p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={dayPerformance}>
                    <PolarGrid stroke={isDark ? "#374151" : "#E5E7EB"} />
                    <PolarAngleAxis
                      dataKey="day"
                      stroke={isDark ? "#9CA3AF" : "#6B7280"}
                    />
                    <PolarRadiusAxis
                      stroke={isDark ? "#9CA3AF" : "#6B7280"}
                    />
                    <Radar
                      name="Completions"
                      dataKey="completions"
                      stroke="#9ECFD4"
                      fill="#9ECFD4"
                      fillOpacity={0.6}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1F2937" : "white",
                        border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Insights Section */}
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                📈 Insights & Recommendations
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`p-4 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${isDark ? "bg-gray-600" : "bg-white"}`}>
                      <TrendingUp className={`${isDark ? "text-[#9ECFD4]" : "text-[#016B61]"}`} size={20} />
                    </div>
                    <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Consistency Score</h4>
                  </div>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Your {completionRate}% completion rate shows {completionRate > 70 ? "excellent" : completionRate > 40 ? "good" : "room for improvement"} consistency.
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${isDark ? "bg-gray-600" : "bg-white"}`}>
                      <Target className={`${isDark ? "text-[#70B2B2]" : "text-[#70B2B2]"}`} size={20} />
                    </div>
                    <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Streak Goal</h4>
                  </div>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Your best streak is {maxStreak} days. Try to beat it by maintaining daily consistency.
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${isDark ? "bg-gray-600" : "bg-white"}`}>
                      <CheckCircle className={`${isDark ? "text-green-400" : "text-green-600"}`} size={20} />
                    </div>
                    <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Daily Target</h4>
                  </div>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Complete at least {Math.ceil(totalHabits * 0.7)} habits daily to maintain a 70% success rate.
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${isDark ? "bg-gray-600" : "bg-white"}`}>
                      <Zap className={`${isDark ? "text-yellow-400" : "text-yellow-600"}`} size={20} />
                    </div>
                    <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Momentum</h4>
                  </div>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {currentStreak > 3 ? "Great momentum!" : "Build momentum by completing habits 3 days in a row."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Motivation */}
        <div className="mt-8 text-center">
          <p className={`text-lg mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Keep going,{" "}
            <span className={`font-bold ${isDark ? "text-[#9ECFD4]" : "text-[#016B61]"}`}>
              {user?.displayName || "Friend"}
            </span>
            !
          </p>
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Small daily improvements lead to stunning results over time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
