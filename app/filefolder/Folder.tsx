import React, { useState } from 'react'
import { FileNode } from './page'

const Folder = ({
    data,
    path,
    onAdd,
    onConvert,
}: {
    data: FileNode;
    path: number[];
    onAdd: (path: number[], name: string) => void;
    onConvert: (path: number[]) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleAdd = () => {
        if (!fileName.trim()) return;
        onAdd(path, fileName);
        setFileName("");
        setShowInput(false);
    };

    return (
        <div>
            <div onClick={() => setOpen(prev => !prev)}>
                📁 {data.name} {open ? "-" : "+"}
                <button onClick={(e) => {
                    e.stopPropagation();
                    setShowInput(true);
                }}>
                    ➕
                </button>
            </div>

            {showInput && (
                <div>
                    <input
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="Enter file name"
                    />
                    <button onClick={handleAdd}>Add</button>
                </div>
            )}

            <div style={{ marginLeft: 20 }}>
                {open && data.children?.map((item, index) =>
                    item.type === "folder" ? (
                        <Folder
                            key={index}
                            data={item}
                            path={[...path, index]}
                            onAdd={onAdd}
                            onConvert={onConvert}
                        />
                    ) : (
                        <div
                            key={index}
                            onDoubleClick={() => onConvert([...path, index])}
                        >
                            📄 {item.name}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Folder