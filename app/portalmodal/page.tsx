"use client";
import { useState } from "react";
import Modal from "../_components/Modal";

const PortalModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="page justify-center">
      <button type="button" className="home-link" onClick={handleOpenModal}>
        ⬆️ Open Modal
      </button>
      <Modal open={openModal} onClose={handleCloseModal} />
    </div>
  );
};

export default PortalModal;
