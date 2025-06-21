import { createContext, useMemo, useState } from "react";

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeContextType {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };