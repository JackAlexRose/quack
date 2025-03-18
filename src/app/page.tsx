"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MarkdownEditor } from "@/components/slideshow/MarkdownEditor";
import { SlidePreview } from "@/components/slideshow/SlidePreview";
import { FullscreenSlide } from "@/components/slideshow/FullscreenSlide";
import { InfoSection } from "@/components/slideshow/InfoSection";
import { useSlideNavigation } from "@/components/slideshow/hooks/useSlideNavigation";

const DEFAULT_MARKDOWN =
  '# Welcome to Quack!\n\nThis is a simple markdown to slideshow converter.\n\n- Write your content in markdown\n- Use three hyphens (---) to separate slides\n- Preview your slideshow on the right\n\n---\n\n## Formatting Examples\n\n**Bold text** and *italic text*\n\n1. Numbered lists\n2. Are supported\n\n- As are bullet points\n- Like this one\n\n---\n\n## Code Examples\n\nInline code: `const greeting = "Hello, World!";`\n\n```javascript\n// A simple function\nfunction sayHello(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(sayHello("Quack"));\n```\n\n---\n\n## That\'s it!\n\nStart creating your presentation now.';

export default function QuackApp() {
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
  const [slides, setSlides] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const { currentSlide, direction, goToNextSlide, goToPreviousSlide } =
    useSlideNavigation(slides);

  // Parse markdown into slides whenever it changes
  useEffect(() => {
    const parsedSlides = markdown.split(/\n---\n/);
    setSlides(parsedSlides);
  }, [markdown]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-6">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Markdown Editor */}
          <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />

          {/* Slideshow Preview */}
          <SlidePreview
            currentSlide={currentSlide}
            slides={slides}
            direction={direction}
            goToNextSlide={goToNextSlide}
            goToPreviousSlide={goToPreviousSlide}
            setIsFullscreen={setIsFullscreen}
          />
        </div>

        {/* Fullscreen Dialog */}
        <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] min-w-[90vw] min-h-[90vh] p-0 overflow-hidden">
            <DialogTitle className="hidden">Quack</DialogTitle>
            <FullscreenSlide
              currentSlide={currentSlide}
              slides={slides}
              direction={direction}
              goToNextSlide={goToNextSlide}
              goToPreviousSlide={goToPreviousSlide}
            />
          </DialogContent>
        </Dialog>

        {/* Info Section */}
        <InfoSection />
      </main>
    </div>
  );
}
