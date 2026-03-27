import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeProvider";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const { isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-base-100 dark" : "bg-base-100"}`}>
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-1 min-h-screen">
        <Outlet />
      </main>

      <Footer />

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: isDark ? "#9ECFD4" : "#016B61",
            color: "#fff",
            fontFamily: "inherit",
            borderRadius: "12px",
          },
        }}
      />
    </div>
  );
};

export default Layout;
