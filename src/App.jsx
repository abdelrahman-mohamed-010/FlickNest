import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import "./app.scss";
import Home from "./pages/home/Home.jsx";
import MoviePage from "./pages/MoviePage/MoviePage.jsx";
import WatchList from "./pages/watchList/WatchList.jsx";
import Categories from "./pages/categories/Categories.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx"; // Import ProfilePage

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movie/:id", element: <MoviePage /> },
      { path: "/mylist", element: <WatchList /> },
      { path: "/categories", element: <Categories /> },
      { path: "/profile", element: <ProfilePage /> }, // Add ProfilePage route
    ],
  },
  // Add routes for signup and login outside the main Layout if they shouldn't have the Navbar/Footer
  // Or, if they should have Navbar/Footer, add them as children of the Layout route.
  // For a typical Netflix experience, login/signup pages are often standalone.
  // However, to keep the existing structure and ensure Navbar/Footer are present,
  // I will add them as children of Layout for now. This can be easily changed later.
  {
    path: "/signup",
    element: <Layout />, // Or a different Layout if needed for auth pages
    children: [{ path: "/signup", element: <SignUpPage /> }],
  },
  {
    path: "/login",
    element: <Layout />, // Or a different Layout if needed for auth pages
    children: [{ path: "/login", element: <LoginPage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
