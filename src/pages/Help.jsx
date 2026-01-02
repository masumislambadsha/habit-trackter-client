import React, { useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Video,
  Book,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
motion;
const Help = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqs, setOpenFaqs] = useState({});
  const [activeTab, setActiveTab] = useState("faq");

  const faqCategories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: "🚀",
      faqs: [
        {
          question: "How do I create my first habit?",
          answer:
            "Click the 'Create Habit' button on your dashboard, choose a habit type, set your frequency, and add any reminders. You can start with small, achievable goals and gradually increase them.",
        },
        {
          question: "Can I track multiple habits at once?",
          answer:
            "Yes! You can track unlimited habits simultaneously. We recommend starting with 3-5 habits to avoid overwhelm and ensure consistency.",
        },
        {
          question: "How do reminders work?",
          answer:
            "You can set email, push, or browser notifications. Reminders are sent at your chosen times and can be customized for each habit.",
        },
      ],
    },
    {
      id: "account",
      name: "Account & Settings",
      icon: "⚙️",
      faqs: [
        {
          question: "How do I change my password?",
          answer:
            "Go to Profile > Account Security > Change Password. You'll need to enter your current password and then create a new one.",
        },
        {
          question: "Can I export my habit data?",
          answer:
            "Yes, you can export your habit history as CSV or PDF from the Analytics page. This includes all your completion data and streaks.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "Visit Profile > Danger Zone to delete your data or account. Note: Account deletion is permanent and cannot be undone.",
        },
      ],
    },
    {
      id: "features",
      name: "Features & Usage",
      icon: "✨",
      faqs: [
        {
          question: "What are streaks and how are they calculated?",
          answer:
            "Streaks count consecutive days you've completed a habit. Your streak resets if you miss a day. The current streak is displayed on your dashboard.",
        },
        {
          question: "How do habit categories work?",
          answer:
            "Categories help organize your habits. You can create custom categories like Health, Work, Personal, etc. This helps with filtering and analytics.",
        },
        {
          question: "Can I track habits with friends?",
          answer:
            "Yes! Use the Community feature to create accountability groups, share progress, and compete in friendly challenges.",
        },
      ],
    },
    {
      id: "troubleshooting",
      name: "Troubleshooting",
      icon: "🔧",
      faqs: [
        {
          question: "My reminders aren't working",
          answer:
            "Check your notification settings in Profile > Preferences. Ensure notifications are enabled for your browser/device. Also check spam folder for email reminders.",
        },
        {
          question: "I can't log into my account",
          answer:
            "Try resetting your password. If you're using social login, ensure you're using the correct account. Clear browser cache or try incognito mode.",
        },
        {
          question: "Data isn't syncing across devices",
          answer:
            "Ensure you're logged into the same account on all devices. Check your internet connection. Force refresh the app or restart your browser.",
        },
      ],
    },
  ];

  const supportChannels = [
    {
      icon: <MessageCircle size={24} />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      availability: "Available now",
      action: "Start Chat",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Mail size={24} />,
      title: "Email Support",
      description: "Get detailed responses within 24 hours",
      availability: "24/7",
      action: "Send Email",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Phone size={24} />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Call Now",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const resources = [
    {
      icon: <Book size={20} />,
      title: "User Guide",
      description: "Complete guide to all features",
      format: "PDF",
      action: "Download Guide",
    },
    {
      icon: <Video size={20} />,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      format: "Videos",
      action: "Watch Now",
    },
    {
      icon: <FileText size={20} />,
      title: "API Documentation",
      description: "For developers and integrations",
      format: "Web",
      action: "View Docs",
    },
  ];

  const toggleFaq = (categoryId, faqIndex) => {
    const key = `${categoryId}-${faqIndex}`;
    setOpenFaqs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allFaqs = faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ ...faq, category: category.name }))
  );

  const filteredFaqs = allFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`mt-16 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#016B61]/10 to-[#70B2B2]/10 mb-6">
            <HelpCircle className="text-[#016B61]" size={20} />
            <span
              className={`font-medium ${
                isDark ? "text-[#70B2B2]" : "text-[#016B61]"
              }`}
            >
              Help & Support Center
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            How can we{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#016B61] to-[#70B2B2]">
              help
            </span>{" "}
            you?
          </h1>

          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Find answers, guides, and support for all your Habit Tracker
            questions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative">
            <Search
              className={`absolute left-6 top-1/2 transform -translate-y-1/2 ${
                isDark ? "text-gray-400" : "text-gray-400"
              }`}
              size={24}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className={`w-full pl-16 pr-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-[#016B61] text-lg ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
          <p
            className={`text-center mt-4 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Try searching for "password reset", "notifications", or "habits"
          </p>
        </motion.div>

        <div className="flex border-b mb-8">
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === "faq"
                ? isDark
                  ? "text-white"
                  : "text-gray-900"
                : isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            FAQ
            {activeTab === "faq" && (
              <motion.div
                layoutId="activeTab"
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                  isDark ? "bg-[#70B2B2]" : "bg-[#016B61]"
                }`}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === "contact"
                ? isDark
                  ? "text-white"
                  : "text-gray-900"
                : isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Contact Support
            {activeTab === "contact" && (
              <motion.div
                layoutId="activeTab"
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                  isDark ? "bg-[#70B2B2]" : "bg-[#016B61]"
                }`}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === "resources"
                ? isDark
                  ? "text-white"
                  : "text-gray-900"
                : isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Resources
            {activeTab === "resources" && (
              <motion.div
                layoutId="activeTab"
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                  isDark ? "bg-[#70B2B2]" : "bg-[#016B61]"
                }`}
              />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {searchQuery && (
                <div>
                  <h2
                    className={`text-2xl font-bold mb-6 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Search Results ({filteredFaqs.length})
                  </h2>
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`rounded-xl overflow-hidden ${
                          isDark ? "bg-gray-800" : "bg-white"
                        } shadow-lg`}
                      >
                        <button
                          onClick={() =>
                            toggleFaq(
                              faq.category.toLowerCase().replace(/\s+/g, "-"),
                              index
                            )
                          }
                          className="w-full p-6 text-left flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <div
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                                isDark
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {faq.category}
                            </div>
                            <h3
                              className={`text-lg font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {faq.question}
                            </h3>
                          </div>
                          {openFaqs[
                            `${faq.category
                              .toLowerCase()
                              .replace(/\s+/g, "-")}-${index}`
                          ] ? (
                            <ChevronUp
                              className={
                                isDark ? "text-gray-400" : "text-gray-500"
                              }
                              size={20}
                            />
                          ) : (
                            <ChevronDown
                              className={
                                isDark ? "text-gray-400" : "text-gray-500"
                              }
                              size={20}
                            />
                          )}
                        </button>
                        <AnimatePresence>
                          {openFaqs[
                            `${faq.category
                              .toLowerCase()
                              .replace(/\s+/g, "-")}-${index}`
                          ] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div
                                className={`px-6 pb-6 ${
                                  isDark ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-8">
                {faqCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{category.icon}</span>
                      <h2
                        className={`text-2xl font-bold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {category.name}
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => (
                        <div
                          key={faqIndex}
                          className={`rounded-xl overflow-hidden ${
                            isDark ? "bg-gray-800" : "bg-white"
                          } shadow-lg`}
                        >
                          <button
                            onClick={() => toggleFaq(category.id, faqIndex)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <h3
                              className={`text-lg font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {faq.question}
                            </h3>
                            {openFaqs[`${category.id}-${faqIndex}`] ? (
                              <ChevronUp
                                className={
                                  isDark ? "text-gray-400" : "text-gray-500"
                                }
                                size={20}
                              />
                            ) : (
                              <ChevronDown
                                className={
                                  isDark ? "text-gray-400" : "text-gray-500"
                                }
                                size={20}
                              />
                            )}
                          </button>
                          <AnimatePresence>
                            {openFaqs[`${category.id}-${faqIndex}`] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div
                                  className={`px-6 pb-6 ${
                                    isDark ? "text-gray-300" : "text-gray-600"
                                  }`}
                                >
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {supportChannels.map((channel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-2xl p-6 relative overflow-hidden group ${
                      isDark ? "bg-gray-800" : "bg-white"
                    } shadow-lg`}
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${channel.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                    />
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-linear-to-br ${channel.color}`}
                      >
                        {channel.icon}
                      </div>
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {channel.title}
                      </h3>
                      <p
                        className={`mb-4 ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {channel.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock
                            size={16}
                            className={
                              isDark ? "text-gray-400" : "text-gray-500"
                            }
                          />
                          <span
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {channel.availability}
                          </span>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg font-medium ${
                            isDark
                              ? "bg-gray-700 text-white hover:bg-gray-600"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {channel.action}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div
                className={`rounded-2xl p-6 ${
                  isDark ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="text-green-500" size={24} />
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      All Systems Operational
                    </h3>
                    <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                      Last updated: Just now
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      API
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      Dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      Notifications
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      Mobile App
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "resources" && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-2xl p-6 ${
                      isDark ? "bg-gray-800" : "bg-white"
                    } shadow-lg`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 rounded-lg ${
                          isDark ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        {resource.icon}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {resource.format}
                      </span>
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {resource.title}
                    </h3>
                    <p
                      className={`mb-6 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {resource.description}
                    </p>
                    <button
                      className={`flex items-center gap-2 font-medium ${
                        isDark
                          ? "text-[#70B2B2] hover:text-[#9ECFD4]"
                          : "text-[#016B61] hover:text-[#70B2B2]"
                      }`}
                    >
                      {resource.icon.type === Download ? (
                        <>
                          <Download size={16} />
                          {resource.action}
                        </>
                      ) : (
                        <>
                          {resource.action}
                          <ExternalLink size={16} />
                        </>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>

              <div
                className={`rounded-2xl p-8 ${
                  isDark ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Quick Links
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <a
                    href="/about"
                    className={`p-4 rounded-xl text-center hover:scale-105 transition-transform ${
                      isDark
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <div className="text-lg font-bold mb-1">👥</div>
                    <span className={isDark ? "text-white" : "text-gray-900"}>
                      About Us
                    </span>
                  </a>
                  <a
                    href="/blog"
                    className={`p-4 rounded-xl text-center hover:scale-105 transition-transform ${
                      isDark
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <div className="text-lg font-bold mb-1">📝</div>
                    <span className={isDark ? "text-white" : "text-gray-900"}>
                      Blog
                    </span>
                  </a>
                  <a
                    href="/privacy"
                    className={`p-4 rounded-xl text-center hover:scale-105 transition-transform ${
                      isDark
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <div className="text-lg font-bold mb-1">🔒</div>
                    <span className={isDark ? "text-white" : "text-gray-900"}>
                      Privacy
                    </span>
                  </a>
                  <a
                    href="/terms"
                    className={`p-4 rounded-xl text-center hover:scale-105 transition-transform ${
                      isDark
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <div className="text-lg font-bold mb-1">📄</div>
                    <span className={isDark ? "text-white" : "text-gray-900"}>
                      Terms
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Help;
