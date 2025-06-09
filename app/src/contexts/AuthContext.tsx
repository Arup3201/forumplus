import { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    console.log('signInWithGoogle');
  };

  const signInWithGithub = async () => {
    console.log('signInWithGithub');
  };

  const logout = async () => {
    console.log('logout');
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 