import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home/home-page';
import AppProviders from './providers';
import ProfilePage from './pages/profile/profile-page';
import PunchPage from './pages/punch-page/punch-page';
import AttendanceDetailPage from './pages/attendance/attendace-detail-page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppProviders />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/punch-page", element: <PunchPage /> },
      { path: "/attendance-details", element: <AttendanceDetailPage /> }

    ],
  },
  //   { path: "*", element: <NotFound /> }, 
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;