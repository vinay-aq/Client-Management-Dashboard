import { useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ onClose, children, isOpen }) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("onkeydown", handleEscape);

    return () => {
      document.removeEventListener("onkeydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        background: "rgba(0,0,0,0.5)",
        alignItems: "center",

        justifyContent: "center",

        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

export default Modal;
