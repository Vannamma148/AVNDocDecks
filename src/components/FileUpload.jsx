import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function FileUpload({ addFile }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setProgress(0);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    console.log("Starting upload...");
    setUploading(true);
    let progressValue = 0;

    const uploadInterval = setInterval(() => {
      if (progressValue >= 100) {
        clearInterval(uploadInterval);
        console.log("Upload completed");
        completeUpload();
      } else {
        progressValue += 10;
        console.log(`Progress: ${progressValue}%`);
        setProgress(progressValue);
      }
    }, 300);
  };

  const completeUpload = () => {
    const newFile = {
      id: Date.now(),
      desc: selectedFile.name,
      fileSize: (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB",
      url: URL.createObjectURL(selectedFile),
      tag: { isOpen: true, tagTitle: "Uploaded", tagColor: "blue" },
    };

    addFile(newFile);
    setSelectedFile(null);
    setUploading(false);
    setProgress(0);
  };

  return (
    <div className="bg-white p-4 m-2 rounded-lg shadow-lg">
      <h3 className="font-semibold mb-2">Upload a File</h3>

      {/* File Input */}
      <input
        type="file"
        onChange={handleFileChange}
        className="border border-gray-300 p-2 mb-2 w-full"
      />

      {/* Progress Bar */}
      {uploading && <ProgressBar progress={progress} />}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
