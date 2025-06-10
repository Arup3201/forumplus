import { createContext, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";

interface AuthContextType {
  isAuthenticated: boolean;
  googleSignIn: () => void;
  githubSignIn: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { deleteRequest } = useFetch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const authContextValue = useMemo(() => ({
    isAuthenticated,
    googleSignIn: async () => {
      setIsAuthenticated(false);
      try {
        window.location.href = '/api/auth/google';
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error in googleSignIn:', error);
      }
    },
    githubSignIn: async () => {
      setIsAuthenticated(false);
      try {
        window.location.href = '/api/auth/github';
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error in githubSignIn:', error);
      }
    },
    logout: async () => {
      try {
        const response = await deleteRequest('/api/auth/logout');
        console.log('Logout response:', response);
        setIsAuthenticated(false);
      } catch (error) {
        console.error('Error in logout:', error);
      }
    },
  }), []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext };
export default AuthProvider;