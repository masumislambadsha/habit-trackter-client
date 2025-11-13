import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  useEffect(() => {
      document.title = "Habit Tracker | Login";
    }, []);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInUser(formData.email, formData.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch {
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-gray-900 to-gray-800"
          : "bg-linear-to-br from-[#E5E9C5] to-[#9ECFD4]"
      }`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div
          className={`rounded-3xl shadow-2xl p-8 border-4 transition-colors duration-300 ${
            isDark
              ? "bg-gray-800 border-[#70B2B2]"
              : "bg-white border-[#016b61]"
          }`}
        >
          <h2
            className={`text-3xl font-bold text-center mb-8 ${
              isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
            }`}
          >
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className={`w-full px-5 py-3 border rounded-xl focus:ring-2 transition-colors duration-300 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                  : "border-[#9ECFD4] focus:ring-[#016B61] focus:border-[#016B61]"
              }`}
            />
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
                minLength={6}
                className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:outline-none transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] text-gray-700 focus:ring-[#016B61] focus:border-[#016B61]"
                } `}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className={`cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2  ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016b61]"
                }`}
              >
                {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full py-4  text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-70 transition-all duration-300 bg-linear-to-r from-[#016B61] to-[#70B2B2] hover:from-[#70B2B2] hover:to-[#9ECFD4] shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-6">
            <button
              onClick={handleGoogle}
              disabled={loading}
              className={`cursor-pointer w-full flex justify-center items-center gap-2 py-3 border-2 rounded-xl font-semibold transition-colors duration-300 ${
                isDark
                  ? "border-[#70B2B2] text-[#9ECFD4] hover:bg-gray-700"
                  : "border-[#9ECFD4] text-[#016B61] hover:bg-[#E5E9C5]"
              }`}
            >
              <FcGoogle size={22} /> Continue with Google
            </button>
          </div>
          <p
            className={`text-center mt-6 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className={`font-semibold hover:underline ${
                isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
              }`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
