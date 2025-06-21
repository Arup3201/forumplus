import { useEffect, useState } from "react";
import type { Screen } from "@/types/screen";

const useResponsive = () => {
    const [screen, setScreen] = useState<Screen>("xl");

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 480) {
                setScreen("xs");
            } else if (width < 640) {
                setScreen("sm");
            } else if (width < 768) {
                setScreen("md");
            } else if (width < 1024) {
                setScreen("lg");
            } else {
                setScreen("xl");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screen;
};

export default useResponsive;