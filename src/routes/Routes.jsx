import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Explore from "../pages/Explore";
import MyHabits from "../pages/MyHabits";
import AddHabit from "../pages/AddHabit";
import HabitDetails from "../pages/HabitDetails";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import Analytics from "../pages/Analytics";
import UpdateHabit from "../pages/UpdateHabit";
import AboutUs from "../pages/AboutUs";
import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Contact from "../pages/Contact";
import Blogs from "../pages/Blog";
import Help from "../pages/Help";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "browse",
        element: <Explore />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "helps",
        element: <Help />,
      },
      {
        path: "privacy-policy",
        element: <Privacy />,
      },
      {
        path: "terms-and-conditions",
        element: <Terms />,
      },
      {
        path: "habit/:id",
        element: <HabitDetails />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "add-habit",
        element: <AddHabit />,
      },
      {
        path: "my-habits",
        element: <MyHabits />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "update-habit/:id",
        element: <UpdateHabit />,
      },
    ],
  },
]);
