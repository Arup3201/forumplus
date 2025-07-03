import type { User } from "@/types/user";

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    googleSignIn: () => void;
    githubSignIn: () => void;
    logout: () => void;
};

export type { AuthContextType };