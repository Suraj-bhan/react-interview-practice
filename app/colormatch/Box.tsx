import { useEffect, useState } from "react";

interface BoxProps {
  color: string;
  activeColor: string[];
  selectedColor: Set<string>;
  onClick: (color: string) => void;
}

export const DEFAULT_COLOR = "#ffffff";

const Box = ({ color, activeColor, selectedColor, onClick }: BoxProps) => {
  const isReveled = selectedColor.has(color);
  const [currentColor, setCurrentColor] = useState(
    isReveled ? color : DEFAULT_COLOR
  );

  const handleClickColor = (color: string) => {
    if (currentColor !== DEFAULT_COLOR) return;

    setCurrentColor(color);
    onClick(color);
  };

  useEffect(() => {
    if (!isReveled && activeColor.length === 0) {
      setCurrentColor(DEFAULT_COLOR);
    }
  }, [activeColor, isReveled]);

  return (
    <div
      className="w-1/4 aspect-square border cursor-pointer"
      style={{ backgroundColor: currentColor }}
      onClick={() => handleClickColor(color)}
    />
  );
};

export default Box;
