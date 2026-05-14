import React from 'react'
import FileExplorer from './FileExplorer';

export type FileNode = {
    name: string;
    type: "file" | "folder";
    children?: FileNode[]; // only present if type === "folder"
};

const fileData: FileNode[] = [
    {
        name: "src",
        type: "folder",
        children: [
            {
                name: "components",
                type: "folder",
                children: [
                    { name: "Header.js", type: "file" },
                    { name: "Footer.js", type: "file" }
                ]
            },
            { name: "App.js", type: "file" },
            { name: "index.js", type: "file" }
        ]
    },
    {
        name: "package.json",
        type: "file"
    }
];

const FileFolder = () => {
    return (
        <div>
            <FileExplorer fileData={fileData} />
        </div>
    )
}

export default FileFolder;