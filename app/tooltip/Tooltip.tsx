import React, { useEffect, useRef, useState } from "react";

type Placement = "top" | "bottom" | "left" | "right";

interface PopoverProps {
    content: React.ReactNode;
    children: React.ReactNode;
    trigger?: "hover" | "click";
    placement?: Placement;
}

const Popover = ({
    content,
    children,
    trigger = "hover",
    placement = "top",
}: PopoverProps) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // 🔹 Close on outside click (for click trigger)
    useEffect(() => {
        if (trigger !== "click") return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                !triggerRef.current?.contains(e.target as Node) &&
                !popoverRef.current?.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [trigger]);

    // 🔹 Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    // 🔹 Position styles
    const getPosition = () => {
        switch (placement) {
            case "top":
                return "bottom-full left-1/2 -translate-x-1/2 mb-2";
            case "bottom":
                return "top-full left-1/2 -translate-x-1/2 mt-2";
            case "left":
                return "right-full top-1/2 -translate-y-1/2 mr-2";
            case "right":
                return "left-full top-1/2 -translate-y-1/2 ml-2";
            default:
                return "";
        }
    };

    const handleMouseEnter = () => {
        if (trigger === "hover") setOpen(true);
    };

    const handleMouseLeave = () => {
        if (trigger === "hover") setOpen(false);
    };

    const handleClick = () => {
        if (trigger === "click") setOpen((prev) => !prev);
    };

    return (
        <div
            className="relative inline-block"
            ref={triggerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {children}

            {open && (
                <div
                    ref={popoverRef}
                    className={`absolute z-50 ${getPosition()} bg-black text-white text-sm px-3 py-2 rounded shadow`}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Popover;