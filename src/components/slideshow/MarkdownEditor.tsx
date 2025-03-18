import { Textarea } from "@/components/ui/textarea";

interface MarkdownEditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

export function MarkdownEditor({ markdown, setMarkdown }: MarkdownEditorProps) {
  return (
    <div className="flex flex-col h-[90vh]">
      <h2 className="text-lg font-medium mb-2">Markdown Editor</h2>
      <Textarea
        className="flex-1 resize-none p-4 font-mono text-sm h-full"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Write your markdown here. Use --- to separate slides."
      />
    </div>
  );
}
