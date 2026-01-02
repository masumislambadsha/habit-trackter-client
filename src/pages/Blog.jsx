import React, { useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  Tag,
  ArrowRight,
  Search,
  Filter,
  BookOpen,
  TrendingUp,
  Brain,
  Heart
} from "lucide-react";

const Blogs = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "productivity", name: "Productivity" },
    { id: "health", name: "Health & Wellness" },
    { id: "science", name: "Habit Science" },
    { id: "tips", name: "Tips & Tricks" },
    { id: "stories", name: "Success Stories" }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Science of Habit Formation: How Long Does It Really Take?",
      excerpt: "Discover the truth behind the 21-day myth and what science says about building lasting habits.",
      author: "Dr. Sarah Chen",
      date: "2024-03-15",
      readTime: "8 min read",
      category: "science",
      image: "🧠",
      featured: true
    },
    {
      id: 2,
      title: "10 Morning Habits of Highly Productive People",
      excerpt: "Learn the morning routines that successful people swear by to boost productivity.",
      author: "Michael Torres",
      date: "2024-03-10",
      readTime: "6 min read",
      category: "productivity",
      image: "🌅",
      featured: true
    },
    {
      id: 3,
      title: "Building Healthy Habits That Actually Stick",
      excerpt: "Practical strategies to overcome resistance and build habits that last a lifetime.",
      author: "Jessica Williams",
      date: "2024-03-05",
      readTime: "10 min read",
      category: "health",
      image: "💪",
      featured: false
    },
    {
      id: 4,
      title: "From Couch to 5K: A 30-Day Habit Transformation",
      excerpt: "One user's journey from sedentary to marathon runner using habit stacking techniques.",
      author: "David Kim",
      date: "2024-02-28",
      readTime: "12 min read",
      category: "stories",
      image: "🏃",
      featured: false
    },
    {
      id: 5,
      title: "The Power of Habit Stacking: Small Changes, Big Results",
      excerpt: "How linking new habits to existing routines can accelerate your progress dramatically.",
      author: "Alex Johnson",
      date: "2024-02-20",
      readTime: "7 min read",
      category: "tips",
      image: "🔗",
      featured: false
    },
    {
      id: 6,
      title: "Digital Detox: Creating Healthy Tech Habits",
      excerpt: "Strategies to reduce screen time and build healthier relationships with technology.",
      author: "Maria Rodriguez",
      date: "2024-02-15",
      readTime: "9 min read",
      category: "health",
      image: "📱",
      featured: false
    }
  ];

  const featuredAuthors = [
    {
      name: "Dr. Sarah Chen",
      role: "Behavioral Psychologist",
      bio: "Specializes in habit formation and behavioral change.",
      avatar: "SC"
    },
    {
      name: "Michael Torres",
      role: "Productivity Expert",
      bio: "Helps individuals and teams achieve peak performance.",
      avatar: "MT"
    },
    {
      name: "Jessica Williams",
      role: "Wellness Coach",
      bio: "Focuses on sustainable health and wellness habits.",
      avatar: "JW"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`mt-16 min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#016B61]/10 to-[#70B2B2]/10 mb-6">
            <BookOpen className="text-[#016B61]" size={20} />
            <span className={`font-medium ${isDark ? "text-[#70B2B2]" : "text-[#016B61]"}`}>
              HabitFlow Blog
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Insights & Inspiration for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#016B61] to-[#70B2B2]">Better Habits</span>
          </h1>

          <p className={`text-xl max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Expert advice, success stories, and science-backed strategies to help you build lasting habits.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-8 p-6 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-auto">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-400"}`} size={20} />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className={`pl-10 pr-4 py-3 rounded-xl border w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-[#016B61] ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-[#016B61] to-[#70B2B2] text-white"
                      : isDark
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {blogPosts.filter(post => post.featured).length > 0 && (
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Featured Articles
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {blogPosts
                .filter(post => post.featured)
                .map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-2xl overflow-hidden group cursor-pointer ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{post.image}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                            }`}>
                              {categories.find(c => c.id === post.category)?.name}
                            </span>
                            <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className={`text-xl font-bold mb-2 group-hover:text-[#016B61] transition-colors ${isDark ? "text-white" : "text-gray-900"}`}>
                            {post.title}
                          </h3>
                          <p className={isDark ? "text-gray-400 mb-4" : "text-gray-600 mb-4"}>
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#016B61] to-[#70B2B2] flex items-center justify-center text-white text-sm font-bold">
                                {post.author.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                                  {post.author}
                                </p>
                                <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                  {post.date}
                                </p>
                              </div>
                            </div>
                            <ArrowRight className={isDark ? "text-gray-400 group-hover:text-[#70B2B2]" : "text-gray-400 group-hover:text-[#016B61]"} size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Latest Articles
            </h2>
            <p className={isDark ? "text-gray-400" : "text-gray-500"}>
              {filteredPosts.length} posts found
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className={`text-center py-12 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}>
              <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                No articles found
              </h3>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-2xl overflow-hidden group cursor-pointer ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{post.image}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                      }`}>
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold mb-3 group-hover:text-[#016B61] transition-colors ${isDark ? "text-white" : "text-gray-900"}`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User size={14} className={isDark ? "text-gray-400" : "text-gray-500"} />
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {post.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className={isDark ? "text-gray-400" : "text-gray-500"} />
                          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {post.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} className={isDark ? "text-gray-400" : "text-gray-500"} />
                          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        {/* Featured Authors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-8 ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
        >
          <h2 className={`text-2xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>
            Featured Contributors
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredAuthors.map((author, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl text-center ${isDark ? "bg-gray-700" : "bg-gray-50"}`}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#016B61] to-[#70B2B2] flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {author.avatar}
                </div>
                <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {author.name}
                </h3>
                <p className={`text-sm font-medium mb-3 ${isDark ? "text-[#70B2B2]" : "text-[#016B61]"}`}>
                  {author.role}
                </p>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                  {author.bio}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-12 rounded-2xl p-8 ${isDark ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-[#016B61] to-[#70B2B2]"} shadow-xl`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-white"}`}>
              Stay Updated with the Latest Insights
            </h2>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-100"}`}>
              Get weekly articles, tips, and strategies delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className={`flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white ${
                  isDark ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"
                }`}
              />
              <button className={`px-6 py-3 rounded-xl font-bold transition-colors ${
                isDark
                  ? "bg-white text-gray-900 hover:bg-gray-100"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
                Subscribe
              </button>
            </div>
            <p className={`text-sm mt-4 ${isDark ? "text-gray-400" : "text-gray-200"}`}>
              No spam, unsubscribe at any time
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
