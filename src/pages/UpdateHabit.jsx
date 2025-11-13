import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import api from "../utils/Api";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";

const UpdateHabit = () => {
  useEffect(() => {
      document.title = "Habit Tracker | Update Habit";
    }, []);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    reminderTime: "",
    image: "",
  });

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await api.get(`/habits/${id}`);
        const data = res.data;
        setForm({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          reminderTime: data.reminderTime || "",
          image: data.image || "",
        });
      } catch {
        toast.error("Failed");
        navigate("/my-habits");
      } finally {
        setLoading(false);
      }
    };
    fetchHabit();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      reminderTime: form.reminderTime || undefined,
      image: form.image || undefined,
    };
    if (!payload.title || !payload.description || !payload.category) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await api.patch(`/habits/${id}`, payload);
      toast.success("Habit updated successfully!");
      navigate("/my-habits");
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-gray-900 to-gray-800"
          : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-linear-to-r from-[#016B61] to-[#70B2B2] bg-clip-text text-transparent">
            Update Habit
          </h1>
        </div>
        <div
          className={`rounded-3xl shadow-2xl p-8 border-4 transition-colors duration-300 ${
            isDark
              ? "bg-gray-800 border-[#70B2B2]"
              : "bg-white border-[#016B61]"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                  }`}
                >
                  User Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || "Anonymous"}
                  readOnly
                  className={`w-full px-4 py-3 border rounded-xl cursor-not-allowed transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-300"
                      : "bg-gray-50 border-[#9ECFD4] text-gray-700"
                  }`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                  }`}
                >
                  User Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className={`w-full px-4 py-3 border rounded-xl cursor-not-allowed transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-300"
                      : "bg-gray-50 border-[#9ECFD4] text-gray-700"
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                }`}
              >
                Habit Title
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter habit title"
                className={`w-full px-5 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                }`}
              >
                Description
              </label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe your habit and why you want to build it..."
                className={`w-full px-5 py-3 border rounded-xl focus:ring-2 focus:border-transparent resize-none transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                }`}
              >
                Category
              </label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g., Morning Routine, Fitness, Work"
                className={`w-full px-5 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                }`}
              >
                Reminder Time (optional)
              </label>
              <input
                type="time"
                value={form.reminderTime}
                onChange={(e) =>
                  setForm({ ...form, reminderTime: e.target.value })
                }
                className={`w-full px-5 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                }`}
              >
                Habit Image URL (optional)
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-5 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
              />

              {form.image && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-28 h-28 object-cover rounded-xl shadow-md border-2 border-[#016B61]/20"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/150/016B61/FFFFFF?text=Invalid+URL";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <p
                    className={`text-xs max-w-xs ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Paste a direct image link (e.g., from Unsplash, Imgur)
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 py-4 rounded-xl font-bold text-white text-lg shadow-lg bg-linear-to-r from-[#016B61] to-[#70B2B2] hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                Update Habit
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-habits")}
                className={`flex-1 py-4 rounded-xl font-bold border-2 bg-white hover:scale-[1.02] active:scale-95 transition-all ${
                  isDark
                    ? "border-[#70B2B2] text-[#9ECFD4] hover:bg-gray-700"
                    : "border-[#016B61] text-[#016B61] hover:bg-[#E5E9C5]"
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateHabit;
