import {useEffect, useState} from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint(): Breakpoint {
    const [bp, setBp] = useState<Breakpoint>("mobile");

    useEffect(() => {
        function handleResize() {
            const w = window.innerWidth;

            if (w >= 1440) {
                setBp("desktop");
            } else if (w >= 768) {
                setBp("tablet");
            } else {
                setBp("mobile");
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return bp;
}