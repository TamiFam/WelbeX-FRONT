import { createBrowserRouter } from "react-router-dom";
import Login from "../user/Login";
import Register from "../user/Register";


import MainLayout from "../layout/MainLayout";
import Dashboard from "../dashboard/Dashboard";

import BlogCp from "../pages/BlogCp";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
    {
        path: "/",
        element: <BlogCp/>
      },
    {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      
    ]
  }

])