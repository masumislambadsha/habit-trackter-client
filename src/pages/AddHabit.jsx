import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/Api";
import toast from "react-hot-toast";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";

const AddHabit = () => {
  useEffect(() => {
      document.title = "Habit Tracker | Add Habit";
    }, []);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Morning",
    reminderTime: "09:00",
    image: "",
    public: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill in Title, Description, and Category");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...formData,
        userName: auth.currentUser?.displayName || "Anonymous",
        userEmail: auth.currentUser?.email || "unknown@example.com",
      };
      const res = await api.post("/habits", payload);
      if (res.data.success) {
        toast.success("Habit created successfully!");
        navigate("/my-habits");
      }
    } catch (err) {
      console.error("Create habit error:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to create habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 pt-25 ${
        isDark
          ? "bg-linear-to-br from-gray-900 to-gray-800"
          : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1
            className={`text-4xl font-bold mb-2 ${
              isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
            }`}
          >
            Create New Habit
          </h1>
          <p className={isDark ? "text-gray-300" : "text-gray-600"}>
            Build consistency, one day at a time
          </p>
        </div>
        <div
          className={`rounded-3xl shadow-xl p-8 md:p-10 transition-colors duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                User Name
              </label>
              <input
                type="text"
                name="title"
                value={user.displayName}
                readOnly
                maxLength={60}
                className={`outline-0 w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-transparent"
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                User Email
              </label>
              <input
                type="text"
                name="title"
                value={user.email}
                readOnly
                maxLength={60}
                className={`outline-0 w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-transparent"
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Habit Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={60}
                placeholder="e.g., Drink 8 glasses of water"
                className={`outline-0 w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-transparent"
                }`}
              />
              <p
                className={`text-xs mt-1 text-right ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {formData.title.length}/60
              </p>
            </div>
            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                maxLength={200}
                placeholder="Why do you want to build this habit?"
                className={`outline-0 w-full px-4 py-3 border rounded-xl focus:ring-2 resize-none transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-transparent"
                }`}
              />
              <p
                className={`text-xs mt-1 text-right ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {formData.description.length}/200
              </p>
            </div>
            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`outline-0 w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-transparent"
                }`}
              >
                <option value="Morning">Morning Routine</option>
                <option value="Fitness">Fitness & Health</option>
                <option value="Study">Study & Learning</option>
                <option value="Work">Work & Productivity</option>
                <option value="Evening">Evening Wind Down</option>
                <option value="Mindfulness">Mindfulness</option>
              </select>
            </div>
            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Daily Reminder Time
              </label>
              <input
                type="time"
                name="reminderTime"
                value={formData.reminderTime}
                onChange={handleChange}
                className={`outline-0 w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-transparent"
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className={`outline-0 w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-transparent"
                }`}
              />
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl shadow-md"
                    onError={(e) => {
                      e.target.src = "";
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
            <div
              className={`flex items-center justify-between p-4 rounded-xl ${
                isDark ? "bg-gray-700" : "bg-[#E5E9C5]"
              }`}
            >
              <div>
                <p
                  className={`font-semibold ${
                    isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                  }`}
                >
                  Make Public?
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Share with the community
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="public"
                  checked={formData.public}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-4 transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-600 peer-focus:ring-[#70B2B2] peer-checked:bg-[#70B2B2]"
                      : "bg-gray-300 peer-focus:ring-[#70B2B2] peer-checked:bg-[#016B61]"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform duration-300 peer-checked:translate-x-full`}
                  ></div>
                </div>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all transform hover:scale-105 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-[#016B61] to-[#70B2B2] hover:from-[#70B2B2] hover:to-[#9ECFD4] shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Habit"
              )}
            </button>
          </form>
          <button
            onClick={() => navigate(-1)}
            className={`w-full mt-4 py-3 font-medium hover:underline transition ${
              isDark
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;
