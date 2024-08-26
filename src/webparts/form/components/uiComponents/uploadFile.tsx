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
  data: any[];
}

interface FileWithError {
  file: File;
  error: string | null;
}

const getFileTypeIcon = (
  fileName: string
): { iconName: string; color: string } => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return { iconName: "PDF", color: "#FF0000" }; // Red for PDF
    case "doc":
    case "docx":
      return { iconName: "WordDocument", color: "#2B579A" }; // Blue for Word
    case "xlsx":
    case "xls":
      return { iconName: "ExcelDocument", color: "#217346" }; // Green for Excel
    default:
      return { iconName: "Page", color: "#605E5C" }; // Gray for other files
  }
};

const UploadFileComponent: React.FC<UploadFileProps> = ({
  onChange,
  accept,
  typeOfDoc,
  maxFileSizeMB,
  multiple,
  maxTotalSizeMB,
  data,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileWithError[]>([]);

  const isFileNameValid = (name: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+$/;
    return regex.test(name);
  };

  useEffect(() => {
    const files = data || [];
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

    setSelectedFiles(validFiles);
  }, [data, maxFileSizeMB, maxTotalSizeMB, multiple]);

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

      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((fileWithError) =>
        dataTransfer.items.add(fileWithError.file)
      );

      onChange(dataTransfer.files, typeOfDoc);

      fileInputRef.current.value = "";
    }
  };

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

    onChange(fileInputRef.current?.files || null, typeOfDoc);
  };

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
        selectedFiles.map(({ file, error }) => {
          const { iconName, color } = getFileTypeIcon(file.name);
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
                  iconName={iconName}
                  style={{ fontSize: "24px", marginTop: "14px", color: color }}
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
          );
        })}
    </ul>
  );
};

export default UploadFileComponent;
