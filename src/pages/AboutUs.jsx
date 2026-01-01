import React from "react";

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-gray-50 mt-15">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-[#016B61]">HabitTracker</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            HabitTracker is a daily companion that helps you build small,
            consistent actions into lifelong habits so you can stay focused,
            motivated, and accountable.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600">
              Our mission is to make habit building feel simple and satisfying.
              We design tools that remove friction, highlight progress, and help
              you stick to the routines that matter most in your life.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-600">
              We imagine a world where personal growth feels approachable for
              everyone—where tracking habits is less about pressure and more
              about clear feedback, gentle nudges, and celebrating small wins.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What We Offer
          </h2>
          <ul className="space-y-3 text-gray-600 list-disc list-inside">
            <li>Simple habit creation with flexible reminders.</li>
            <li>Visual streaks that show how consistent you’ve been.</li>
            <li>Public habits to get inspired by the community.</li>
            <li>Private dashboards to track your own progress over time.</li>
          </ul>
        </div>

        {/* Team / Closing */}
        <div className="text-center">
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
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
