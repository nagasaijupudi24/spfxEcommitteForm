import React, { useRef, useState } from 'react';
import { IconButton } from '@fluentui/react/lib/Button';

interface UploadFileProps {
  typeOfDoc: string;
  onChange: (files: FileList | null, typeOfDoc: string) => void;
  accept?: string;
  maxFileSizeMB: number; // Required prop for max file size in MB
  multiple: boolean; // Required prop to allow multiple file uploads
  maxTotalSizeMB?: number; // Max total size for all files in MB (optional)
}

const UploadFileComponent: React.FC<UploadFileProps> = ({
  onChange,
  accept,
  typeOfDoc,
  maxFileSizeMB,
  multiple,
  maxTotalSizeMB,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isFileNameValid = (name: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+$/; // Regular expression to check for special characters
    return regex.test(name);
  };

  const handleFileChange = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const files = fileInputRef.current.files;
      const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024; // Convert MB to bytes
      const maxTotalSizeBytes = maxTotalSizeMB ? maxTotalSizeMB * 1024 * 1024 : undefined; // Convert MB to bytes (if provided)
      const validFiles: File[] = [];
      let currentTotalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
      let hasError = false;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > maxFileSizeBytes) {
          setError(`File size exceeds ${maxFileSizeMB}MB`);
          hasError = true;
          break;
        }

        if (!isFileNameValid(file.name)) {
          setError('File name contains invalid characters');
          hasError = true;
          break;
        }

        if (maxTotalSizeBytes && currentTotalSize + file.size > maxTotalSizeBytes) {
          setError(`Total file size exceeds ${maxTotalSizeMB}MB`);
          hasError = true;
          break;
        }

        currentTotalSize += file.size;
        validFiles.push(file);
      }

      if (!hasError) {
        setSelectedFiles(multiple ? [...selectedFiles, ...validFiles] : validFiles);
        setError(null); // Clear any previous errors
        onChange(fileInputRef.current?.files, typeOfDoc);
      }

      fileInputRef.current.value = ''; // Clear the input value
    }
  };

  const handleDeleteFile = (fileName: string) => {
    const updatedFiles = selectedFiles.filter(file => file.name !== fileName);
    setSelectedFiles(updatedFiles);

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach(file => dataTransfer.items.add(file));
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }

    onChange(fileInputRef.current?.files || null, typeOfDoc); // Inform the parent component about the change
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        style={{ border: '1px solid rgb(211, 211, 211)', padding: '10px' }}
        multiple={multiple} // Apply the multiple attribute based on prop
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          {selectedFiles.map(file => (
            <div key={file.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <p style={{ marginRight: '10px' }}>Uploaded File: {file.name}</p>
              <IconButton
                iconProps={{ iconName: 'Cancel' }} // Fluent UI cross icon
                title="Delete File"
                ariaLabel="Delete File"
                onClick={() => handleDeleteFile(file.name)}
                styles={{ root: { color: 'red' } }} // Optional styling
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadFileComponent;
