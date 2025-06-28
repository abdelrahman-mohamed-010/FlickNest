import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";
import Layout from "./pages/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./app.scss";
import Home from "./pages/home/Home.jsx";
import MoviePage from "./pages/MoviePage/MoviePage.jsx";
import WatchList from "./pages/watchList/WatchList.jsx";
import Categories from "./pages/categories/Categories.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movie/:id", element: <MoviePage /> },
      { 
        path: "/mylist", 
        element: (
          <ProtectedRoute>
            <WatchList />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/categories", 
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/profile", 
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ) 
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;