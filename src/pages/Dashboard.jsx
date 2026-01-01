import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";
import api from "../utils/Api";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    streak: 0,
    avgRating: 0,
  });
  const [habitsTable, setHabitsTable] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecentHabits();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Stats fetch failed:", err);
    }
  };

  const fetchRecentHabits = async () => {
    try {
      const res = await api.get("/habits/recent");
      setHabitsTable(res.data.slice(0, 5));
    } catch (err) {
      console.error("Habits fetch failed:", err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 rounded-2xl border shadow-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Habits</h3>
          <p className="text-3xl font-bold text-[#016B61] dark:text-[#9ECFD4]">{stats.totalHabits}</p>
        </div>
        <div className={`p-6 rounded-2xl border shadow-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Completed Today</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completedToday}</p>
        </div>
        <div className={`p-6 rounded-2xl border shadow-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Current Streak</h3>
          <p className="text-3xl font-bold text-orange-500">{stats.streak} days</p>
        </div>
        <div className={`p-6 rounded-2xl border shadow-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Avg Rating</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.avgRating}/5</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-6 rounded-2xl border shadow-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Recent Habits</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Streak</th>
                </tr>
              </thead>
              <tbody>
                {habitsTable.map((habit) => (
                  <tr key={habit._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="py-3 px-4 font-medium">{habit.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200">
                        {habit.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-green-600">{habit.streak} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border shadow-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Habit Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Weekly Completion</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                <div className="bg-linear-to-r from-[#016B61] to-[#70B2B2] h-3 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
