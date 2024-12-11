import { useState } from "react";
import { motion } from "framer-motion";

const useConfirmDialog = () => {
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: "",
    onConfirm: null,
  });

  const openDialog = (title, confirmAction) => {
    setDialogConfig({
      isOpen: true,
      title,
      onConfirm: confirmAction,
    });
  };

  const closeDialog = () => {
    setDialogConfig({
      isOpen: false,
      title: "",
      onConfirm: null,
    });
  };

  const ConfirmDialog = () => {
    if (!dialogConfig.isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6"
        >
          <h3 className="text-xl font-semibold text-white">
            Are you sure to {dialogConfig.title}?
          </h3>
          <p className="text-white mt-2">This action cannot be undone.</p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={closeDialog}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                dialogConfig.onConfirm();
                closeDialog();
              }}
              className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-400 transition"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return { openDialog, ConfirmDialog };
};

export default useConfirmDialog;
