import React from "react";
import { motion } from "framer-motion";
motion;
const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="min-h-screen bg-gray-50 mt-15">
      <div className="max-w-5xl mx-auto px-4 py-16">

        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            About <span className="text-[#016B61]">HabitTracker</span>
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            HabitTracker is a daily companion that helps you build small,
            consistent actions into lifelong habits so you can stay focused,
            motivated, and accountable.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            variants={cardVariants}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600">
              Our mission is to make habit building feel simple and satisfying.
              We design tools that remove friction, highlight progress, and help
              you stick to the routines that matter most in your life.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            variants={cardVariants}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-600">
              We imagine a world where personal growth feels approachable for
              everyone—where tracking habits is less about pressure and more
              about clear feedback, gentle nudges, and celebrating small wins.
            </p>
          </motion.div>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What We Offer
          </h2>
          <motion.ul
            className="space-y-3 text-gray-600 list-disc list-inside"
            variants={staggerContainer}
          >
            {[
              "Simple habit creation with flexible reminders.",
              "Visual streaks that show how consistent you’ve been.",
              "Public habits to get inspired by the community.",
              "Private dashboards to track your own progress over time.",
            ].map((item, index) => (
              <motion.li key={index} variants={cardVariants}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Closing */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Built for learners, by learners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            HabitTracker started as a small side project to solve a personal
            problem: keeping track of daily routines without feeling
            overwhelmed. Today, it continues to grow with feedback from people
            who want a calmer, more intentional way to work on themselves.
          </p>
          <p className="text-gray-500 text-sm">
            Have ideas or feedback? Reach out any time and help shape the next
            version of HabitTracker.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
