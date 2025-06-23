import type { User } from "@/types/user";

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    googleSignIn: () => void;
    githubSignIn: () => void;
};

export type { AuthContextType };