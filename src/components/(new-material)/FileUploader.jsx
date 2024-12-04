"use client";

import { FileUp } from "lucide-react";

export default function FileUploader({ file, setFile }) {
    const setHighlight = (isHighlighted) => {
        const effect = "bg-[rgba(255,255,255,0.075)]";
        if (isHighlighted) document.getElementById("drag-area").classList.add(effect);
        else document.getElementById("drag-area").classList.remove(effect);
    };

    const dragEnterHandler = (e) => {
        e.preventDefault();
        setHighlight(true);
    };

    const dragOverHandler = dragEnterHandler;

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setHighlight(false);
    };

    const dropHandler = (e) => {
        e.preventDefault();
        setHighlight(false);
        if (e.dataTransfer.files.length == 1) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="mb-6 pt-4">
            <label className="mb-5 block">
                <span className="text-2xl md:text-3xl font-bold">Upload Academic Resource</span>
                <span className="block text-sm md:text-base text-gray-400">Share your course materials with other students</span>
            </label>
            <div className="mb-8">
                <input id="file" type="file" className="sr-only" onChange={(e) => setFile(e.target.files[0])} />
                <label htmlFor="file" id="drag-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragOverHandler} className="flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-gray-700 p-12 text-center">
                    <div>
                        {file ? (
                            <span className="mb-4 block text-base font-normal ">{file.name}</span>
                        ) : (
                            <div className="flex flex-col items-center"> 
                                <FileUp size={40} />
                                <span className="block text-xl font-semibold">Drop your file here</span>
                                <span className="block text-base font-medium text-gray-400">or click to browse</span>
                            </div>
                        )}
                    </div>
                </label>
            </div>
        </div>
    );
}