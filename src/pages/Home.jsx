import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeProvider";
import HeroBanner from "../components/HeroBanner";
import WhyBuildHabits from "../components/WhyBuildHabits";
import FeaturedHabits from "../components/FeaturedHabits";
import ExtraSectionOne from "../components/ExtraSectionOne";
import ExtraSectionTwo from "../components/ExtraSectionTwo";
import { Link } from "react-router";

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

      {/* এখান থেকে শুধু theme isDark দিয়ে control করা extra sections */}
      <div className="mt-28 space-y-24">
        {/* 3. Categories */}
        <section
          className={`py-12 transition-colors duration-300 ${
            isDark ? "bg-gray-900" : "bg-[#F7FAEF]"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2
              className={`text-2xl md:text-3xl font-bold mb-2 ${
                isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
              }`}
            >
              Build habits in every area of your life
            </h2>
            <p
              className={`text-sm md:text-base mb-8 max-w-2xl ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Pick a category and start with small, focused actions that match
              your current season of life.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {["Morning", "Work", "Fitness", "Evening", "Study"].map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium transition border ${
                    isDark
                      ? "bg-gray-800 border-gray-600 text-[#9ECFD4] hover:bg-gray-700"
                      : "bg-[#E5E9C5] border-[#9ECFD4] text-[#016B61] hover:bg-[#9ECFD4] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Featured public habits */}
        <section
          className={`py-12 border-t transition-colors duration-300 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-[#F7FAEF] border-[#DDE8D0]"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  className={`text-2xl md:text-3xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Featured public habits
                </h2>
                <p
                  className={`text-xs md:text-sm mt-1 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Recently created habits from the community.
                </p>
              </div>
              <Link
                to="/browse"
                className="text-sm font-medium bg-gradient-to-r from-[#016B61] to-[#70B2B2] bg-clip-text text-transparent hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-5 flex flex-col justify-between shadow-md transition border ${
                    isDark
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                      : "bg-white border-[#9ECFD4]/60 hover:border-[#016B61] hover:shadow-lg"
                  }`}
                >
                  <div>
                    <h3
                      className={`font-semibold mb-1 ${
                        isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                      }`}
                    >
                      Sample Habit {i}
                    </h3>
                    <p
                      className={`text-sm mb-3 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Short description about how this habit helps you stay
                      consistent every day.
                    </p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      by <span className="font-medium">Demo User</span>
                    </p>
                  </div>
                  <Link
                    to="/auth/login"
                    className={`mt-4 text-sm font-medium ${
                      isDark
                        ? "text-[#9ECFD4] hover:text-white"
                        : "text-[#016B61] hover:text-[#014c45]"
                    }`}
                  >
                    View details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Why build habits */}
        <section
          className={`py-12 transition-colors duration-300 ${
            isDark
              ? "bg-linear-to-r from-gray-800 to-gray-900 text-white"
              : "bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Why building habits actually works
            </h2>
            <p className="text-sm md:text-base text-white/80 mb-8 max-w-2xl">
              Habits turn hard decisions into automatic routines. With the right
              system, you don&apos;t have to rely on motivation every day.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: "Better focus",
                  text: "Reduce decision fatigue by knowing exactly what you need to do at each moment.",
                },
                {
                  title: "Less stress",
                  text: "Small, repeated actions keep you ahead of your goals instead of falling behind.",
                },
                {
                  title: "Visible progress",
                  text: "Streaks and completion history show how far you&apos;ve already come.",
                },
                {
                  title: "Long‑term change",
                  text: "Tiny daily wins compound into big results over weeks and months.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-2xl p-5 border ${
                    isDark
                      ? "bg-black/20 border-white/15"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Statistics */}
        <section
          className={`py-12 transition-colors duration-300 ${
            isDark ? "bg-gray-900" : "bg-[#F7FAEF]"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2
              className={`text-2xl md:text-3xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              A growing community of consistent learners
            </h2>
            <p
              className={`text-sm md:text-base mb-8 max-w-2xl ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Every check‑in is a small step forward. Together, those steps add
              up quickly.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "active users tracking their daily routines", value: "120+" },
                { label: "habits created and completed", value: "5K+" },
                { label: "users keep a 7‑day streak once they start", value: "80%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-2xl p-6 text-center border ${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-[#E5E9C5] border-[#9ECFD4]/60"
                  }`}
                >
                  <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#016B61] to-[#70B2B2] bg-clip-text text-transparent">
                    {item.value}
                  </p>
                  <p
                    className={`mt-2 text-sm ${
                      isDark ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Testimonials */}
        <section
          className={`py-12 transition-colors duration-300 ${
            isDark
              ? "bg-linear-to-b from-gray-900 to-gray-950"
              : "bg-linear-to-b from-[#E5E9C5] to-white"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#016B61] to-[#70B2B2]">
              What people say about HabitTracker
            </h2>
            <p
              className={`text-sm md:text-base mb-8 max-w-2xl ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Real stories from learners who decided to show up for themselves a
              little bit every day.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  text: "I finally managed to stay consistent with my morning workout for an entire month. Seeing the streak number go up is addictive.",
                  name: "Aisha, student",
                },
                {
                  text: "The simple dashboard helps me track my study hours without getting lost in complex tools.",
                  name: "Rafi, developer",
                },
                {
                  text: "Public habits give me ideas and make me feel like I'm not doing this alone.",
                  name: "Sara, designer",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className={`rounded-2xl p-6 shadow-lg border transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-800/90 border-gray-700"
                      : "bg-white/90 border-[#9ECFD4]"
                  }`}
                >
                  <p
                    className={`text-sm mb-3 ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    “{t.text}”
                  </p>
                  <p
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Blog / Tips */}
        <section
          className={`py-12 transition-colors duration-300 ${
            isDark ? "bg-gray-900" : "bg-[#F7FAEF]"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  className={`text-2xl md:text-3xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Habit tips &amp; mini‑guides
                </h2>
                <p
                  className={`text-xs md:text-sm mt-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Short reads to help you design better routines.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "How to build a habit that sticks",
                  body: "Start smaller than you think, attach it to an existing routine, and track it daily.",
                },
                {
                  title: "Why small wins beat motivation",
                  body: "Motivation comes and goes, but systems and checklists keep you moving forward.",
                },
                {
                  title: "Avoid these 5 streak‑breaking mistakes",
                  body: "Overloading your list, vague goals, and ignoring bad days all make consistency harder.",
                },
              ].map((post) => (
                <article
                  key={post.title}
                  className={`rounded-2xl p-5 border ${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-[#E5E9C5] border-[#9ECFD4]"
                  }`}
                >
                  <h3
                    className={`font-semibold mb-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {post.title}
                  </h3>
                  <p
                    className={`text-sm mb-3 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {post.body}
                  </p>
                  <button
                    className={`text-xs font-medium ${
                      isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
                    }`}
                  >
                    Read more
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section
          className={`py-12 transition-colors duration-300 ${
            isDark
              ? "bg-linear-to-b from-gray-900 to-gray-800"
              : "bg-linear-to-b from-white to-[#E5E9C5]"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2
              className={`text-2xl md:text-3xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Frequently asked questions
            </h2>
            <p
              className={`text-sm md:text-base mb-6 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Quick answers to common questions about HabitTracker.
            </p>
            <div className="space-y-4">
              {[
                {
                  q: "Is HabitTracker free to use?",
                  a: "Yes, you can create an account and track your habits for free.",
                },
                {
                  q: "Can I create private habits?",
                  a: "Yes, you can keep habits visible only to you or mark them as public.",
                },
                {
                  q: "How do streaks work?",
                  a: "Each day you mark a habit complete, your streak increases. If you miss a day, the current streak resets.",
                },
                {
                  q: "What happens if I reload the page?",
                  a: "As long as you are logged in, your data stays synced with the server and is safe across reloads.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className={`rounded-xl p-4 border ${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-[#9ECFD4]/60"
                  }`}
                >
                  <summary
                    className={`font-semibold cursor-pointer ${
                      isDark ? "text-[#9ECFD4]" : "text-gray-900"
                    }`}
                  >
                    {item.q}
                  </summary>
                  <p
                    className={`text-sm mt-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Newsletter / Final CTA */}
        <section
          className={`py-12 transition-colors duration-300 ${
            isDark
              ? "bg-linear-to-r from-gray-900 to-gray-800 text-white"
              : "bg-linear-to-r from-[#016B61] to-[#70B2B2] text-white"
          }`}
        >
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Ready to start your next streak?
              </h2>
              <p className="text-sm md:text-base text-white/80 mb-4 max-w-md">
                Create your first habit in under a minute and let HabitTracker
                handle the reminders and progress.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  placeholder="Get weekly habit tips by email"
                  className="input input-bordered w-full sm:w-72 rounded-xl bg-white/10 border-white/40 text-sm placeholder:text-white/60"
                />
                <button className="btn rounded-xl px-6 border-0 bg-white text-[#016B61] font-semibold">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="text-xs md:text-sm text-white/80">
              Or jump in now:
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  to="/add-habit"
                  className="btn btn-sm rounded-full bg-white text-[#016B61] border-0"
                >
                  Add a habit
                </Link>
                <Link
                  to="/login"
                  className="btn btn-sm btn-outline rounded-full text-white border-white/60"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
