import type { FilePurpose, FileRecord } from "@/types/chat";
import { MAX_FILE_SIZE, MAX_FILES } from "@/lib/constants";
import { ClipboardList, FileText, Paperclip, X } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadAreaProps {
    files: File[];
    fileRecords: FileRecord[];
    purpose: FilePurpose;
    onPurposeChange: (purpose: FilePurpose) => void;
    hasJobDescription: boolean;
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
    purpose,
    onPurposeChange,
    hasJobDescription,
    onFilesSelected,
    onRemoveFile,
    disabled,
}: FileUploadAreaProps) {
    const inputRef = useRef<HTMLInputElement>(null);
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

        if (purpose === "job_description" && valid.length > 1) {
            setError("Only one job description PDF can be uploaded.");
            return valid.slice(0, 1);
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

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            handleFiles(Array.from(e.target.files));
            e.target.value = "";
        }
    }

    function openPicker(filePurpose: FilePurpose) {
        onPurposeChange(filePurpose);
        // Defer click so the purpose state is set before validation runs
        setTimeout(() => inputRef.current?.click(), 0);
    }

    return (
        <div className="mb-2">
            <input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                multiple={purpose !== "job_description"}
                className="hidden"
                onChange={handleInputChange}
            />

            {/* Two buttons side by side */}
            <div className="flex gap-2">
                <button
                    type="button"
                    disabled={disabled || remainingSlots <= 0 || !hasJobDescription}
                    onClick={() => openPicker("resume")}
                    title={
                        !hasJobDescription ? "Please provide a job description first" : undefined
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-600 disabled:pointer-events-none disabled:opacity-50"
                >
                    <Paperclip className="h-4 w-4" />
                    <span>
                        {!hasJobDescription
                            ? "Provide a Job Description first"
                            : `Attach Resumes${remainingSlots < MAX_FILES ? ` (${remainingSlots} remaining)` : ""}`}
                    </span>
                </button>

                <button
                    type="button"
                    disabled={disabled || hasJobDescription}
                    onClick={() => openPicker("job_description")}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-600 disabled:pointer-events-none disabled:opacity-50"
                >
                    <ClipboardList className="h-4 w-4" />
                    <span>
                        {hasJobDescription ? "Job Description Uploaded" : "Attach Job Description"}
                    </span>
                </button>
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
                            <span className="rounded bg-slate-200 px-1.5 py-0.5 text-xs text-slate-500">
                                {purpose === "job_description" ? "JD" : "Resume"}
                            </span>
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
