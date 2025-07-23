import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/auth';
import useFetch from '@/hooks/fetch';
import { Navbar } from './navbar';
import { Footer } from './footer';
import type { ProtectedRouteProps } from '@/types/components/protected-route';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const { loading } = useFetch();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col bg-gray-50 px-2 md:px-4 py-1 min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}; 