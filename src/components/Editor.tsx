import React from 'react';

interface EditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ markdown, setMarkdown }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-800">
      <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold uppercase tracking-wider text-xs">Markdown</span>
        <span>{markdown.trim().split(/\\s+/).filter(w => w.length > 0).length} words</span>
      </div>
      <textarea
        className="flex-1 w-full p-4 md:p-6 resize-none outline-none font-mono text-sm md:text-base leading-relaxed bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Type some markdown here..."
        spellCheck="false"
      />
    </div>
  );
};

export default Editor;
