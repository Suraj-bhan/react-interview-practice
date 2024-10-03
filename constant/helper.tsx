import { status } from "./data";

export const getStatusIcon = (status: status) => {
  if (status === "complete") return <span title="Complete">✅</span>;
  else if (status === "in-progress") return <span title="In-Progress">🔨</span>;
};

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const redHex = red.toString(16).padStart(2, "0");
  const greenHex = green.toString(16).padStart(2, "0");
  const blueHex = blue.toString(16).padStart(2, "0");

  let hex = "#" + redHex + greenHex + blueHex;

  return hex;
};

export const getColorArray = (size: number) => {
  let colorArray: string[] = [];

  for (let i = 0; i < size; i++) {
    let color = getRandomColor();

    while (colorArray.includes(color)) {
      color = getRandomColor();
    }

    colorArray.push(color);
  }

  return colorArray;
};
