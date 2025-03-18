import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import {
  cn,
  scaleTransitionClass,
  hoverScaleClass,
  activeScaleClass,
} from "@/lib/utils";
import { SlideContent } from "./SlideContent";
import { useEffect } from "react";

interface FullscreenSlideProps {
  currentSlide: number;
  slides: string[];
  direction: number;
  goToNextSlide: () => void;
  goToPreviousSlide: () => void;
}

// Animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};

export function FullscreenSlide({
  currentSlide,
  slides,
  direction,
  goToNextSlide,
  goToPreviousSlide,
}: FullscreenSlideProps) {
  // Add scroll navigation for fullscreen mode
  useEffect(() => {
    let lastScrollTime = Date.now();
    const scrollThreshold = 500; // ms between scroll events

    const handleScroll = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThreshold) return;

      if (e.deltaY > 0) {
        goToNextSlide();
      } else if (e.deltaY < 0) {
        goToPreviousSlide();
      }
      lastScrollTime = now;
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [goToNextSlide, goToPreviousSlide]);

  return (
    <div className="relative w-full h-[80vh] flex">
      <Button
        variant="outline"
        size="icon"
        onClick={goToPreviousSlide}
        disabled={currentSlide === 0}
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-10 w-10",
          scaleTransitionClass,
          hoverScaleClass,
          activeScaleClass
        )}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <motion.div
        key={currentSlide}
        className="relative flex-1"
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
        <div className="relative z-10 h-full overflow-auto p-8 flex items-center justify-center">
          <div className="prose dark:prose-invert max-w-4xl mx-auto w-full">
            {slides[currentSlide] && (
              <SlideContent content={slides[currentSlide]} />
            )}
          </div>
        </div>
      </motion.div>

      <Button
        variant="outline"
        size="icon"
        onClick={goToNextSlide}
        disabled={currentSlide === slides.length - 1}
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-10 w-10",
          scaleTransitionClass,
          hoverScaleClass,
          activeScaleClass
        )}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  );
}
