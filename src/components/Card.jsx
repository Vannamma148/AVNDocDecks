import React, { useRef } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

export default function Card({ file, handleDelete }) {
  const { id, desc, fileSize, url, tag } = file;
  const containerRef = useRef(null);

  // Tag Color Handling
  const tagColorClass = classNames({
    "bg-green-100 text-green-700": tag?.tagColor === "green",
    "bg-yellow-100 text-yellow-700": tag?.tagColor === "yellow",
    "bg-blue-100 text-blue-700": tag?.tagColor === "blue",
    "bg-red-100 text-red-700": tag?.tagColor === "red",
  });

  return (
    <div ref={containerRef} className="relative w-full h-screen p-4 overflow-hidden">
      <motion.div
        drag
        dragConstraints={containerRef}
        whileDrag={{ scale: 1.05, backgroundColor: "#333", color: "#fff" }}
        className="bg-white p-4 m-2 rounded-lg shadow-lg flex items-center justify-between"
      >
        <div>
          <h3 className="font-semibold text-lg">{desc}</h3>
          <p className="text-sm text-gray-500">Size: {fileSize}</p>
        </div>

        <div className="flex items-center gap-2">
          {tag?.isOpen && (
            <span className={`px-2 py-1 text-sm rounded ${tagColorClass}`}>
              {tag.tagTitle}
            </span>
          )}

          <button
            onClick={() => alert("Download Clicked")}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Download
          </button>

          <button
            onClick={() => handleDelete(id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
