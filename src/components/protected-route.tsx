
import { useAppSelector } from '@/hooks/redux-hook';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.user);

  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  );
};

export default ProtectedRoute;
