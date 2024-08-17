import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import "./app.scss";
import Home from "./pages/home/Home.jsx";
import MoviePage from "./pages/MoviePage/MoviePage.jsx";
import WatchList from "./pages/watchList/WatchList.jsx";
import Categories from "./pages/categories/Categories.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movie/:id", element: <MoviePage /> },
      { path: "/mylist", element: <WatchList /> },
      { path: "/categories", element: <Categories /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
