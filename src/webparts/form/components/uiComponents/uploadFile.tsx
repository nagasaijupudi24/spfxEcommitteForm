import React, { useEffect, useRef, useState } from "react";
import { IconButton, Icon } from "@fluentui/react";
import styles from "../Form.module.scss";

interface UploadFileProps {
  typeOfDoc: string;
  onChange: (files: FileList | null, typeOfDoc: string) => void;
  accept?: string;
  maxFileSizeMB: number;
  multiple: boolean;
  maxTotalSizeMB?: number;
  data:any[]
}

interface FileWithError {
  file: File;
  error: string | null;
}

const getFileTypeIcon = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return "PDF";
    case "doc":
    case "docx":
      return "WordDocument";
    case "xlsx":
    case "xls":
      return "ExcelDocument";
    default:
      return "Page";
  }
};

const UploadFileComponent: React.FC<UploadFileProps> = ({
  onChange,
  accept,
  typeOfDoc,
  maxFileSizeMB,
  multiple,
  maxTotalSizeMB,
  data
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileWithError[]>([]);
  // const [selected, setSelected] = useState<any>([]);

  const isFileNameValid = (name: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+$/;
    return regex.test(name);
  };

  useEffect(()=>{
    console.log(data)
    const files = data;
      const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
      const maxTotalSizeBytes = maxTotalSizeMB
        ? maxTotalSizeMB * 1024 * 1024
        : undefined;
  
      let validFiles: FileWithError[] = [];
      let currentTotalSize = selectedFiles.reduce(
        (acc, fileWithError) => acc + fileWithError.file.size,
        0
      );
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let error: string | null = null;
  
        if (file.size > maxFileSizeBytes) {
          error = `File size exceeds ${maxFileSizeMB}MB`;
        } else if (!isFileNameValid(file.name)) {
          error = "File name contains invalid characters";
        } else if (
          maxTotalSizeBytes &&
          currentTotalSize + file.size > maxTotalSizeBytes
        ) {
          error = `Total file size exceeds ${maxTotalSizeMB}MB`;
        }
  
        currentTotalSize += file.size;
        validFiles.push({ file, error });
      }
  
      const updatedFiles = multiple
        ? [...selectedFiles, ...validFiles]
        : validFiles;
  
      setSelectedFiles(updatedFiles);
    // setSelectedFiles(data)
  },[selectedFiles])

  const handleFileChange = (e: any) => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const files = fileInputRef.current.files;
      const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
      const maxTotalSizeBytes = maxTotalSizeMB
        ? maxTotalSizeMB * 1024 * 1024
        : undefined;
  
      let validFiles: FileWithError[] = [];
      let currentTotalSize = selectedFiles.reduce(
        (acc, fileWithError) => acc + fileWithError.file.size,
        0
      );
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let error: string | null = null;
  
        if (file.size > maxFileSizeBytes) {
          error = `File size exceeds ${maxFileSizeMB}MB`;
        } else if (!isFileNameValid(file.name)) {
          error = "File name contains invalid characters";
        } else if (
          maxTotalSizeBytes &&
          currentTotalSize + file.size > maxTotalSizeBytes
        ) {
          error = `Total file size exceeds ${maxTotalSizeMB}MB`;
        }
  
        currentTotalSize += file.size;
        validFiles.push({ file, error });
      }
  
      const updatedFiles = multiple
        ? [...selectedFiles, ...validFiles]
        : validFiles;
  
      setSelectedFiles(updatedFiles);
  
      // Combine previous and current files into a new FileList
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((fileWithError) =>
        dataTransfer.items.add(fileWithError.file)
      );
  
      // Pass the combined files to the onChange method
      onChange(dataTransfer.files, typeOfDoc);
  
      // Clear the input field after processing
      fileInputRef.current.value = "";
    }
  };
  // console.log(selected)

  const handleDeleteFile = (fileName: string) => {
    const updatedFiles = selectedFiles.filter(
      (fileWithError) => fileWithError.file.name !== fileName
    );
    setSelectedFiles(updatedFiles);

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((fileWithError) =>
      dataTransfer.items.add(fileWithError.file)
    );
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }

    console.log(fileInputRef.current?.files)

    onChange(fileInputRef.current?.files || null, typeOfDoc);
  };

  console.log(selectedFiles)

  return (
    <ul className={`${styles.fileAttachementsUl}`}>
      <li className={`${styles.basicLi} ${styles.inputField}`}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          style={{ padding: "10px" }}
          multiple={multiple}
          
        />
      </li>

      {selectedFiles.length > 0 &&
        selectedFiles.map(({ file, error }) =>{
          console.log(selectedFiles)

          return (
            <li
              key={file.name}
              style={{ display: "flex", alignItems: "center" }}
              className={`${styles.basicLi} ${styles.attachementli}`}
            >
              <div
                style={{
                  padding: "2px",
                  marginBottom: "4px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignContent: "center",
                  flexGrow: "1",
                }}
              >
                <Icon
                  iconName={getFileTypeIcon(file.name)}
                  style={{ fontSize: "24px", marginTop: "14px" }}
                />
                <div>
                  <p
                    style={{
                      paddingBottom: "0px",
                      marginBottom: "0px",
                      paddingLeft: "4px",
                    }}
                  >
                    {file.name}
                  </p>
                  {error && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "10px",
                        paddingLeft: "4px",
                        margin: "0px",
                      }}
                    >
                      {error}
                    </span>
                  )}
                </div>
              </div>
  
              <IconButton
                iconProps={{ iconName: "Cancel" }}
                title="Delete File"
                ariaLabel="Delete File"
                onClick={() => handleDeleteFile(file.name)}
              />
            </li>
          )

        } 
        
        )}
    </ul>
  );
};

export default UploadFileComponent;


//////////////////////////////////////
