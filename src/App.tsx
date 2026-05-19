import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import UploadBox from './components/UploadBox';
import './styles/markdown.css';
import 'highlight.js/styles/github.css';

const DEFAULT_MARKDOWN = `# Welcome to Markdown Preview PDF Exporter!

This is a modern, responsive **Markdown Editor** with live preview and PDF export capabilities.

## Features

- 📝 Live Markdown Preview
- 📄 Export exactly what you see to **PDF**
- 🌓 Light and Dark mode
- 💻 Syntax Highlighting for code blocks
- 📂 Drag and drop your \`.md\` files

### GitHub Flavored Markdown (GFM) Supported!

#### Tables

| Feature | Support |
| ------- | ------- |
| Tables | ✅ |
| Task Lists | ✅ |
| Strikethrough | ✅ |

#### Task Lists
- [x] Create React App
- [x] Set up Tailwind CSS
- [x] Add react-markdown
- [ ] Export to PDF

#### Code Blocks

\`\`\`javascript
// This is a code block
function hello() {
  console.log("Hello, World!");
}
hello();
\`\`\`

> "Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents."

You can upload your own file using the upload button or by dragging a \`.md\` file into the browser.
`;

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.md')) {
      alert('Please upload a valid .md file');
      return;
    }
    try {
      const text = await file.text();
      setMarkdown(text);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const clearEditor = () => {
    if (confirm('Are you sure you want to clear the editor?')) {
      setMarkdown('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Toolbar 
        theme={theme} 
        toggleTheme={toggleTheme}
        isExporting={isExporting}
        setIsExporting={setIsExporting}
        handleFileUpload={handleFileUpload}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        clearEditor={clearEditor}
        copyToClipboard={copyToClipboard}
      />
      
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        <UploadBox onUpload={handleFileUpload} />
        
        {!isFullscreen && (
          <div className="w-full md:w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col h-[calc(100vh-64px)] md:h-auto">
            <Editor 
              markdown={markdown} 
              setMarkdown={setMarkdown} 
            />
          </div>
        )}
        
        <div className={`w-full overflow-y-auto ${isFullscreen ? 'md:w-full' : 'md:w-1/2'} h-[calc(100vh-64px)] md:h-auto`}>
          <Preview markdown={markdown} />
        </div>
      </main>
    </div>
  );
}

export default App;