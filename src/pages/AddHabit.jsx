import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/Api";
import toast from "react-hot-toast";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Globe, Lock } from "lucide-react";
motion;
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
        navigate("/dashboard/my-habits");
      }
    } catch (err) {
      console.error("Create habit error:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to create habit");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: "Morning", label: "🌅 Morning Routine", color: "#016B61" },
    { value: "Fitness", label: "💪 Fitness & Health", color: "#70B2B2" },
    { value: "Study", label: "📚 Study & Learning", color: "#9ECFD4" },
    { value: "Work", label: "💼 Work & Productivity", color: "#E5E9C5" },
    { value: "Evening", label: "🌙 Evening Wind Down", color: "#4A90E2" },
    { value: "Health", label: "❤️ Health & Wellness", color: "#50C878" },
    { value: "Mindfulness", label: "🧘 Mindfulness", color: "#9B59B6" },
    { value: "Creative", label: "🎨 Creative", color: "#E74C3C" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                onClick={() => navigate("/dashboard")}
                className={`flex items-center gap-2 mb-2 hover:underline ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                }`}
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
              <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                Create New Habit
              </h1>
              <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Build consistency, one day at a time
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Habit Details
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Creator
                    </label>
                    <div className={`p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                      <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                        {user?.displayName || "Anonymous"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Email
                    </label>
                    <div className={`p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                      <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Habit Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    maxLength={60}
                    placeholder="e.g., Drink 8 glasses of water daily"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                        : "border-gray-300 focus:ring-[#016B61] focus:border-[#016B61]"
                    }`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Make it clear and actionable
                    </p>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {formData.title.length}/60
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={`block text font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    maxLength={200}
                    placeholder="Why is this habit important to you? What benefits will it bring?"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 resize-none transition-colors duration-300 ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                        : "border-gray-300 focus:ring-[#016B61] focus:border-[#016B61]"
                    }`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Keep it motivational
                    </p>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {formData.description.length}/200
                    </p>
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className={`block text font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Category *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                        className={`p-3 rounded-xl border transition-all duration-300 text-left ${
                          formData.category === cat.value
                            ? "ring-2 ring-opacity-50"
                            : "hover:scale-[1.02]"
                        }`}
                        style={{
                          borderColor: formData.category === cat.value ? cat.color : isDark ? "#374151" : "#D1D5DB",
                          backgroundColor: formData.category === cat.value
                            ? isDark
                              ? `${cat.color}20`
                              : `${cat.color}10`
                            : isDark
                              ? "#374151"
                              : "#F3F4F6",
                          boxShadow: formData.category === cat.value ? `0 0 0 2px ${cat.color}40` : 'none',
                        }}
                      >
                        <span className="block text-xl mb-1">{cat.label.split(" ")[0]}</span>
                        <span className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          {cat.label.split(" ").slice(1).join(" ")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reminder Time & Image URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Daily Reminder Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        name="reminderTime"
                        value={formData.reminderTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 appearance-none ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                            : "border-gray-300 focus:ring-[#016B61] focus:border-[#016B61]"
                        }`}
                      />
                    </div>
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      We'll remind you at this time
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Cover Image URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://images.unsplash.com/photo-..."
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                            : "border-gray-300 focus:ring-[#016B61] focus:border-[#016B61]"
                        }`}
                      />
                      <Upload className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"}`} size={20} />
                    </div>
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Optional: Add a motivational image
                    </p>
                  </div>
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Image Preview
                    </label>
                    <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/800x400/016B61/FFFFFF?text=Invalid+Image+URL";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                {/* Privacy Toggle */}
                <div className={`p-4 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDark ? "bg-gray-600" : "bg-white"}`}>
                        {formData.public ? (
                          <Globe className={isDark ? "text-[#9ECFD4]" : "text-[#016B61]"} size={20} />
                        ) : (
                          <Lock className={isDark ? "text-gray-400" : "text-gray-500"} size={20} />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                          {formData.public ? "Public Habit" : "Private Habit"}
                        </p>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {formData.public
                            ? "Visible to the community"
                            : "Only visible to you"
                          }
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="public"
                        checked={formData.public}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-2 ${
                        isDark
                          ? 'bg-gray-600 peer-focus:ring-[#70B2B2] peer-checked:bg-[#70B2B2]'
                          : 'bg-gray-300 peer-focus:ring-[#016B61] peer-checked:bg-[#016B61]'
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-full`} />
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-linear-to-r from-[#016B61] to-[#70B2B2] hover:shadow-lg hover:scale-[1.02] active:scale-95"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Habit...
                      </span>
                    ) : (
                      "Create Habit"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className={`w-full mt-3 py-3 rounded-xl font-medium border transition-colors ${
                      isDark
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right Column - Tips */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  💡 Tips for Success
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                    <span className="text-lg">🎯</span>
                  </div>
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      Start Small
                    </p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Begin with 5-minute habits for better consistency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                    <span className="text-lg">⏰</span>
                  </div>
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      Set Reminders
                    </p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Choose a specific time that fits your routine.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                    <span className="text-lg">📈</span>
                  </div>
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      Track Progress
                    </p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Daily streaks build momentum and motivation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                    <span className="text-lg">🤝</span>
                  </div>
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      Share Publicly
                    </p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Public habits get community support and accountability.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  📊 Your Stats
                </h3>
              </div>
              <div className="p-6">
                <div className={`p-4 rounded-xl mb-4 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Habits Created
                  </p>
                  <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    Coming Soon
                  </p>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Current Streak
                  </p>
                  <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    0 days
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;
