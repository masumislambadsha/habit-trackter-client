import { useContext, useEffect, useState } from "react";
import api from "../utils/Api";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { useTheme } from "../context/ThemeProvider";

const COLORS = ["#016B61", "#70B2B2", "#9ECFD4", "#E5E9C5"];

const Analytics = () => {
  useEffect(() => {
      document.title = "Habit Tracker | Analytics";
    }, []);
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;
      try {
        const res = await api.get("/habits/analytics/user");
        setStats(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  if (!stats) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300  ${
          isDark
            ? "bg-linear-to-br from-gray-900 to-gray-800"
            : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
        }`}
      >
        <p
          className={`text-xl ${isDark ? "text-[#9ECFD4]" : "text-[#016B61]"}`}
        >
          No analytics data yet. Start tracking habits!
        </p>
      </div>
    );
  }

  const {
    last30DaysData,
    totalCompletions,
    maxStreak,
    totalHabits,
    categoryCount = {},
  } = stats;

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const fmt = format(date, "MMM dd");
    const day = last30DaysData.find((d) => d.date === fmt);
    return {
      name: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      completed: day?.completed ?? 0,
      isToday: isToday(date),
    };
  });

  const pieData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value: Number(value),
  }));

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-gray-900 to-gray-800"
          : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
      }`}
    >
      <div className="max-w-7xl mx-auto pt-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl md:text-5xl font-bold text-center mb-12 ${
            isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
          }`}
        >
          Your Habit Analytics
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Habits", value: totalHabits },
            {
              label: "Current Streak",
              value: last7Days.find((d) => d.isToday)?.completed ?? 0,
              suffix: " days",
            },
            { label: "Best Streak", value: maxStreak, suffix: " days" },
            {
              label: "Success Rate",
              value: totalHabits
                ? `${Math.round(
                    (totalCompletions / (totalHabits * 30)) * 100
                  )}%`
                : "0%",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-6 shadow-lg border backdrop-blur-sm text-center transition-colors duration-300 ${
                isDark
                  ? "bg-gray-800/90 border-gray-600"
                  : "bg-white/90 border-[#9ECFD4]"
              }`}
            >
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.label}
              </p>
              <p
                className={`text-3xl font-bold mt-2 ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                }`}
              >
                {stat.value}
                {stat.suffix || ""}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-2xl p-6 shadow-lg border backdrop-blur-sm transition-colors duration-300 ${
              isDark
                ? "bg-gray-800/90 border-gray-600"
                : "bg-white/90 border-[#9ECFD4]"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
              }`}
            >
              7-Day Activity
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={last7Days}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#374151" : "#E5E9C5"}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: isDark ? "#9ECFD4" : "#016B61" }}
                />
                <YAxis tick={{ fill: isDark ? "#9ECFD4" : "#016B61" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1f2937" : "#016B61",
                    border: "none",
                    borderRadius: "8px",
                    color: isDark ? "#9ECFD4" : "#E5E9C5",
                  }}
                  labelStyle={{ color: isDark ? "#9ECFD4" : "#E5E9C5" }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#70B2B2"
                  strokeWidth={3}
                  dot={{ fill: isDark ? "#9ECFD4" : "#016B61" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-2xl p-6 shadow-lg border backdrop-blur-sm transition-colors duration-300 ${
              isDark
                ? "bg-gray-800/90 border-gray-600"
                : "bg-white/90 border-[#9ECFD4]"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
              }`}
            >
              Habits by Category
            </h3>
            {pieData.length ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((_, i) => (
                        <Cell
                          key={`cell-${i}`}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {pieData.map((cat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[i % COLORS.length],
                        }}
                      />
                      <span
                        className={`text-sm ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {cat.name} ({cat.value})
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p
                className={`text-center ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No category data available yet.
              </p>
            )}
          </motion.div>
        </div>
        <div className="mt-12 text-center">
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Keep going,{" "}
            <span
              className={`font-bold ${
                isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
              }`}
            >
              {user?.displayName || "Friend"}
            </span>
            !
          </p>
          <p
            className={`text-sm mt-1 ${
              isDark ? "text-gray-500" : "text-gray-500"
            }`}
          >
            You're building something amazing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
