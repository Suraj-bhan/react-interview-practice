import Portal from "./PortalHoc";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const Modal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <Portal>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen  bg-gray-400 z-1000">
        <div className="flex flex-col text-black bg-white fixed top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 p-6 pt-4 rounded-lg shadow-lg border z-1000">
          <div className="text-2xl font-bold relative mb-1">
            <div>This is Portal</div>
            <button
              className="absolute top-0 right-0 rounded-full border w-10 h-10 text-base hover:bg-gray-100"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className="font-medium mb-2">This is Description</div>
          <hr className="py-2" />
          <div className="">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
          <div className="flex w-full space-x-4 justify-end">
            <button
              className="border bg-green-300 hover:bg-green-400 py-2 rounded-lg font-bold w-32"
              onClick={onClose}
            >
              OK
            </button>
            <button
              className="border border-blue-600 py-2 rounded-lg font-bold hover:bg-blue-600 w-32"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
