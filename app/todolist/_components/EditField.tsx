import { useState } from "react";

interface EditFieldProps {
  id: string;
  title: string;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (id: string, value: string) => void;
}

const EditField = ({
  id,
  title,
  setIsEditable,
  handleSubmit,
}: EditFieldProps) => {
  const [value, setValue] = useState(title);

  const handleCancel = () => {
    setValue("");
    setIsEditable(false);
  };

  const handleEditSubmit = () => {
    if (value !== title) {
      handleSubmit(id, value);
    }
    handleCancel();
  };

  return (
    <div>
      <input
        value={value}
        type="text"
        onChange={(e) => setValue(e.target.value)}
      />
      <span title="Save" onClick={handleEditSubmit}>
        ✅
      </span>
      <span title="Delete" onClick={handleCancel}>
        ❌
      </span>
    </div>
  );
};

export default EditField;
