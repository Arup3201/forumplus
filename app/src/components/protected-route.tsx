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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col gap-6">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}; 