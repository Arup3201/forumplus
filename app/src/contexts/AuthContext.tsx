import useFetch from "@/hooks/useFetch";
import { createContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  googleSignIn: () => void;
  githubSignIn: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { loading, getRequest } = useFetch();

  async function checkAuth() {
    await getRequest('/api/auth/check', () => {
      setIsAuthenticated(true);
    }, (error) => {
      setIsAuthenticated(false);
      console.error('Error in checkAuth:', error);
    });
  }
  
  useEffect(() => {
    checkAuth();
  }, []);

  const authContextValue = useMemo(() => ({
    isAuthenticated,
    loading,
    googleSignIn: async () => {
      setIsAuthenticated(false);
      try {
        window.location.href = '/api/auth/google';
      } catch (error) {
        console.error('Error in googleSignIn:', error);
      }
    },
    githubSignIn: async () => {
      setIsAuthenticated(false);
      try {
        window.location.href = '/api/auth/github';
      } catch (error) {
        console.error('Error in githubSignIn:', error);
      }
    },
  }), [isAuthenticated, loading]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext };
export default AuthProvider;