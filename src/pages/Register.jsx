import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTheme } from "../context/ThemeProvider";
import { FcGoogle } from "react-icons/fc";
motion;
const Register = () => {
  useEffect(() => {
    document.title = "Habit Tracker | Register";
  }, []);

  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoURL: "",
  });
  const [show, setShow] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");

  const validatePassword = (pw) => {
    if (!pw) return "";
    const checks = {
      length: pw.length >= 6,
      lower: /[a-z]/.test(pw),
      upper: /[A-Z]/.test(pw),
      digit: /\d/.test(pw),
      special: /[!@#$%^&*]/.test(pw),
    };
    const failed = Object.entries(checks)
      .filter(([, ok]) => !ok)
      .map(([k]) => k);
    if (failed.length === 0) return "";
    const parts = failed.map((f) => {
      switch (f) {
        case "length":
          return "6+ characters";
        case "lower":
          return "lowercase";
        case "upper":
          return "uppercase";
        case "digit":
          return "number";
        case "special":
          return "symbol (!@#$%^&*)";
        default:
          return "";
      }
    });
    return `Password must include: ${parts.join(", ")}`;
  };

  useEffect(() => {
    setPasswordMsg(validatePassword(form.password));
  }, [form.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) {
      toast.error("Enter a valid name (≥2 chars)");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      toast.error("Enter a valid email");
      return;
    }
    if (passwordMsg) {
      toast.error(passwordMsg);
      return;
    }
    if (form.confirmPassword !== form.password) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await createUser(form.email, form.password, form.name, form.photoURL);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/");
    } catch {
      toast.error("Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setForm({
      name: "Demo User",
      email: "demo.user@example.com",
      password: "Demo123!",
      confirmPassword: "Demo123!",
      photoURL:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    });
  };

  const isReady =
    !loading &&
    form.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    !passwordMsg &&
    form.password === form.confirmPassword;

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
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] text-gray-700 focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] text-gray-700 focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
              />
            </div>

            <div>
              <input
                type="url"
                name="photoURL"
                value={form.photoURL}
                onChange={handleChange}
                placeholder="Photo URL (optional)"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-colors duration-300 text-sm ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] text-gray-700 focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
              />
            </div>

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                minLength={6}
                className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:outline-none transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] text-gray-700 focus:ring-[#016B61] focus:border-[#016B61]"
                } ${passwordMsg ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className={`cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016b61]"
                }`}
              >
                {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:outline-none transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#9ECFD4] focus:border-[#9ECFD4]"
                    : "border-[#9ECFD4] text-gray-700 focus:ring-[#016B61] focus:border-[#016B61]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className={`cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  isDark ? "text-[#9ECFD4]" : "text-[#016b61]"
                }`}
              >
                {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {passwordMsg && (
              <p className="text-sm text-red-500 mt-1">{passwordMsg}</p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!isReady}
                className={`flex-1 cursor-pointer py-3 font-bold rounded-xl text-white transition-all bg-linear-to-r from-[#016B61] to-[#70B2B2] hover:from-[#70B2B2] hover:to-[#9ECFD4] shadow-lg ${
                  isReady
                    ? "hover:shadow-lg hover:scale-105"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>

              <button
                type="button"
                onClick={handleDemoFill}
                disabled={loading}
                className={`px-4 whitespace-nowrap text-sm font-semibold rounded-xl border transition-colors duration-300 ${
                  isDark
                    ? "border-[#70B2B2] text-[#9ECFD4] hover:bg-gray-700"
                    : "border-[#9ECFD4] text-[#016B61] hover:bg-[#E5E9C5]"
                }`}
              >
                Demo user
              </button>
            </div>
          </form>

          <div className="flex items-center my-6">
            <div
              className={`flex-1 border-t ${
                isDark ? "border-gray-600" : "border-gray-300"
              }`}
            ></div>
            <span
              className={`px-3 text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              OR
            </span>
            <div
              className={`flex-1 border-t ${
                isDark ? "border-gray-600" : "border-gray-300"
              }`}
            ></div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className={`cursor-pointer w-full py-3 flex justify-center items-center gap-2 border-2 rounded-xl font-semibold transition-colors duration-300 ${
              isDark
                ? "border-[#70B2B2] text-[#9ECFD4] hover:bg-gray-700"
                : "border-[#9ECFD4] text-[#016B61] hover:bg-[#E5E9C5]"
            }`}
          >
            <FcGoogle size={22} /> Sign up with Google
          </button>

          <p
            className={`text-center mt-6 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className={`cursor-pointer font-semibold hover:underline ${
                isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
              }`}
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
