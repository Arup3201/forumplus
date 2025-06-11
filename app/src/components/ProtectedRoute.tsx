import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Navbar } from './Navbar';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col gap-6">
      <Navbar />
      {children}
    </div>
  )
}; 