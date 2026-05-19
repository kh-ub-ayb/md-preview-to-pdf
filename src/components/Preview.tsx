import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface PreviewProps {
  markdown: string;
}

const Preview: React.FC<PreviewProps> = ({ markdown }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-800">
      <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold uppercase tracking-wider text-xs">Preview</span>
      </div>
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div 
          id="preview"
          className="markdown-body max-w-4xl mx-auto print-container"
          style={{ minHeight: 'max-content' }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Preview;
