"use client";
import { getColorArray } from "@/constant/helper";
import { shuffle } from "lodash";
import Box from "./Box";
import { useMemo, useState } from "react";
import RoundCount from "./RoundCount";

interface GridProps {
  size: number;
}

const Grid = ({ size = 4 }: GridProps) => {
  const [activeColor, setActiveColor] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<Set<string>>(new Set());
  const [rountCount, setRountCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const finalColors = useMemo(() => {
    const colors = getColorArray(size);
    const paired = shuffle([...colors, ...colors]);
    return paired.map((color, i) => {
      return {
        id: i,
        color,
      };
    });
  }, [size, flag]);

  const handleColorClick = (color: string) => {
    if (activeColor.length === 0) {
      setActiveColor([color]);
      return;
    }

    if (activeColor[0] === color) {
      setSelectedColor((prev) => new Set(prev.add(color)));
      setActiveColor([]);
    } else {
      setActiveColor((prev) => [...prev, color]);
      setTimeout(() => {
        setActiveColor([]);
      }, 400);
    }

    setRountCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setSelectedColor(new Set());
    setRountCount(0);
    setFlag(!flag);
  };

  return (
    <div>
      {selectedColor.size >= size ? (
        <RoundCount roundCount={rountCount} reset={handleReset} />
      ) : (
        <div className="flex flex-wrap flex-row p-24 w-[48rem] max-w-xl">
          {finalColors.map((color) => (
            <Box
              key={color.id}
              color={color.color}
              onClick={handleColorClick}
              activeColor={activeColor}
              selectedColor={selectedColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Grid;
