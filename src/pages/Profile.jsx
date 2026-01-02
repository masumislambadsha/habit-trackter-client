import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Award,
  Target,
  Edit,
  Save,
  X,
  Camera,
  Bell,
  Shield,
  Globe,
  Trash2,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../utils/Api";
import Swal from "sweetalert2";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword
} from "firebase/auth";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalHabits: 0,
    currentStreak: 0,
    totalCompletions: 0,
    joinedDate: ""
  });

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    notifications: true,
    publicProfile: true
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Password visibility state
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Delete data state
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const habitsRes = await api.get("/habits/my");
      const habits = habitsRes.data;

      const totalHabits = habits.length;
      const totalCompletions = habits.reduce((sum, habit) => sum + (habit.completionHistory?.length || 0), 0);

      // Calculate current streak
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let currentStreak = 0;
      let checkDate = new Date(today);

      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        const hasCompletion = habits.some(habit =>
          habit.completionHistory?.some(completion => {
            const compDate = new Date(completion);
            compDate.setHours(0, 0, 0, 0);
            return compDate.toISOString().split('T')[0] === dateStr;
          })
        );

        if (hasCompletion) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }

      const joinedDate = user?.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : "Not available";

      setStats({
        totalHabits,
        currentStreak,
        totalCompletions,
        joinedDate
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const handleSave = async () => {
    if (!formData.displayName.trim()) {
      toast.error("Display name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await updateUserProfile(formData.displayName, formData.photoURL || null);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
      notifications: true,
      publicProfile: true
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, photoURL: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Complete password change functionality with Firebase
  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      toast.success("Password updated successfully!");

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      // Reset password visibility
      setShowPasswords({
        current: false,
        new: false,
        confirm: false
      });
    } catch (error) {
      console.error("Password change error:", error);
      let errorMessage = "Failed to change password. Please try again.";

      switch (error.code) {
        case 'auth/wrong-password':
          errorMessage = "Current password is incorrect.";
          break;
        case 'auth/weak-password':
          errorMessage = "New password is too weak. Please choose a stronger password.";
          break;
        case 'auth/requires-recent-login':
          errorMessage = "Please log in again and try changing your password.";
          break;
        default:
          break;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Delete all data functionality
  const handleDeleteAllData = async () => {
    if (deleteConfirmation !== "DELETE") {
      toast.error("Please type 'DELETE' to confirm");
      return;
    }

    const result = await Swal.fire({
      title: "Are you absolutely sure?",
      html: `
        <div class="text-left">
          <p class="mb-2">This action <strong>cannot</strong> be undone.</p>
          <p class="mb-2">This will permanently:</p>
          <ul class="list-disc pl-4 mb-4">
            <li>Delete all your habits</li>
            <li>Delete all your completion history</li>
            <li>Reset all your streaks</li>
            <li>Remove all your analytics data</li>
          </ul>
          <p>Your account will remain active but all data will be lost.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete everything",
      cancelButtonText: "Cancel",
      background: isDark ? "#1f2937" : "#fff",
      color: isDark ? "#fff" : "#000",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        // Delete all habits
        const habitsRes = await api.get("/habits/my");
        const habits = habitsRes.data;

        // Delete each habit
        for (const habit of habits) {
          await api.delete(`/habits/${habit._id}`);
        }

        // Reset local state
        setStats({
          totalHabits: 0,
          currentStreak: 0,
          totalCompletions: 0,
          joinedDate: stats.joinedDate
        });

        setDeleteConfirmation("");

        Swal.fire({
          title: "Success!",
          text: "All your data has been permanently deleted.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          background: isDark ? "#1f2937" : "#fff",
          color: isDark ? "#fff" : "#000",
        });

        toast.success("All data deleted successfully");
      } catch (error) {
        toast.error("Failed to delete data. Please try again.");
        console.error("Delete error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            Profile Settings
          </h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    Profile Information
                  </h3>
                  <button
                    onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                      isEditing
                        ? isDark
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                        : isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <X size={18} />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit size={18} />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                        {formData.photoURL ? (
                          <img
                            src={formData.photoURL}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#016B61] to-[#70B2B2] flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">
                              {formData.displayName?.[0]?.toUpperCase() || "U"}
                            </span>
                          </div>
                        )}
                      </div>

                      {isEditing && (
                        <label className="absolute bottom-0 right-0 cursor-pointer">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#016B61] to-[#70B2B2] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                            <Camera size={20} className="text-white" />
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {isEditing && (
                      <p className={`text-xs mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Click camera icon to upload new photo
                      </p>
                    )}
                  </div>

                  {/* Profile Form */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Display Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.displayName}
                          onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-xl border transition-colors duration-300 ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9ECFD4] focus:border-transparent"
                              : "border-gray-300 focus:ring-2 focus:ring-[#016B61] focus:border-transparent"
                          }`}
                          placeholder="Enter your name"
                        />
                      ) : (
                        <p className={`px-4 py-3 rounded-xl ${isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}>
                          {formData.displayName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Email Address
                      </label>
                      <div className="flex items-center gap-3">
                        <Mail size={18} className={isDark ? "text-gray-400" : "text-gray-500"} />
                        <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          {formData.email}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Member Since
                      </label>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className={isDark ? "text-gray-400" : "text-gray-500"} />
                        <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          {stats.joinedDate}
                        </p>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="pt-4">
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                            loading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-[#016B61] to-[#70B2B2] hover:shadow-lg"
                          }`}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Saving...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <Save size={18} />
                              Save Changes
                            </span>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`rounded-2xl p-6 ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                    <Target className={isDark ? "text-[#9ECFD4]" : "text-[#016B61]"} size={24} />
                  </div>
                  <div>
                    <h4 className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {stats.totalHabits}
                    </h4>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Total Habits
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-2xl p-6 ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                    <Award className={isDark ? "text-[#70B2B2]" : "text-[#70B2B2]"} size={24} />
                  </div>
                  <div>
                    <h4 className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {stats.currentStreak}
                    </h4>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Day Streak
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`rounded-2xl p-6 ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                    <User className={isDark ? "text-[#E5E9C5]" : "text-[#9ECFD4]"} size={24} />
                  </div>
                  <div>
                    <h4 className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {stats.totalCompletions}
                    </h4>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Completions
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Preferences
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className={isDark ? "text-gray-400" : "text-gray-500"} />
                    <div>
                      <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                        Email Notifications
                      </p>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Receive updates about your habits
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications}
                      onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe size={20} className={isDark ? "text-gray-400" : "text-gray-500"} />
                    <div>
                      <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                        Public Profile
                      </p>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Show your habits to the community
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.publicProfile}
                      onChange={(e) => setFormData(prev => ({ ...prev, publicProfile: e.target.checked }))}
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
            </motion.div>
          </div>

          {/* Right Column - Account Security */}
          <div className="space-y-6">
            {/* Account Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Account Security
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {/* Account Status */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <Shield size={20} className="text-green-600 dark:text-green-400" />
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      Account Status
                    </p>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      Your account is secure
                    </p>
                  </div>
                </div>

                {/* Change Password */}
                <div className="space-y-4">
                  <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    Change Password
                  </h4>

                  {/* Current Password */}
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      placeholder="Current Password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className={`w-full px-4 py-3 pr-12 rounded-xl border transition-colors duration-300 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 ${
                        isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {showPasswords.current ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  {/* New Password */}
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      placeholder="New Password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className={`w-full px-4 py-3 pr-12 rounded-xl border transition-colors duration-300 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 ${
                        isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {showPasswords.new ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  {/* Confirm New Password */}
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      placeholder="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`w-full px-4 py-3 pr-12 rounded-xl border transition-colors duration-300 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 ${
                        isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {showPasswords.confirm ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    disabled={loading}
                    className={`w-full py-3 rounded-xl font-medium transition-colors ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#016B61] to-[#70B2B2] text-white hover:shadow-md"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className={`p-4 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <p className={`text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Password Requirements:
                  </p>
                  <ul className={`text-xs space-y-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    <li>• At least 6 characters long</li>
                    <li>• Should not match your current password</li>
                    <li>• Use a mix of letters, numbers, and symbols</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`rounded-2xl shadow-lg border border-red-200 dark:border-red-800 ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="p-6 border-b border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-red-500" size={20} />
                  <h3 className={`text-xl font-bold ${isDark ? "text-red-400" : "text-red-600"}`}>
                    Danger Zone
                  </h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    This will permanently delete all your habits, streaks, and analytics data.
                  </p>
                  <div className="space-y-2">
                    <p className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Type "DELETE" to confirm:
                    </p>
                    <input
                      type="text"
                      placeholder="Type DELETE here"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-colors duration-300 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                  </div>
                </div>
                <button
                  onClick={handleDeleteAllData}
                  disabled={loading || deleteConfirmation !== "DELETE"}
                  className={`w-full py-3 rounded-xl font-medium border transition-colors flex items-center justify-center gap-2 ${
                    deleteConfirmation === "DELETE"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : isDark
                      ? "border-red-800 text-red-400 hover:bg-red-900/20 cursor-not-allowed"
                      : "border-red-300 text-red-600 hover:bg-red-50 cursor-not-allowed"
                  }`}
                >
                  <Trash2 size={18} />
                  Delete All Data
                </button>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                  This action cannot be undone.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
