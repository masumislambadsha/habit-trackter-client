import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  Award,
  Heart,
  Globe,
  TrendingUp,
  Shield,
  Clock
} from "lucide-react";

const About = () => {
  const { isDark } = useTheme();

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Passionate about behavioral psychology and habit formation.",
      avatar: "AJ"
    },
    {
      name: "Maria Chen",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in React and Node.js.",
      avatar: "MC"
    },
    {
      name: "David Kim",
      role: "Product Designer",
      bio: "Focused on creating intuitive and beautiful user experiences.",
      avatar: "DK"
    },
    {
      name: "Sarah Williams",
      role: "Community Manager",
      bio: "Dedicated to building supportive habit communities.",
      avatar: "SW"
    }
  ];

  const values = [
    {
      icon: <Heart size={24} />,
      title: "User-Centered",
      description: "We put our users' needs and experiences first."
    },
    {
      icon: <Shield size={24} />,
      title: "Privacy First",
      description: "Your data is secure and always under your control."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Continuous Growth",
      description: "We're constantly improving based on your feedback."
    },
    {
      icon: <Globe size={24} />,
      title: "Accessibility",
      description: "Making habit tracking available to everyone."
    }
  ];

  return (
    <div className={`mt-20 min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#016B61]/10 to-[#70B2B2]/10 mb-6">
            <Target className="text-[#016B61]" size={20} />
            <span className={`font-medium ${isDark ? "text-[#70B2B2]" : "text-[#016B61]"}`}>
              About HabitFlow
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Transforming Lives Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#016B61] to-[#70B2B2]">Better Habits</span>
          </h1>

          <p className={`text-xl max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            We're on a mission to help people build lasting habits that lead to meaningful, positive change in their lives.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl p-8 mb-12 ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                Our Story
              </h2>
              <div className="space-y-4">
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  HabitFlow was born from a simple observation: most people struggle with consistency when trying to build new habits. Traditional habit trackers were either too complex or too simplistic.
                </p>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  Founded in 2023 by a team of behavioral psychologists, developers, and designers, we set out to create a solution that combines scientific principles with beautiful, intuitive design.
                </p>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  Today, we've helped over 100,000 users build healthier, more productive lives through consistent habit formation.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-gradient-to-br from-[#016B61] to-[#70B2B2] rounded-2xl transform rotate-6"></div>
                <div className={`absolute inset-0 ${isDark ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl flex items-center justify-center transform -rotate-6`}>
                  <div className="text-center p-6">
                    <Clock className="mx-auto mb-4 text-[#016B61]" size={48} />
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                      Since 2023
                    </h3>
                    <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                      Helping people build better habits
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-10 ${isDark ? "text-white" : "text-gray-900"}`}>
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}>
                  <div className="text-[#016B61]">
                    {value.icon}
                  </div>
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {value.title}
                </h3>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className={`text-3xl font-bold text-center mb-10 ${isDark ? "text-white" : "text-gray-900"}`}>
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl text-center ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#016B61] to-[#70B2B2] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {member.name}
                </h3>
                <p className={`text-sm font-medium mb-3 ${isDark ? "text-[#70B2B2]" : "text-[#016B61]"}`}>
                  {member.role}
                </p>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-16 rounded-2xl p-8 ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                100K+
              </div>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                Active Users
              </p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                5M+
              </div>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                Habits Tracked
              </p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                98%
              </div>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                User Satisfaction
              </p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                24/7
              </div>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                Support Available
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
