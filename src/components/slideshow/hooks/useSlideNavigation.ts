import { useState, useEffect, useCallback } from "react";

export function useSlideNavigation(slides: string[]) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

  const goToNextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setDirection(1);
    }
  }, [currentSlide, slides.length]);

  const goToPreviousSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setDirection(-1);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if focus is in the textarea
      if (document.activeElement?.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight" || (e.key === " " && !e.repeat)) {
        e.preventDefault(); // Prevent space from scrolling
        goToNextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPreviousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextSlide, goToPreviousSlide]);

  return {
    currentSlide,
    setCurrentSlide,
    direction,
    setDirection,
    goToNextSlide,
    goToPreviousSlide,
  };
}
