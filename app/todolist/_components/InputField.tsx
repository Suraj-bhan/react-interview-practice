import React, { KeyboardEvent, useState } from "react";

interface InputFieldProps {
  onAdd: (value: string) => void;
}

const InputField = ({ onAdd }: InputFieldProps) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value && value.length > 2) {
      onAdd(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    // console.log(key);
    if (key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
        className="border"
      />
      <button onClick={handleAdd} className="border-2 bg-gray-400">
        Add Task
      </button>
    </div>
  );
};

export default InputField;
