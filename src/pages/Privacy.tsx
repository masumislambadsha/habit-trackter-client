import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Download, Mail, Calendar } from "lucide-react";

const Privacy = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`pt-20 min-h-screen transition-colors duration-300  ${
        isDark
          ? "bg-linear-to-br from-gray-900 to-gray-800"
          : "bg-linear-to-br from-[#E5E9C5] to-white"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#016B61]/10 to-[#70B2B2]/10 mb-6">
            <Shield className="text-[#016B61]" size={20} />
            <span
              className={`font-medium ${
                isDark ? "text-[#70B2B2]" : "text-[#016B61]"
              }`}
            >
              Privacy Policy
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#016B61] to-[#70B2B2]">
              Privacy
            </span>{" "}
            Matters
          </h1>

          <p
            className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Last updated: March 15, 2024
          </p>
        </motion.div>

        <div
          className={`rounded-2xl ${
            isDark ? "bg-gray-800" : "bg-white"
          } shadow-lg overflow-hidden`}
        >

          <div
            className={`p-8 border-b ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-3 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <Lock className="text-[#016B61]" size={24} />
              </div>
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Policy Overview
                </h2>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                  We're committed to protecting your personal information
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Eye
                    size={16}
                    className={isDark ? "text-gray-300" : "text-gray-600"}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Transparency
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Clear about what data we collect and why
                </p>
              </div>
              <div
                className={`p-4 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Lock
                    size={16}
                    className={isDark ? "text-gray-300" : "text-gray-600"}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Security
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Industry-standard encryption and protection
                </p>
              </div>
              <div
                className={`p-4 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Download
                    size={16}
                    className={isDark ? "text-gray-300" : "text-gray-600"}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Control
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  You own your data and can export/delete it anytime
                </p>
              </div>
            </div>
          </div>


          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className={`${isDark ? "prose-invert" : ""}`}>
                <h2 className={`${isDark ? "text-white" : "text-gray-900"}`}>
                  1. Information We Collect
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  We collect information you provide directly to us when you:
                </p>
                <ul className={isDark ? "text-gray-300" : "text-gray-600"}>
                  <li>Create an account or profile</li>
                  <li>Track habits and set goals</li>
                  <li>Complete surveys or provide feedback</li>
                  <li>Contact our support team</li>
                  <li>Subscribe to newsletters or updates</li>
                </ul>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  2. How We Use Your Information
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  We use the information we collect to:
                </p>
                <ul className={isDark ? "text-gray-300" : "text-gray-600"}>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Send you reminders and notifications for your habits</li>
                  <li>Personalize your experience and provide analytics</li>
                  <li>Respond to your comments and questions</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  3. Information Sharing
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  We do not sell, trade, or otherwise transfer your personally
                  identifiable information to outside parties except in the
                  following circumstances:
                </p>
                <ul className={isDark ? "text-gray-300" : "text-gray-600"}>
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect and defend our rights and property</li>
                  <li>
                    With service providers who assist in our operations (under
                    strict confidentiality agreements)
                  </li>
                </ul>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  4. Data Security
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  These measures include:
                </p>
                <ul className={isDark ? "text-gray-300" : "text-gray-600"}>
                  <li>End-to-end encryption for sensitive data</li>
                  <li>Regular security assessments and updates</li>
                  <li>Secure server infrastructure with firewalls</li>
                  <li>Access controls and authentication systems</li>
                  <li>Regular data backups</li>
                </ul>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  5. Your Rights and Choices
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  You have the right to:
                </p>
                <ul className={isDark ? "text-gray-300" : "text-gray-600"}>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Export your data in a machine-readable format</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  6. Data Retention
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  We retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this policy,
                  unless a longer retention period is required or permitted by
                  law.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  7. Cookies and Tracking Technologies
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  We use cookies and similar tracking technologies to track
                  activity on our service and hold certain information. You can
                  instruct your browser to refuse all cookies or to indicate
                  when a cookie is being sent.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  8. International Data Transfers
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  Your information may be transferred to — and maintained on —
                  computers located outside of your state, province, country, or
                  other governmental jurisdiction where the data protection laws
                  may differ from those of your jurisdiction.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  9. Children's Privacy
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  Our service is not intended for individuals under the age of
                  13. We do not knowingly collect personal information from
                  children under 13. If you are a parent or guardian and believe
                  your child has provided us with personal information, please
                  contact us.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  10. Changes to This Policy
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  11. Contact Us
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <div
                  className={`mt-4 p-4 rounded-xl ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Mail
                      size={20}
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    />
                    <span
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      privacy@Habit Tracker.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar
                      size={20}
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    />
                    <span
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      Response time: Within 48 hours
                    </span>
                  </div>
                </div>

                <div
                  className={`mt-8 p-6 rounded-xl ${
                    isDark
                      ? "bg-blue-900/20 border border-blue-800"
                      : "bg-blue-50 border border-blue-100"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      isDark ? "text-blue-300" : "text-blue-700"
                    }`}
                  >
                    <strong>Note:</strong> This policy applies to the Habit
                    Tracker web application and mobile apps. By using our
                    services, you agree to the collection and use of information
                    in accordance with this policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
