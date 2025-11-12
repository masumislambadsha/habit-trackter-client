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
        path: "register",
        element: <Register />,
      },
      {
        path: "browse",
        element: (
          <PrivateRoute>
            <Explore />
          </PrivateRoute>
        ),
      },

      {
        path: "my-habits",
        element: (
          <PrivateRoute>
            <MyHabits />
          </PrivateRoute>
        ),
      },
      {
        path: "add-habit",
        element: (
          <PrivateRoute>
            <AddHabit />
          </PrivateRoute>
        ),
      },
      {
        path: "habit/:id",
        element: (
          <PrivateRoute>
            <HabitDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "update-habit/:id",
        element: (
          <PrivateRoute>
            <UpdateHabit />
          </PrivateRoute>
        ),
      },
      {
        path: "/analytics",
        element: (
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
