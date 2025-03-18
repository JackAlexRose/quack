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

export function InfoSection() {
  return (
    <div className="mt-12 mb-8 prose dark:prose-invert max-w-none">
      <h2>About Quack</h2>
      <p>
        Quack is a simple markdown-to-slideshow converter that helps you create
        presentations quickly using markdown syntax. Perfect for developers and
        technical presenters who prefer writing in markdown.
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
  );
}
