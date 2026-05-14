"use client"
import React, { useState } from 'react'
import Folder from './Folder';
import { FileNode } from './page';

const addFile = (tree: FileNode[], path: number[], fileName: string): FileNode[] => {
    if (path.length === 0) {
        return [
            ...tree,
            { name: fileName, type: "file" }
        ];
    }

    const [index, ...rest] = path;

    return tree.map((node, i) => {
        if (i !== index) return node;

        if (node.type === "folder") {
            return {
                ...node,
                children: addFile(node.children || [], rest, fileName)
            };
        }

        return node;
    });
};


const convertToFolder = (tree: FileNode[], path: number[]): FileNode[] => {
    const [index, ...rest] = path;

    return tree.map((node, i) => {
        if (i !== index) return node;

        if (rest.length === 0 && node.type === "file") {
            return {
                name: node.name,
                type: "folder",
                children: []
            };
        }

        if (node.type === "folder") {
            return {
                ...node,
                children: convertToFolder(node.children || [], rest)
            };
        }

        return node;
    });
};

const FileExplorer = ({ fileData }: { fileData: FileNode[] }) => {
    const [data, setData] = useState(fileData);

    const handleAddFile = (path: number[], name: string) => {
        setData(prev => addFile(prev, path, name));
    };

    const handleConvert = (path: number[]) => {
        setData(prev => convertToFolder(prev, path));
    };

    return (
        <div>
            {data.map((item, index) =>
                item.type === "folder" ? (
                    <Folder
                        key={index}
                        data={item}
                        path={[index]}
                        onAdd={handleAddFile}
                        onConvert={handleConvert}
                    />
                ) : (
                    <div
                        key={index}
                        onDoubleClick={() => handleConvert([index])}
                    >
                        📄 {item.name}
                    </div>
                )
            )}
        </div>
    );
};
export default FileExplorer

