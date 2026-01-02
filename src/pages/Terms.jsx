import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";
import { FileText, AlertCircle, Scale, BookOpen, Shield } from "lucide-react";
motion;
const Terms = () => {
  const { isDark } = useTheme();

  const keyPoints = [
    {
      icon: <BookOpen size={20} />,
      title: "Acceptance of Terms",
      description:
        "By accessing and using HabitFlow, you accept and agree to be bound by these Terms.",
    },
    {
      icon: <Shield size={20} />,
      title: "User Responsibilities",
      description:
        "You are responsible for maintaining the security of your account and the accuracy of your information.",
    },
    {
      icon: <Scale size={20} />,
      title: "Service Limitations",
      description:
        "We strive for 99.9% uptime but cannot guarantee uninterrupted access to our services.",
    },
  ];

  return (
    <div
      className={`mt-17 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#016B61]/10 to-[#70B2B2]/10 mb-6">
            <FileText className="text-[#016B61]" size={20} />
            <span
              className={`font-medium ${
                isDark ? "text-[#70B2B2]" : "text-[#016B61]"
              }`}
            >
              Terms of Service
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#016B61] to-[#70B2B2]">
              Service
            </span>
          </h1>

          <p
            className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Effective Date: March 15, 2024
          </p>
        </motion.div>

        <div
          className={`rounded-2xl ${
            isDark ? "bg-gray-800" : "bg-white"
          } shadow-lg overflow-hidden`}
        >
          {/* Key Points */}
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
                <AlertCircle className="text-[#016B61]" size={24} />
              </div>
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Important Information
                </h2>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                  Please read these terms carefully before using our services
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {keyPoints.map((point, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={isDark ? "text-gray-300" : "text-gray-600"}>
                      {point.icon}
                    </div>
                    <span
                      className={`font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {point.title}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className={`${isDark ? "prose-invert" : ""}`}>
                <h2 className={`${isDark ? "text-white" : "text-gray-900"}`}>
                  1. Agreement to Terms
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  By accessing or using HabitFlow's services, websites, and
                  applications (collectively, the "Service"), you agree to be
                  bound by these Terms of Service ("Terms"). If you disagree
                  with any part of the terms, you may not access the Service.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  2. Description of Service
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  HabitFlow provides a digital platform for tracking habits,
                  setting goals, and monitoring personal development. The
                  Service includes features such as habit tracking, reminders,
                  analytics, and community features.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  3. User Accounts
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  To use certain features of the Service, you must register for
                  an account. You agree to:
                </p>
                <ul className={isDark ? "text-gray-300" : "text-gray-600"}>
                  <li>Provide accurate, current, and complete information</li>
                  <li>
                    Maintain and update your information to keep it accurate
                  </li>
                  <li>
                    Maintain the security of your password and accept all risks
                    of unauthorized access
                  </li>
                  <li>
                    Notify us immediately of any unauthorized use of your
                    account
                  </li>
                  <li>
                    Be responsible for all activities that occur under your
                    account
                  </li>
                </ul>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  4. Subscription and Payments
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  Certain features of the Service may require payment of fees.
                  By selecting a paid service, you agree to pay the specified
                  fees. All fees are non-refundable except as required by law.
                  We may change our fees at any time by posting the changes on
                  the Service.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  5. User Content
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  You retain ownership of any content you create, upload, or
                  store on the Service ("User Content"). By submitting User
                  Content, you grant us a worldwide, non-exclusive, royalty-free
                  license to use, reproduce, modify, and display such content
                  solely for the purpose of providing the Service.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  6. Acceptable Use
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  You agree not to use the Service to:
                </p>
                <ul className={isDark ? "text-gray-300" : "text-gray-600"}>
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>Send spam or unauthorized commercial communications</li>
                  <li>Distribute viruses or harmful code</li>
                  <li>
                    Attempt to gain unauthorized access to any part of the
                    Service
                  </li>
                  <li>Interfere with the proper working of the Service</li>
                </ul>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  7. Intellectual Property
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  The Service and its original content, features, and
                  functionality are owned by HabitFlow and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property laws.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  8. Termination
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  We may terminate or suspend your account and bar access to the
                  Service immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever, including
                  without limitation if you breach the Terms.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  9. Limitation of Liability
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  In no event shall HabitFlow, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from your
                  access to or use of or inability to access or use the Service.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  10. Disclaimer
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  Your use of the Service is at your sole risk. The Service is
                  provided on an "AS IS" and "AS AVAILABLE" basis. The Service
                  is provided without warranties of any kind, whether express or
                  implied.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  11. Governing Law
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  These Terms shall be governed and construed in accordance with
                  the laws of the State of California, without regard to its
                  conflict of law provisions.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  12. Changes to Terms
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will provide at least 30 days' notice prior to any new terms
                  taking effect.
                </p>

                <h2
                  className={`mt-8 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  13. Contact Information
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <div
                  className={`mt-4 p-4 rounded-xl ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                    <strong>HabitFlow Inc.</strong>
                    <br />
                    123 Habit Street, Suite 100
                    <br />
                    San Francisco, CA 94107
                    <br />
                    legal@habitflow.com
                  </p>
                </div>

                <div
                  className={`mt-8 p-6 rounded-xl ${
                    isDark
                      ? "bg-yellow-900/20 border border-yellow-800"
                      : "bg-yellow-50 border border-yellow-100"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      className={`shrink-0 ${
                        isDark ? "text-yellow-400" : "text-yellow-600"
                      }`}
                      size={24}
                    />
                    <div>
                      <p
                        className={`text-sm ${
                          isDark ? "text-yellow-300" : "text-yellow-700"
                        }`}
                      >
                        <strong>Disclaimer:</strong> HabitFlow is designed for
                        personal development and habit tracking purposes only.
                        It is not intended to replace professional medical
                        advice, diagnosis, or treatment. Always seek the advice
                        of qualified health providers with any questions you may
                        have regarding a medical condition.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
