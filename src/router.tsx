import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home/home-page';
import AppProviders from './providers';
import ProfilePage from './pages/profile/profile-page';
import PunchPage from './pages/punch-page/punch-page';
import LoginView from './pages/auth/login-view/login-page';
import OTPView from './pages/auth/otp-view/otp-view';
import { SignUpView } from './pages/auth/sign-up/sign-up-view';
import WorkUpdates from './pages/workupdates/work-updates';



const router = createBrowserRouter([
  {
    path: "/",
    element: <AppProviders />,
    children: [
      { path: "/", element: <HomePage /> },
      {path:"/login",element: <LoginView/>},
      {path:"/otp",element: <OTPView/>},
      {path:"/signUp",element: <SignUpView/>},
      { path: "/profile", element: <ProfilePage /> },
      { path: "/punch-page", element: <PunchPage /> },
      { path: "/work-update", element: <WorkUpdates /> }

    ],
  },
  //   { path: "*", element: <NotFound /> }, 
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;