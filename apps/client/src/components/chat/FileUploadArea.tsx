import type { FileRecord } from "@/types/chat";
import { MAX_FILE_SIZE, MAX_FILES } from "@/lib/constants";
import { FileText, Paperclip, X } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadAreaProps {
    files: File[];
    fileRecords: FileRecord[];
    onFilesSelected: (files: File[]) => void;
    onRemoveFile: (index: number) => void;
    disabled: boolean;
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploadArea({
    files,
    fileRecords,
    onFilesSelected,
    onRemoveFile,
    disabled,
}: FileUploadAreaProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");

    const totalFiles = fileRecords.length + files.length;
    const remainingSlots = MAX_FILES - totalFiles;

    function validate(incoming: File[]): File[] {
        setError("");
        const valid: File[] = [];

        for (const file of incoming) {
            if (file.type !== "application/pdf") {
                setError("Only PDF files are accepted.");
                continue;
            }
            if (file.size > MAX_FILE_SIZE) {
                setError(`Files must be under ${formatSize(MAX_FILE_SIZE)}.`);
                continue;
            }
            valid.push(file);
        }

        if (valid.length > remainingSlots) {
            setError(`You can upload up to ${MAX_FILES} files per session.`);
            return valid.slice(0, Math.max(0, remainingSlots));
        }

        return valid;
    }

    function handleFiles(incoming: File[]) {
        const valid = validate(incoming);
        if (valid.length > 0) {
            onFilesSelected(valid);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;
        handleFiles(Array.from(e.dataTransfer.files));
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    }

    function handleDragLeave(e: React.DragEvent) {
        e.preventDefault();
        setIsDragging(false);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            handleFiles(Array.from(e.target.files));
            e.target.value = "";
        }
    }

    return (
        <div className="mb-2">
            <input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                multiple
                className="hidden"
                onChange={handleInputChange}
            />

            {/* Drop zone / button */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`rounded-lg border border-dashed p-3 text-center transition-colors ${
                    isDragging
                        ? "border-indigo-400 bg-indigo-50"
                        : "border-slate-300 hover:border-slate-400"
                } ${disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                onClick={() => inputRef.current?.click()}
            >
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Paperclip className="h-4 w-4" />
                    <span>
                        {isDragging
                            ? "Drop PDFs here"
                            : `Attach PDF resumes${remainingSlots < MAX_FILES ? ` (${remainingSlots} remaining)` : ""}`}
                    </span>
                </div>
            </div>

            {/* Error */}
            {error.length > 0 && <p className="mt-1 text-xs text-red-600">{error}</p>}

            {/* File list */}
            {files.length > 0 && (
                <div className="mt-2 space-y-1">
                    {files.map((file, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-1.5 text-sm"
                        >
                            <FileText className="h-4 w-4 text-slate-400" />
                            <span className="flex-1 truncate text-slate-700">{file.name}</span>
                            <span className="text-xs text-slate-400">{formatSize(file.size)}</span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveFile(i);
                                }}
                                className="rounded p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
