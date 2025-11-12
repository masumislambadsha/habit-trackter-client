import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWtmYXN0fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
    quote: '"FUEL FOR BODY. FOUNDATION FOR DAY."',
    title: "Healthy Breakfast",
    description: "Oats, fruits, nuts, eggs — start strong. A balanced breakfast powers your brain and body. Skip the rush. Eat with intention.",
  },
  {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    quote: '"MIST ME SOFTLY. EMBRACE THE SHADE."',
    title: "Morning Meditation",
    description: "Start your day with calm. A quiet 10-minute session sets the tone for clarity, focus, and peace. Breathe deeply. Let go of yesterday. Welcome today.",
  },
  {
    image: "https://c1.wallpaperflare.com/preview/332/788/4/beach-sand-sea-summer.jpg",
    quote: '"STEP BY STEP. BREATH BY BREATH."',
    title: "Afternoon Walk",
    description: "Step outside. Feel the sun on your skin. A 20-minute walk boosts mood, energy, and creativity. No destination needed — just movement and fresh air.",
  },
  {
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    quote: '"WORDS THAT SHAPE THE SOUL."',
    title: "Reading Books",
    description: "Open a book. Enter a new world. 15 pages a day builds knowledge, empathy, and imagination. Track your streak — watch your mind grow.",
  },
  {
    image: "https://images.pexels.com/photos/175753/pexels-photo-175753.jpeg?cs=srgb&dl=pexels-conojeghuo-175753.jpg&fm=jpg",
    quote: '"HANDS IN DOUGH. HEART IN HOME."',
    title: "Cooking Practice",
    description: "Chop, stir, taste. Cooking is love made visible. Try one new recipe weekly. Build confidence in the kitchen — and nourish body and soul.",
  },
  {
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    quote: '"FLEXIBILITY IN BODY. FREEDOM IN MIND."',
    title: "Stretching Exercises",
    description: "Roll out your mat. Stretch for 10 minutes daily. Loosen tight muscles, improve posture, and release stress. Your body will thank you.",
  },
  {
    image: "https://watermark.lovepik.com/photo/20211121/large/lovepik-business-team-work-together-to-sign-a-contract-picture_500592054.jpg",
    quote: '"FOCUS BUILDS EMPIRES."',
    title: "Project Work",
    description: "One task at a time. 25 minutes of deep work = progress. Track your sessions. Watch small efforts compound into big results.",
  },

];

const HeroBanner = () => {
  return (
    <section className="relative h-[70vh] md:h-[98vh] overflow-hidden bg-gradient-to-br from-[#016B61] via-[#70B2B2] to-[#9ECFD4] -mt-20">
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 z-0" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        speed={1200}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.75)),
                  url(${slide.image})
                `.trim(),
              }}
            />
            <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
              >
                <motion.p
                  className="text-lg md:text-2xl font-light text-[#E5E9C5] mb-6 tracking-widest"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {slide.quote}
                </motion.p>
                <motion.h1
                  className="text-5xl md:text-7xl font-extrabold text-white mt-10 mb-5 leading-tight"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="text-base md:text-lg text-gray-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <button
                    onClick={() => {
                      window.location.href = "/add-habit";
                    }}
                    className="group relative inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#016B61] to-[#70B2B2] rounded-full shadow-2xl hover:shadow-[#9ECFD4]/50 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">Start This Habit</span>
                    <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#70B2B2] to-[#9ECFD4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev !text-white !bg-black/30 dark:!bg-black/50 !w-8 !h-8 md:!w-12 md:!h-12 !rounded-full !left-6 after:!text-2xl hover:!bg-[#016B61]/70 transition-all" />
      <div className="swiper-button-next !text-white !bg-black/30 dark:!bg-black/50 !w-8 !h-8 md:!w-12 md:!h-12 !rounded-full !right-6 after:!text-2xl hover:!bg-[#016B61]/70 transition-all " />

      <motion.div
        className="absolute top-20 left-12 w-20 h-20 bg-[#E5E9C5]/10 backdrop-blur-sm rounded-full"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-16 h-16 bg-[#9ECFD4]/20 rounded-full"
        animate={{ x: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </section>
  );
};

export default HeroBanner;
