import { FaBrain, FaHeartbeat, FaClock, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";

const benefits = [
  {
    icon: <FaBrain />,
    title: "Better Focus",
    desc: "Train your mind to stay on task",
  },
  {
    icon: <FaHeartbeat />,
    title: "Reduced Stress",
    desc: "Small wins build calm confidence",
  },
  { icon: <FaClock />, title: "Save Time", desc: "Automate good decisions" },
  {
    icon: <FaTrophy />,
    title: "Achieve Goals",
    desc: "Turn dreams into daily actions",
  },
];

const WhyBuildHabits = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-b from-gray-800 to-gray-900"
          : "bg-linear-to-b from-[#E5E9C5] to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2
          className={`text-3xl font-bold mb-10 ${
            isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
          }`}
        >
          Why Build Habits?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition border ${
                isDark
                  ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                  : "bg-white border-[#9ECFD4] hover:bg-gray-50"
              }`}
            >
              <div
                className={`text-4xl mb-4 ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                }`}
              >
                {item.icon}
              </div>
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBuildHabits;
