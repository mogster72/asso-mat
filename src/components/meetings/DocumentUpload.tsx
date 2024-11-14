import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { File, Upload, X, FileText } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
  existingFiles?: string[];
}

export default function DocumentUpload({ onUpload, existingFiles = [] }: DocumentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxSize: 5242880 // 5MB
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
          }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {isDragActive
            ? 'Déposez les fichiers ici...'
            : 'Glissez-déposez des fichiers ici, ou cliquez pour sélectionner'}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          PDF, DOC, DOCX, PNG, JPG jusqu'à 5MB
        </p>
      </div>

      {(uploadedFiles.length > 0 || existingFiles.length > 0) && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Documents attachés
          </h4>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {existingFiles.map((fileName, index) => (
              <li key={`existing-${index}`} className="py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{fileName}</span>
                </div>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    // Logique de téléchargement
                  }}
                >
                  Télécharger
                </a>
              </li>
            ))}
            {uploadedFiles.map((file, index) => (
              <li key={`new-${index}`} className="py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}