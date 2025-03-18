"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

// Move these functions outside of the component to avoid recreating them on each render
const createGoToNextSlide =
  (
    currentSlide: number,
    slides: string[],
    setCurrentSlide: (slide: number) => void
  ) =>
  () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

const createGoToPreviousSlide =
  (currentSlide: number, setCurrentSlide: (slide: number) => void) => () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

const EXAMPLE_PROMPT = `Create a slideshow presentation about [your topic] using markdown formatting. Separate each slide with three hyphens (---). Include:

1. A title slide
2. 2-5 content slides with bullet points or numbered lists
3. A closing slide

Make the presentation about [your topic]. Use markdown features like:
- Headers (# for titles)
- Lists (- or 1. for bullets)
- **Bold** and *italic* text
- Code blocks with syntax highlighting
- > Blockquotes if relevant

Keep each slide focused and concise.`;

export default function QuackApp() {
  const [markdown, setMarkdown] = useState<string>(
    '# Welcome to Quack!\n\nThis is a simple markdown to slideshow converter.\n\n- Write your content in markdown\n- Use three hyphens (---) to separate slides\n- Preview your slideshow on the right\n\n---\n\n## Formatting Examples\n\n**Bold text** and *italic text*\n\n1. Numbered lists\n2. Are supported\n\n- As are bullet points\n- Like this one\n\n---\n\n## Code Examples\n\nInline code: `const greeting = "Hello, World!";`\n\n```javascript\n// A simple function\nfunction sayHello(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(sayHello("Quack"));\n```\n\n---\n\n## That\'s it!\n\nStart creating your presentation now.'
  );
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Create memoized navigation functions
  const goToNextSlide = createGoToNextSlide(
    currentSlide,
    slides,
    setCurrentSlide
  );
  const goToPreviousSlide = createGoToPreviousSlide(
    currentSlide,
    setCurrentSlide
  );

  // Parse markdown into slides whenever it changes
  useEffect(() => {
    const parsedSlides = markdown.split(/\n---\n/);
    console.log(parsedSlides.length);
    setSlides(parsedSlides);
  }, [markdown]);

  // Update the keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if focus is in the textarea
      if (document.activeElement?.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight") {
        goToNextSlide();
      } else if (e.key === "ArrowLeft") {
        goToPreviousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextSlide, goToPreviousSlide]); // Dependencies now include the navigation functions

  // Custom components for ReactMarkdown
  const components = {
    code({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={gruvboxDark}
          language={match[1]}
          PreTag="div"
          {...props}
          customStyle={{
            borderRadius: "0.5rem",
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-6">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Markdown Editor */}
          <div className="flex flex-col h-[90vh]">
            <h2 className="text-lg font-medium mb-2">Markdown Editor</h2>
            <Textarea
              className="flex-1 resize-none p-4 font-mono text-sm h-full"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Write your markdown here. Use --- to separate slides."
            />
          </div>

          {/* Slideshow Preview */}
          <div className="flex flex-col h-[90vh]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Slideshow Preview</h2>
              <div className="text-sm text-muted-foreground">
                Slide {currentSlide + 1} of {slides.length}
              </div>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
              <div className="relative flex-1">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
                <div className="relative z-10 h-full overflow-auto p-8 flex items-center justify-center">
                  <div className="prose dark:prose-invert max-w-none w-full">
                    {slides[currentSlide] && (
                      <ReactMarkdown components={components}>
                        {slides[currentSlide]}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t p-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPreviousSlide}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Maximize2 className="mr-2 h-4 w-4" />
                      Enlarge
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] max-h-[90vh] min-w-[90vw] min-h-[90vh] p-0">
                    <div className="relative w-full h-[80vh] flex">
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-10 w-10"
                        onClick={goToPreviousSlide}
                        disabled={currentSlide === 0}
                      >
                        <ChevronLeft className="h-6 w-6" />
                        <span className="sr-only">Previous slide</span>
                      </Button>

                      <div className="relative flex-1">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
                        <div className="relative z-10 h-full overflow-auto p-8 flex items-center justify-center">
                          <div className="prose dark:prose-invert max-w-4xl mx-auto w-full">
                            {slides[currentSlide] && (
                              <ReactMarkdown components={components}>
                                {slides[currentSlide]}
                              </ReactMarkdown>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-10 w-10"
                        onClick={goToNextSlide}
                        disabled={currentSlide === slides.length - 1}
                      >
                        <ChevronRight className="h-6 w-6" />
                        <span className="sr-only">Next slide</span>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={goToNextSlide}
                  disabled={currentSlide === slides.length - 1}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 mb-8 prose dark:prose-invert max-w-none">
          <h2>About Quack</h2>
          <p>
            Quack is a simple markdown-to-slideshow converter that helps you
            create presentations quickly using markdown syntax. Perfect for
            developers and technical presenters who prefer writing in markdown.
          </p>

          <h3 className="mt-4">Key Features</h3>
          <ul>
            <li>Write slides in Markdown</li>
            <li>Live preview as you type</li>
            <li>Syntax highlighting for code blocks</li>
            <li>Keyboard navigation (← →)</li>
            <li>Fullscreen presentation mode</li>
            <li>Dark/Light theme support</li>
          </ul>

          <h3 className="mt-4">Using with AI</h3>
          <p>
            You can use the following prompt with your favorite LLM to generate
            slide content:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm">{EXAMPLE_PROMPT}</pre>
          </div>

          <h3 className="mt-4">Markdown Tips</h3>
          <ul>
            <li>
              Use <code>---</code> on a new line to separate slides
            </li>
            <li>
              Use <code>#</code> for slide titles (h1) and <code>##</code> for
              subtitles (h2)
            </li>
            <li>
              Create lists with <code>-</code> or <code>1.</code>
            </li>
            <li>
              Add code blocks with triple backticks and language name:
              <pre className="text-sm">
                ```javascript console.log(&quot;Hello!&quot;);
              </pre>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
