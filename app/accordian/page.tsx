"use client"
import React, { useState } from "react";

type Item = {
    id: string | number;
    title: string;
    content: React.ReactNode;
};

interface AccordionProps {
    items: Item[];
    multiple?: boolean; // allow multiple open
}

const defaultItems: Item[] = [
    { id: 1, title: "Section 1", content: "I manage open panels using state and support both single and multiple expansion. I use semantic buttons with aria attributes for accessibility and handle keyboard interactions." },
    { id: 2, title: "Section 2", content: "Content 2" },
];

const Accordion = ({
    items,
    multiple = true
}: AccordionProps) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggle = (index: number) => {
        if (multiple) {
            setOpenIndexes((prev) =>
                prev.includes(index)
                    ? prev.filter((i) => i !== index)
                    : [...prev, index]
            );
        } else {
            setOpenIndexes((prev) =>
                prev.includes(index) ? [] : [index]
            );
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        index: number
    ) => {
        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                toggle(index);
                break;
        }
    };

    return (
        <div className="page dark">
            <div className="w-full max-w-md mx-auto border rounded">
                {items.map((item, index) => {
                    const isOpen = openIndexes.includes(index);

                    return (
                        <div key={item.id} className="border-b">
                            {/* Header */}
                            <button
                                className="w-full text-left p-4 flex justify-between items-center"
                                onClick={() => toggle(index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                aria-expanded={isOpen}
                            >
                                <span>{item.title}</span>
                                <span>{isOpen ? "-" : "+"}</span>
                            </button>

                            {/* Content */}
                            {isOpen && (
                                <div className="p-4 bg-gray-50 text-black">{item.content}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function AccordionPage() {
    return <Accordion items={defaultItems} multiple />;
}