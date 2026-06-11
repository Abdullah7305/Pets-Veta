import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,      
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium cubic easing function
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,  // Adjust scroll sensitivity
      touchMultiplier: 2,  // Adjust touch sensitivity
      infinite: false,
    });

    // Setup the animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}