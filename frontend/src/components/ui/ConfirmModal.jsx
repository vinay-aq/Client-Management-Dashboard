import Modal from "./Modal";

function ConfirmModal({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  loading,
  confirmText,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>{title}</h2>
      <p>{message}</p>
      <br></br>
      <br></br>
      <button onClick={onClose}>Cancel</button>
      <button onClick={onConfirm} disabled={loading}    style={{
          marginLeft: "12px",
        }}>
        {loading ? "loading..." : confirmText}
      </button>
    </Modal>
  );
}

export default ConfirmModal;
