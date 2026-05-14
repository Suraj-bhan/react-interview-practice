import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    // 🔹 Handle Escape + Focus Trap
    useEffect(() => {
        if (!isOpen) return;

        lastFocusedElement.current = document.activeElement as HTMLElement;

        const focusableSelectors =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const getFocusableElements = () =>
            modalRef.current?.querySelectorAll<HTMLElement>(
                focusableSelectors
            ) || [];

        const focusFirst = () => {
            const elements = getFocusableElements();
            elements[0]?.focus();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }

            if (e.key === "Tab") {
                const elements = getFocusableElements();
                if (elements.length === 0) return;

                const first = elements[0];
                const last = elements[elements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Focus first element on open
        setTimeout(focusFirst, 0);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            lastFocusedElement.current?.focus(); // restore focus
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            onMouseDown={onClose} // click outside
        >
            <div
                ref={modalRef}
                className="bg-white p-6 rounded shadow-lg min-w-[300px]"
                onMouseDown={(e) => e.stopPropagation()} // prevent close inside
            >
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;