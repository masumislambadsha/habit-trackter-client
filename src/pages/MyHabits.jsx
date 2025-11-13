import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../utils/Api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { format } from "date-fns";
import Lottie from "lottie-react";
import completeAnimation from "../assets/complete-animation.json";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTheme } from "../context/ThemeProvider";

const MyHabits = () => {
  useEffect(() => {
      document.title = "Habit Tracker | My Habit";
    }, []);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState(null);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
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
    fetchMyHabits();
  }, []);

  const handleComplete = async (id) => {
    if (completingId) return;
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
      toast.success("Marked complete!", { autoClose: 1500 });
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to mark complete");
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-gray-900 to-gray-800"
          : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
      }`}
    >
      <div className="max-w-6xl mx-auto pt-15">
        <div className="flex justify-between items-center mb-10">
          <h1
            className={`text-4xl font-bold ${
              isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
            }`}
          >
            My Habits
          </h1>
          <button
            onClick={() => navigate("/add-habit")}
            className="px-6 py-3 bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            + Add New Habit
          </button>
        </div>
        {habits.length === 0 ? (
          <div
            className={`text-center py-20 rounded-3xl shadow-lg border transition-colors duration-300 ${
              isDark
                ? "bg-gray-800/80 backdrop-blur-sm border-gray-600"
                : "bg-white/80 backdrop-blur-sm border-white/40"
            }`}
          >
            <p
              className={`text-xl mb-4 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              No habits yet.
            </p>
            <button
              onClick={() => navigate("/add-habit")}
              className={`font-bold text-lg hover:underline ${
                isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
              }`}
            >
              Create your first habit
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <div
                key={habit._id}
                className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border group relative overflow-hidden ${
                  isDark
                    ? "bg-gray-800/80 backdrop-blur-sm border-gray-600 hover:bg-gray-700/80"
                    : "bg-white/80 backdrop-blur-sm border-white/40 hover:bg-white/90"
                }`}
              >
                {completingId === habit._id && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center z-50 backdrop-blur-sm rounded-2xl ${
                      isDark ? "bg-gray-800/95" : "bg-white/95"
                    }`}
                  >
                    <Lottie
                      animationData={completeAnimation}
                      loop={false}
                      style={{
                        width: 120,
                        filter: "hue-rotate(0deg) saturate(100%)",
                      }}
                    />
                  </div>
                )}
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                  }`}
                >
                  {habit.title}
                </h3>
                <p
                  className={`mb-3 line-clamp-2 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {habit.description}
                </p>
                <div
                  className={`text-sm space-y-1 mb-4 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {habit.category}
                  </p>
                  {habit.reminderTime && (
                    <p>
                      <span className="font-semibold">Reminder:</span>{" "}
                      {habit.reminderTime}
                    </p>
                  )}
                  {habit.createdAt && (
                    <p>
                      <span className="font-semibold">Created:</span>{" "}
                      {format(new Date(habit.createdAt), "MMM d, yyyy")}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between gap-10 mb-4">
                  <span
                    className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-bold text-center ${
                      isDark
                        ? "bg-gray-700 text-[#9ECFD4]"
                        : "bg-[#E5E9C5] text-[#016B61]"
                    }`}
                  >
                    {habit.streak} day streak
                  </span>
                  <button
                    onClick={() => handleComplete(habit._id)}
                    disabled={completingId === habit._id}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-1.5 ${
                      completingId === habit._id
                        ? "bg-green-400 text-white cursor-not-allowed"
                        : "bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white hover:shadow-md active:scale-95"
                    }`}
                  >
                    {completingId === habit._id ? (
                      "Completing..."
                    ) : (
                      <>Checkmark Mark Complete</>
                    )}
                  </button>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/habit/${habit._id}`}
                    className={`flex-1 text-center py-2 rounded-lg font-medium hover:underline transition ${
                      isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-white/60 text-gray-700 hover:bg-white/80"
                    }`}
                  >
                    View
                  </Link>
                  <Link
                    to={`/update-habit/${habit._id}`}
                    className="flex-1 text-center bg-[#70B2B2] text-white py-2 rounded-lg font-medium hover:bg-[#016B61] transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(habit._id, habit.title)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHabits;
