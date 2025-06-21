import type { Theme } from "@/types/theme";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export type { ThemeContextType };