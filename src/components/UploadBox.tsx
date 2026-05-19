import React, { useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';

interface UploadBoxProps {
  onUpload: (file: File) => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        onUpload(e.dataTransfer.files[0]);
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, [onUpload]);

  if (!isDragActive) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-indigo-500/90 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center p-12 border-4 border-dashed border-white rounded-2xl animate-pulse">
        <UploadCloud size={64} className="text-white mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Drop it like it's hot</h2>
        <p className="text-white/80 text-lg">Release to upload your markdown file</p>
      </div>
    </div>
  );
};

export default UploadBox;
