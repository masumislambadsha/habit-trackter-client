import { useTheme } from "../context/ThemeProvider";

const HabitCardSkeleton = () => {
  const { isDark } = useTheme();

  const base =
    "rounded-2xl shadow p-5 border transition duration-300 animate-pulse";
  const light = "bg-[#E5E9C5] border-[#9ECFD4]/70";
  const dark = "bg-gray-800 border-gray-700";

  return (
    <div className={`${base} ${isDark ? dark : light}`}>
      <div
        className={`mb-4 h-40 w-full rounded-xl ${
          isDark ? "bg-gray-700" : "bg-black/10"
        }`}
      />
      <div className="h-4 w-32 mb-3 rounded-full bg-black/10 dark:bg-gray-600" />
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full rounded-full bg-black/10 dark:bg-gray-600" />
        <div className="h-3 w-3/4 rounded-full bg-black/10 dark:bg-gray-600" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-7 w-20 rounded-full bg-black/10 dark:bg-gray-600" />
        <div className="h-4 w-16 rounded-full bg-black/10 dark:bg-gray-600" />
      </div>
    </div>
  );
};

export default HabitCardSkeleton;
