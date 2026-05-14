"use client";
import React, { useState, MouseEvent } from "react";

// 🔹 Types
type Word = {
    id: number;
    text: string;
};

type AnnotationType = "positive" | "negative";

type Annotation = {
    wordIds: number[];
    type: AnnotationType;
};

type AnnotationsMap = Record<number, Annotation>;

type SelectedState =
    | { type: "word"; ids: number[] }
    | { type: "annotation"; ids: number[]; annotationId: number }
    | { type: null; ids: [] };

// 🔹 Data
const text =
    "The customer service at the restaurant was prompt and friendly, but the food took too long to arrive and was not well-cooked. The ambiance was pleasant, though the seating arrangement was somewhat cramped.";

const wordsArray: Word[] = text.split(" ").map((w, i) => ({
    id: i,
    text: w,
}));

export default function AnnotationTool() {
    const [annotations, setAnnotations] = useState<AnnotationsMap>({});
    const [selected, setSelected] = useState<SelectedState>({
        type: null,
        ids: [],
    });
    const [counter, setCounter] = useState<number>(0);

    // 🔹 Get annotation for a word
    const getAnnotationByWord = (
        wordId: number
    ): [string, Annotation] | undefined => {
        return Object.entries(annotations).find(([_, ann]) =>
            ann.wordIds.includes(wordId)
        );
    };

    // 🔹 Handle word click
    const handleWordClick = (
        wordId: number,
        e: MouseEvent<HTMLSpanElement>
    ) => {
        const isMulti = e.metaKey || e.ctrlKey;

        const existing = getAnnotationByWord(wordId);

        // If word belongs to annotation → select whole group
        if (existing) {
            const [annotationId, ann] = existing;

            setSelected({
                type: "annotation",
                ids: ann.wordIds,
                annotationId: Number(annotationId),
            });
            return;
        }

        if (!isMulti) {
            setSelected({ type: "word", ids: [wordId] });
        } else {
            setSelected((prev) => {
                if (prev.type !== "word") return { type: "word", ids: [wordId] };

                const exists = prev.ids.includes(wordId);
                return {
                    type: "word",
                    ids: exists
                        ? prev.ids.filter((id) => id !== wordId)
                        : [...prev.ids, wordId],
                };
            });
        }
    };

    // 🔹 Annotate
    const annotate = (type: AnnotationType) => {
        if (!selected.ids.length) return;

        if (selected.type === "annotation") {
            setAnnotations((prev) => ({
                ...prev,
                [selected.annotationId]: {
                    ...prev[selected.annotationId],
                    type,
                },
            }));
        } else if (selected.type === "word") {
            const id = counter;
            setCounter((c) => c + 1);

            setAnnotations((prev) => ({
                ...prev,
                [id]: {
                    wordIds: selected.ids,
                    type,
                },
            }));
        }
    };

    // 🔹 Reset
    const reset = () => {
        if (selected.type !== "annotation") return;

        setAnnotations((prev) => {
            const newState = { ...prev };
            delete newState[selected.annotationId];
            return newState;
        });

        setSelected({ type: null, ids: [] });
    };

    // 🔹 Render style
    const getWordStyle = (wordId: number): React.CSSProperties => {
        const ann = getAnnotationByWord(wordId);

        if (selected.ids.includes(wordId)) {
            return { background: "#d0ebff" };
        }

        if (ann) {
            return {
                background:
                    ann[1].type === "positive" ? "#b2f2bb" : "#ffa8a8",
            };
        }

        return {};
    };

    return (
        <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 20 }}>
                {wordsArray.map((word) => (
                    <span
                        key={word.id}
                        onClick={(e) => handleWordClick(word.id, e)}
                        style={{
                            cursor: "pointer",
                            marginRight: 5,
                            padding: "2px 4px",
                            borderRadius: 4,
                            ...getWordStyle(word.id),
                        }}
                    >
                        {word.text}
                    </span>
                ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
                <button
                    onClick={() => annotate("positive")}
                    style={{ background: "green", color: "white" }}
                >
                    Annotate Positive
                </button>

                <button
                    onClick={() => annotate("negative")}
                    style={{ background: "red", color: "white" }}
                >
                    Annotate Negative
                </button>

                <button onClick={reset}>Reset Annotation</button>
            </div>
        </div>
    );
}