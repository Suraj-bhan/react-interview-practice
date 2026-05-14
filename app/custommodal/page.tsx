"use client"
import React, { useState } from "react";
import Modal from "./CustomModal";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-bold text-black">Modal Title</h2>
        <input className="border p-2 w-full mt-2 text-black" placeholder="Type..." />
        <div className="mt-4 flex gap-2 text-black">
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default App;