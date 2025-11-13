import React from "react";
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className={`font-sans transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-gray-800 to-gray-900"
          : "bg-linear-to-br from-emerald-100 to-lime-100"
      } pt-20`}
    >
      <div className="container lg:px-35 mx-auto py-8 px-6 md:py-12 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="max-w-lg">
          <h3
            className={`text-2xl md:text-3xl font-bold mb-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Join the Habit Revolution
          </h3>
          <p
            className={`mb-5 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Get daily habit tips, streak challenges, and exclusive progress
            insights. Build better habits — one day at a time.
          </p>
          <a href="/login">
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition shadow-md cursor-pointer">
              Subscribe Now
            </button>
          </a>
        </div>
        <a href="/add-habit">
          <div
            className={`w-full md:w-80 cursor-pointer h-48 rounded-xl shadow-lg flex items-center justify-center ${
              isDark
                ? "bg-linear-to-br from-gray-700 to-gray-600"
                : "bg-linear-to-br from-emerald-300 to-teal-400"
            }`}
          >
            <span className="text-white text-lg font-medium ">
              Build Habits
            </span>
          </div>
        </a>
      </div>
      <div
        className={`py-12 px-6 md:px-12 transition-colors duration-300 ${
          isDark ? "bg-gray-900" : "bg-gray-900"
        } text-gray-300`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="text-white font-semibold mb-4">Habit Tracker</h4>
              <p className="text-sm leading-relaxed text-gray-400">
                Track daily habits, build streaks, and transform your life.
                <br />
                <strong className="text-emerald-400">
                  Consistency is key.
                </strong>
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
              <p className="text-sm leading-relaxed text-gray-400">
                <a
                  href="mailto:support@habittracker.app"
                  className="hover:text-emerald-400 transition flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> support@habittracker.app
                </a>
                <a
                  href="https://habittracker.app"
                  className="hover:text-emerald-400 transition flex items-center gap-2 mt-2"
                >
                  <MapPin className="w-4 h-4" /> habittracker.app
                </a>
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <p className="text-sm leading-relaxed text-gray-400">
                <a
                  href="/my-habits"
                  className="block hover:text-emerald-400 transition"
                >
                  My Habits
                </a>
                <a
                  href="/analytics"
                  className="block hover:text-emerald-400 transition"
                >
                  Analytics
                </a>
                <a
                  href="/public-feed"
                  className="block hover:text-emerald-400 transition"
                >
                  Public Feed
                </a>
              </p>
            </div>
            <div className="flex md:justify-end">
              <button className="border border-emerald-500 text-emerald-400 px-5 py-2 rounded-md text-sm font-medium hover:bg-emerald-500 hover:text-white transition cursor-pointer">
                Give Feedback
              </button>
            </div>
          </div>
          <div className="flex gap-4 mb-10">
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
          <div
            className={`p-6 rounded-lg text-sm leading-relaxed mb-8 ${
              isDark ? "bg-gray-800" : "bg-gray-800"
            } text-gray-500`}
          >
            <p className="mb-4">
              This app is designed to help you build positive habits through
              consistent tracking and reflection. Results depend on your
              commitment. We are not responsible for outcomes related to habit
              formation or missed streaks.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
              <div className="w-20 h-14 bg-linear-to-r from-emerald-600 via-teal-500 to-cyan-500 rounded flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <p className="flex-1 text-center md:text-left">
                <strong className="text-emerald-300">
                  We believe small actions, done daily, create extraordinary
                  results.
                </strong>
                <br />
                Every streak started today is a step toward a better tomorrow.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 pt-6 border-t border-gray-700">
            <p>Habit Tracker | All Rights Reserved © 2025</p>
            <p className="mt-2 md:mt-0">
              Built with <span className="text-emerald-400">love</span> &{" "}
              <span className="text-cyan-400">code</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
