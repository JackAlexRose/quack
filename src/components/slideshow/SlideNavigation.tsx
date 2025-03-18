import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  cn,
  scaleTransitionClass,
  hoverScaleClass,
  activeScaleClass,
} from "@/lib/utils";

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  goToPreviousSlide: () => void;
  goToNextSlide: () => void;
  setIsFullscreen: (value: boolean) => void;
}

export function SlideNavigation({
  currentSlide,
  totalSlides,
  goToPreviousSlide,
  goToNextSlide,
  setIsFullscreen,
}: SlideNavigationProps) {
  return (
    <div className="border-t p-4 flex justify-between">
      <Button
        variant="outline"
        onClick={goToPreviousSlide}
        disabled={currentSlide === 0}
        className={cn(
          "rounded-lg bg-primary px-4 py-2 text-white",
          scaleTransitionClass,
          hoverScaleClass,
          activeScaleClass
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      <Dialog onOpenChange={setIsFullscreen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "rounded-lg bg-primary px-4 py-2 text-white",
              scaleTransitionClass,
              hoverScaleClass,
              activeScaleClass
            )}
          >
            <Maximize2 className="mr-2 h-4 w-4" />
            Enlarge
          </Button>
        </DialogTrigger>
      </Dialog>
      <Button
        variant="outline"
        onClick={goToNextSlide}
        disabled={currentSlide === totalSlides - 1}
        className={cn(
          "rounded-lg bg-primary px-4 py-2 text-white",
          scaleTransitionClass,
          hoverScaleClass,
          activeScaleClass
        )}
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
