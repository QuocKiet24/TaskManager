const ConfirmDialog = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-xl font-semibold text-white">Are you sure?</h3>
        <p className="text-white mt-2">This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-400 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
