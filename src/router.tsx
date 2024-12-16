import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home/home-page';
import AppProviders from './providers';
import ProfilePage from './pages/profile/profile-page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppProviders/>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/profile", element: <ProfilePage /> },

    ],
  },
//   { path: "*", element: <NotFound /> }, 
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;