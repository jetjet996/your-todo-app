"use client";

import { useRef, useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import * as Actions from "@/app/server/actions";
interface useTodostype {
    todoData: ReturnType<typeof useTodos>;
}


export default function ImportTodos({ todoData }: useTodostype) {
    const td = todoData;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);

    function selectFile(selectedFile: File) {
        if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
            alert("Please select a CSV file.");
            return;
        }
        setFile(selectedFile);
    }
    async function onImport() {
        if (file) {
            const extension = file.name.split(".").pop()?.toLowerCase();
            const text = await file.text();
            if (text) {
                const todos = parseCSV(text);
                const import_data = await Actions.importTodo(todos);
                if(import_data.success){
                    alert("Todo imported successfully!");
                    td.setRefresh(prev => prev + 1);
                }else{
                    alert("Failed to  Too imported Todo!");
                }
            }
        }
    }

    function parseCSV(text: string) {
        const rows = text.trim().split(/\r?\n/);

        const headers = rows[0].split(",").map(header =>
            header.replace(/^"|"$/g, "")
        );

        return rows.slice(1).map(row => {
            const values = row.match(/("(?:[^"]|"")*"|[^,]*)(,|$)/g) ?? [];

            const data = values.map(value =>
                value
                    .replace(/,$/, "")
                    .replace(/^"|"$/g, "")
                    .replace(/""/g, '"')
            );

            return Object.fromEntries(
                headers.map((header, index) => [header, data[index] ?? ""])
            );

        })
    }
    function onClose() {
        td.setImportModal(false);
    }
    async function handleImport() {
        if (!file) return;

        try {
            setLoading(true);
            await onImport();
            onClose();
        } catch (error) {
            console.error("Import failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl space-y-5">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Import Todos</h2>
                        <p className="text-sm text-gray-500">
                            Upload a CSV file to import your todos.
                        </p>
                    </div>

                    <button onClick={onClose} type="button">
                        ✕
                    </button>
                </div>

                {/* File path */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        File location
                    </label>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            readOnly
                            value={file?.name ?? ""}
                            placeholder="Select a file..."
                            className="flex-1 min-w-0 rounded-lg border px-3 py-2"
                        />

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                        >
                            Browse
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv,text/csv"
                            hidden
                            onChange={(e) => {
                                const selected = e.target.files?.[0];
                                if (selected) selectFile(selected);
                            }}
                        />
                    </div>
                </div>

                {/* Drag and Drop */}
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);

                        const droppedFile = e.dataTransfer.files[0];
                        if (droppedFile) selectFile(droppedFile);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center cursor-pointer ${isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400"
                        }`}
                >
                    <div className="text-4xl mb-3">📁</div>

                    <p className="font-medium">
                        Drag and drop your CSV file here
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        or click to browse your files
                    </p>

                    <p className="text-xs text-gray-400 mt-3">
                        Supported format: CSV
                    </p>
                </div>

                {/* Selected file */}
                {file && (
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-sm truncate">{file.name}</span>

                        <button
                            type="button"
                            onClick={() => {
                                setFile(null);
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }}
                            className="text-sm text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={!file || loading}
                        onClick={handleImport}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Importing..." : "Import Todos"}
                    </button>
                </div>

            </div>
        </div>
    );
}