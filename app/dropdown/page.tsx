"use client"
import React, { useEffect, useRef, useState } from "react";

type Option = {
    id: string | number;
    label: string;
};

interface DropdownProps {
    options: Option[];
    multi?: boolean;
    placeholder?: string;
    onChange: (value: Option | Option[] | null) => void;
}

const Dropdown = ({
    options,
    multi = false,
    placeholder = "Select...",
    onChange,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Option[]>([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    // 🔹 Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 🔹 Scroll active item into view
    useEffect(() => {
        if (activeIndex >= 0) {
            itemRefs.current[activeIndex]?.scrollIntoView({
                block: "nearest",
            });
        }
    }, [activeIndex]);

    const toggleOption = (option: Option) => {
        let newSelected: Option[] = [];

        if (multi) {
            const exists = selected.some((s) => s.id === option.id);
            newSelected = exists
                ? selected.filter((s) => s.id !== option.id)
                : [...selected, option];
        } else {
            newSelected = [option];
            setIsOpen(false);
        }

        setSelected(newSelected);
        onChange(multi ? newSelected : newSelected[0]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case "ArrowDown":
                setActiveIndex((prev) =>
                    prev < options.length - 1 ? prev + 1 : 0
                );
                break;

            case "ArrowUp":
                setActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : options.length - 1
                );
                break;

            case "Enter":
                if (activeIndex >= 0) {
                    toggleOption(options[activeIndex]);
                }
                break;

            case "Escape":
                setIsOpen(false);
                break;
        }
    };

    const isSelected = (option: Option) =>
        selected.some((s) => s.id === option.id);

    return (
        <div
            ref={containerRef}
            className="w-72 relative"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {/* Input / Display */}
            <div
                className="border p-2 rounded cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selected.length > 0
                    ? multi
                        ? selected.map((s) => s.label).join(", ")
                        : selected[0].label
                    : placeholder}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <ul className="absolute w-full border mt-1 max-h-60 overflow-auto bg-white shadow">
                    {options.map((option, index) => (
                        <li
                            key={option.id}
                            ref={(el) => {(itemRefs.current[index] = el)}}
                            className={`p-2 cursor-pointer flex justify-between ${index === activeIndex ? "bg-gray-200" : ""
                                }`}
                            onMouseDown={() => toggleOption(option)}
                        >
                            {option.label}
                            {isSelected(option) && "✓"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default function DropdownPage() {
    return (
        <Dropdown
            options={[
                { id: 1, label: "Apple" },
                { id: 2, label: "Banana" },
                { id: 3, label: "Mango" },
            ]}
            onChange={() => {}}
        />
    );
}