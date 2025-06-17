import useFetch from "@/hooks/useFetch";
import { createContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  googleSignIn: () => void;
  githubSignIn: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getRequest } = useFetch();

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
    googleSignIn: async () => {
      setLoading(true);
      window.location.href = '/api/auth/google';
    },
    githubSignIn: async () => {
      setLoading(true);
      window.location.href = '/api/auth/github';
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