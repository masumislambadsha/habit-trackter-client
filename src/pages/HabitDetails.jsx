import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../utils/Api";
import LoadingSpinner from "../components/LoadingSpinner";
import { format, isSameDay, subDays } from "date-fns";
import Lottie from "lottie-react";
import completeAnimation from "../assets/complete-animation.json";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeProvider";

const HabitDetails = () => {
  useEffect(() => {
      document.title = "Habit Tracker | Details";
    }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await api.get(`/habits/${id}`);
        setHabit(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          navigate("/not-found", { replace: true });
        } else {
          toast.error("Failed to load habit");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchHabit();
  }, [id, navigate]);

  const handleComplete = async () => {
    if (animating) return;
    setAnimating(true);
    try {
      await api.patch(`/habits/${id}/complete`);
      const { data } = await api.get(`/habits/${id}`);
      setHabit(data);
      toast.success("Marked complete!");
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to complete";
      toast.error(msg);
    } finally {
      setTimeout(() => setAnimating(false), 1000);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!habit) return null;

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), 29 - i);
    const completed = habit.completionHistory.some((d) =>
      isSameDay(new Date(d), date)
    );
    return { date: format(date, "MMM dd"), completed };
  });

  const completionRate =
    (habit.completionHistory.filter((d) => {
      const date = new Date(d);
      return date >= subDays(new Date(), 29);
    }).length /
      30) *
    100;

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 pt-25 ${
        isDark
          ? "bg-linear-to-br from-gray-900 to-gray-800"
          : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`rounded-3xl shadow-2xl p-8 border-4 relative overflow-hidden transition-colors duration-300 ${
            isDark
              ? "bg-gray-800 border-[#70B2B2]"
              : "bg-white border-[#016B61]"
          }`}
        >
          {animating && (
            <div
              className={`absolute inset-0 flex items-center justify-center z-50 backdrop-blur-sm rounded-3xl ${
                isDark ? "bg-gray-800/95" : "bg-white/95"
              }`}
            >
              <Lottie
                animationData={completeAnimation}
                loop={false}
                style={{ width: 200 }}
              />
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-2xl shadow-lg flex justify-center items-center">
              {habit.image ? (
                <img
                  src={habit.image}
                  alt={habit.title}
                  className="w-full h-64 object-cover rounded-4xl"
                />
              ) : (
                <div
                  className={`border-4 border-dashed rounded-2xl w-full h-64 flex items-center justify-center ${
                    isDark
                      ? "bg-linear-to-br from-gray-700 to-gray-600 border-[#70B2B2]/30"
                      : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4] border-[#016B61]/30"
                  }`}
                >
                  <span
                    className={`font-medium text-lg ${
                      isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                    }`}
                  >
                    No Image
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <h1
                  className={`text-3xl lg:text-4xl font-bold mb-2 ${
                    isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                  }`}
                >
                  {habit.title}
                </h1>
                <p
                  className={`text-lg ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {habit.description}
                </p>
                <p
                  className={`text-sm mt-2 italic ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  by {habit.userName}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-medium ${
                    isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                  }`}
                >
                  Category
                </span>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
                    isDark
                      ? "bg-[#70B2B2]/10 text-[#9ECFD4] border-[#70B2B2]/20"
                      : "bg-[#016B61]/10 text-[#016B61] border-[#016B61]/20"
                  }`}
                >
                  {habit.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-medium ${
                    isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                  }`}
                >
                  Streak
                </span>
                <span className="text-4xl font-bold bg-linear-to-r from-[#016B61] to-[#70B2B2] bg-clip-text text-transparent">
                  {habit.streak} days
                </span>
              </div>
              <div>
                <span
                  className={`font-medium block mb-2 ${
                    isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                  }`}
                >
                  30-Day Progress
                </span>
                <div
                  className={`w-full rounded-full h-5 overflow-hidden shadow-inner ${
                    isDark ? "bg-gray-700" : "bg-[#E5E9C5]"
                  }`}
                >
                  <div
                    className="h-full rounded-full bg-linear-to-r from-[#016B61] to-[#70B2B2] transition-all duration-1000 ease-out"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <p
                  className={`text-sm mt-2 font-medium ${
                    isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                  }`}
                >
                  {completionRate.toFixed(0)}% completed
                </p>
              </div>
              <button
                onClick={handleComplete}
                disabled={animating}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all transform ${
                  animating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-[#016B61] to-[#70B2B2] hover:shadow-xl hover:scale-[1.02] active:scale-95"
                }`}
              >
                {animating ? "Completing..." : "Mark Complete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
