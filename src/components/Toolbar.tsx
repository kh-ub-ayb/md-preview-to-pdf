import React, { useState, useRef } from 'react';
import { Download, FileUp, Moon, Sun, Maximize, Minimize, Trash2, Copy, Layers } from 'lucide-react';
import { exportPDF } from '../utils/exportPDF';
import BatchConverter from './BatchConverter';

interface ToolbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isExporting: boolean;
  setIsExporting: (state: boolean) => void;
  handleFileUpload: (file: File) => void;
  isFullscreen: boolean;
  setIsFullscreen: (state: boolean) => void;
  clearEditor: () => void;
  copyToClipboard: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  theme, 
  toggleTheme, 
  isExporting, 
  setIsExporting, 
  handleFileUpload,
  isFullscreen,
  setIsFullscreen,
  clearEditor,
  copyToClipboard
}) => {
  const [showBatchConverter, setShowBatchConverter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleExport = () => {
    exportPDF('preview', 'markdown-preview.pdf', setIsExporting);
  };

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm z-10 transition-colors">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold">
          MD
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-purple-600 hidden sm:block">
          Preview Exporter
        </h1>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        <button 
          onClick={copyToClipboard}
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-md transition-colors"
          title="Copy Markdown"
        >
          <Copy size={18} />
        </button>

        <button 
          onClick={clearEditor}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 rounded-md transition-colors mr-2 border-r border-gray-200 dark:border-gray-700 pr-4"
          title="Clear Editor"
        >
          <Trash2 size={18} />
        </button>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={onFileChange} 
          accept=".md" 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <FileUp size={16} />
          <span className="hidden sm:inline">Upload .md</span>
        </button>

        <button 
          onClick={() => setShowBatchConverter(true)}
          className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Convert Multiple Files"
        >
          <Layers size={16} />
          <span className="hidden sm:inline">Batch Convert</span>
        </button>

        <button 
          onClick={handleExport}
          disabled={isExporting}
          className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors ${isExporting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          <Download size={16} className={isExporting ? 'animate-bounce' : ''} />
          <span className="hidden sm:inline">
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </span>
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        <button 
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-md transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-md transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      {showBatchConverter && (
        <BatchConverter onClose={() => setShowBatchConverter(false)} />
      )}
    </header>
  );
};

export default Toolbar;
