import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Fitness Coach",
    text: "HabitTracker helped me build a 100-day streak of morning runs!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahim Khan",
    role: "Developer",
    text: "I code every day now — thanks to the streak system!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ayesha Siddiqa",
    role: "Student",
    text: "My study habits improved 3x in just 30 days!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const ExtraSectionOne = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-b from-gray-800 to-gray-900"
          : "bg-linear-to-b from-[#E5E9C5] to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-linear-to-r from-[#016B61] to-[#70B2B2]"
        >
          Success Stories
        </motion.h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`rounded-2xl p-8 shadow-lg border h-full transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-800/90 backdrop-blur-sm border-gray-600"
                    : "bg-white/90 backdrop-blur-sm border-[#9ECFD4]"
                }`}
              >
                <p
                  className={`mb-6 italic ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full ring-2 ring-[#016B61]"
                  />
                  <div>
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                      }`}
                    >
                      {t.name}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ExtraSectionOne;
