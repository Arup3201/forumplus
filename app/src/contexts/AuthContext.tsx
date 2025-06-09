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
  const { postRequest, deleteRequest } = useFetch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const authContextValue = useMemo(() => ({
    isAuthenticated,
    googleSignIn: async () => {
      try {
        const response = await postRequest('/auth/google', {});
        console.log('Google sign in response:', response);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error in googleSignIn:', error);
      }
    },
    githubSignIn: async () => {
      try {
        const response = await postRequest('/auth/github', {});
        console.log('Github sign in response:', response);
      } catch (error) {
        console.error('Error in githubSignIn:', error);
      }
    },
    logout: async () => {
      try {
        const response = await deleteRequest('/auth/logout');
        console.log('Logout response:', response);
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