import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useTheme } from "../context/ThemeProvider";

const CountUp = ({ end, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    const controls = animate(count, end, {
      duration: 2.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, end]);

  return <motion.span className="tabular-nums">{rounded}</motion.span>;
};

const stats = [
  { label: "Active Users", value: 15000, suffix: "+" },
  { label: "Habits Tracked", value: 85000, suffix: "+" },
  { label: "Total Streaks", value: 3200, suffix: "+" },
  { label: "Success Rate", value: 92, suffix: "%" },
];

const ExtraSectionTwo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  return (
    <section
      ref={ref}
      className={`py-20 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-r from-gray-800 to-gray-700"
          : "bg-linear-to-r from-[#016B61] to-[#70B2B2]"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          Our Impact
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="space-y-2"
            >
              <div className="text-5xl md:text-6xl font-bold">
                {isInView && <CountUp end={stat.value} suffix={stat.suffix} />}
              </div>
              <p className="text-lg opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraSectionTwo;
