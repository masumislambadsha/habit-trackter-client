import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeProvider";
import HeroBanner from "../components/HeroBanner";
import WhyBuildHabits from "../components/WhyBuildHabits";
import FeaturedHabits from "../components/FeaturedHabits";
import ExtraSectionOne from "../components/ExtraSectionOne";
import ExtraSectionTwo from "../components/ExtraSectionTwo";

const Home = () => {
  const { isDark } = useTheme();
  useEffect(() => {
    document.title = "Habit Tracker | Home";
  }, []);
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-gray-900 to-gray-800"
          : "bg-linear-to-br from-[#E5E9C5] to-white"
      }`}
    >
      <HeroBanner />
      <FeaturedHabits />
      <WhyBuildHabits />
      <ExtraSectionOne />
      <ExtraSectionTwo />
    </div>
  );
};

export default Home;
