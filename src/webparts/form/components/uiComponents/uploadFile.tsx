import React, { useRef } from 'react';
// import styles from '../Form.module.scss';

interface UploadFileProps {
  typeOfDoc: string;
  onChange: (files: FileList | null, typeOfDoc: string) => void;
  accept?: string;
}

const UploadFileComponent: React.FC<UploadFileProps> = ({ onChange, accept,typeOfDoc }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    if (files) {
      onChange(files,typeOfDoc);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept || '.jpg,.jpeg,.png,.pdf'}
        style={{'border':'1px solid rgb(211, 211, 211)', 'padding':'10px'}}
        
      />
      {/* <button onClick={() => fileInputRef.current?.click()}>Upload File</button> */}
    </div>
  );
};

export default UploadFileComponent;
