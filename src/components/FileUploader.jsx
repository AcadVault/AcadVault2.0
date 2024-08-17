"use client";

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
            <label className="mb-5 block text-center font-extrabold">
                <span className="text-3xl">Upload a File</span>
            </label>
            <div className="mb-8">
                <input id="file" type="file" className="sr-only" onChange={(e) => setFile(e.target.files[0])} />
                <label htmlFor="file" id="drag-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragOverHandler} className="flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                    <div>
                        {file ? (
                            <span className="mb-4 block text-base font-normal ">{file.name}</span>
                        ) : (
                            <div>
                                <span className="mb-2 block text-xl font-semibold ">Drop file here</span>
                                <span className="mb-2 block text-base font-medium text-[#6B7280]">Or</span>
                            </div>
                        )}
                        <span className="inline-flex rounded border cursor-pointer border-[#b9b9b9] py-2 px-7 text-base font-medium ">
                            {file ? "Choose Different File" : "Browse"}
                        </span>
                    </div>
                </label>
            </div>
        </div>
    );
}