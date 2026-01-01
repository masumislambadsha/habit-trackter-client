import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Explore from "../pages/Explore";
import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "../pages/Dashboard"; // নতুন
import Profile from "../pages/Profile"; // নতুন
import PrivateRoute from "./PrivateRoute";
import Analytics from "../pages/Analytics";
import AboutUs from "../pages/AboutUs";

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
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        ),
      },
      {
        path: "habits",
        element: (
          <DashboardLayout>
            <MyHabits />
          </DashboardLayout>
        ),
      },
      {
        path: "add-habit",
        element: (
          <DashboardLayout>
            <AddHabit />
          </DashboardLayout>
        ),
      },
      {
        path: "profile",
        element: (
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        ),
      },
      {
        path: "analytics",
        element: (
          <DashboardLayout>
            <Analytics />
          </DashboardLayout>
        ),
      },
      {
        path: "update-habit/:id",
        element: (
          <DashboardLayout>
            <UpdateHabit />
          </DashboardLayout>
        ),
      },
    ],
  },
]);
