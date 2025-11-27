import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";

import CommingSoon from "../pages/CommingSoon";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Favorites from "../pages/Favorites";
import MovieDetail from "../pages/MovieDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      { path: "/movies", element: <Movies /> },
      { path: "/movies/:movieSlug", element: <MovieDetail /> },

      { path: "/favorites", element: <Favorites /> },

      { path: "*", element: <CommingSoon /> },
    ],
  },
]);
