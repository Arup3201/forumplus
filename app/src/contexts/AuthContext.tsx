import useFetch from "@/hooks/useFetch";
import { createContext, useEffect, useMemo, useState } from "react";
import type { AuthContextType } from "@/types/contexts/auth";
import type { User } from "@/types/user";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { getRequest } = useFetch();

  async function checkAuth() {
    await getRequest('/api/auth/me', (data) => {
      setIsAuthenticated(true);
      const userData = {
        id: data.id,
        email: data.email,
        username: data.username,
        avatarUrl: data.avatar_url,
        isActive: data.is_active,
        isDeleted: data.is_deleted,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
      setUser(userData as User);
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
    user,
    googleSignIn: async () => {
      setLoading(true);
      window.location.href = '/api/auth/oauth/google';
    },
    githubSignIn: async () => {
      setLoading(true);
      window.location.href = '/api/auth/oauth/github';
    },
  }), [isAuthenticated, loading, user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext };
export default AuthProvider;