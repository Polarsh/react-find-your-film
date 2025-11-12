import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";

import CommingSoon from "../pages/CommingSoon";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      { path: "*", element: <CommingSoon /> },
    ],
  },
]);
