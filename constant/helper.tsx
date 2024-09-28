import { status } from "./data";

export const getStatusIcon = (status: status) => {
  if (status === "complete") return <span title="Complete">✅</span>;
  else if (status === "in-progress") return <span title="In-Progress">🔨</span>;
};
