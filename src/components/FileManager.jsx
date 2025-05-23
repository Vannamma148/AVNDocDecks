import React, { useState } from "react";
import Card from "./Card";
import FileUpload from "./FileUpload";
import SearchBar from "./SearchBar";

export default function FileManager() {
  const [files, setFiles] = useState([
    {
      id: 1,
      desc: "User Guide.pdf",
      fileSize: "1.2MB",
      url: "https://example.com/user-guide.pdf",
      tag: { isOpen: true, tagTitle: "Download Now", tagColor: "green" },
    },
    {
      id: 2,
      desc: "Project Report.docx",
      fileSize: "2.4MB",
      url: "https://example.com/project-report.docx",
      tag: { isOpen: true, tagTitle: "In Progress", tagColor: "yellow" },
    },
  ]);

  const [filteredFiles, setFilteredFiles] = useState(files);

  const addFile = (newFile) => {
    const updatedFiles = [newFile, ...files];
    setFiles(updatedFiles);
    setFilteredFiles(updatedFiles);
  };

  const handleDelete = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    setFilteredFiles(updatedFiles);
  };

  const handleSearch = (query) => {
    const searchResult = files.filter((file) =>
      file.desc.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFiles(searchResult);
  };

  const handleFilter = (tag) => {
    if (tag === "") {
      setFilteredFiles(files);
    } else {
      const filtered = files.filter((file) => file.tag.tagTitle === tag);
      setFilteredFiles(filtered);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">File Manager</h2>

      <FileUpload addFile={addFile} />

      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <Card
              key={file.id}
              file={file}
              handleDownload={() => console.log("Download", file.desc)}
              handleDelete={() => handleDelete(file.id)}
            />
          ))
        ) : (
          <p className="text-gray-500">No files available.</p>
        )}
      </div>
    </div>
  );
}
