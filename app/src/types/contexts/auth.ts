interface AuthContextType {
    isAuthenticated: boolean;
    googleSignIn: () => void;
    githubSignIn: () => void;
};

export type { AuthContextType };