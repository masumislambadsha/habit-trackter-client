import React, { useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      details: "support@habitflow.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: <MapPin size={24} />,
      title: "Office",
      details: "123 Habit Street, Suite 100",
      description: "San Francisco, CA 94107",
    },
    {
      icon: <Clock size={24} />,
      title: "Response Time",
      details: "< 24 hours",
      description: "For all support inquiries",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`mt-20 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#016B61] to-[#70B2B2]">
              Touch
            </span>
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Have questions? We're here to help. Reach out to us through any of
            the channels below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2
              className={`text-2xl font-bold mb-8 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Contact Information
            </h2>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-start gap-4 p-6 rounded-xl ${
                    isDark ? "bg-gray-800" : "bg-white"
                  } shadow-lg`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="text-[#016B61]">{item.icon}</div>
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold mb-1 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-lg mb-1 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.details}
                    </p>
                    <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`mt-8 p-6 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="text-[#016B61]" size={24} />
                <h3
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Quick Answers
                </h3>
              </div>
              <p
                className={isDark ? "text-gray-400 mb-4" : "text-gray-600 mb-4"}
              >
                Check our{" "}
                <a
                  href="/help"
                  className="text-[#016B61] hover:underline font-medium"
                >
                  Help Center
                </a>{" "}
                for answers to frequently asked questions about:
              </p>
              <ul
                className={`space-y-2 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Account setup and management
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Feature guides and tutorials
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Billing and subscription
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Privacy and security
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl p-8 ${
              isDark ? "bg-gray-800" : "bg-white"
            } shadow-xl`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-2 rounded-lg ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <Send className="text-[#016B61]" size={24} />
              </div>
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Send us a Message
                </h2>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                  Fill out the form below and we'll get back to you soon.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-300 ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#016B61] focus:border-transparent"
                        : "border-gray-300 focus:ring-2 focus:ring-[#016B61] focus:border-transparent"
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-300 ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#016B61] focus:border-transparent"
                        : "border-gray-300 focus:ring-2 focus:ring-[#016B61] focus:border-transparent"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#016B61] focus:border-transparent"
                      : "border-gray-300 focus:ring-2 focus:ring-[#016B61] focus:border-transparent"
                  }`}
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#016B61] focus:border-transparent"
                      : "border-gray-300 focus:ring-2 focus:ring-[#016B61] focus:border-transparent"
                  }`}
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-[#016B61] to-[#70B2B2] hover:shadow-lg"
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
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={20} />
                    Send Message
                  </span>
                )}
              </button>
            </form>

            <p
              className={`text-sm text-center mt-6 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              By submitting this form, you agree to our{" "}
              <a href="/privacy" className="text-[#016B61] hover:underline">
                Privacy Policy
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
