import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import { SlideContent } from "./SlideContent";
import { SlideNavigation } from "./SlideNavigation";

interface SlidePreviewProps {
  currentSlide: number;
  slides: string[];
  direction: number;
  goToNextSlide: () => void;
  goToPreviousSlide: () => void;
  setIsFullscreen: (value: boolean) => void;
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

export function SlidePreview({
  currentSlide,
  slides,
  direction,
  goToNextSlide,
  goToPreviousSlide,
  setIsFullscreen,
}: SlidePreviewProps) {
  return (
    <div className="flex flex-col h-[90vh]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Slideshow Preview</h2>
        <div className="text-sm text-muted-foreground">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
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
            <div className="prose dark:prose-invert max-w-none w-full">
              {slides[currentSlide] && (
                <SlideContent content={slides[currentSlide]} />
              )}
            </div>
          </div>
        </motion.div>

        <SlideNavigation
          currentSlide={currentSlide}
          totalSlides={slides.length}
          goToPreviousSlide={goToPreviousSlide}
          goToNextSlide={goToNextSlide}
          setIsFullscreen={setIsFullscreen}
        />
      </Card>
    </div>
  );
}
