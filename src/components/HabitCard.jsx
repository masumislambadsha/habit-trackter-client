import React from "react";
import { Link } from "react-router";
import { useTheme } from "../context/ThemeProvider";

const HabitCard = ({ habit }) => {
  const { _id, name, description, category } = habit;
  const { isDark } = useTheme();

  return (
    <div className={`rounded-2xl shadow hover:shadow-lg p-5 border transition duration-300 ${
      isDark
        ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
        : "bg-white border-[#9ECFD4]"
    }`}>
      <h3 className={`text-lg font-semibold mb-2 ${
        isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
      }`}>
        {name}
      </h3>
      <p className={`text-sm mb-3 line-clamp-2 ${
        isDark ? "text-gray-300" : "text-gray-500"
      }`}>
        {description}
      </p>
      <div className="flex justify-between items-center text-sm">
        <span className={`px-3 py-1 rounded-full ${
          isDark
            ? "bg-gray-700 text-[#9ECFD4] border border-gray-600"
            : "bg-[#E5E9C5] text-[#016B61]"
        }`}>
          {category}
        </span>
        <Link
          to={`/habit/${_id}`}
          className={`font-medium hover:underline ${
            isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
          }`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HabitCard;
