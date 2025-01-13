import React from "react";

const ModalComponent = ({ isOpen, onClose, children, styles }) => {
  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  const modalOverlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Custom background color for the modal overlay with opacity
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backdropFilter: "blur(5px)", // Use backdrop-filter to apply a blur effect to the background (may not be supported in all browsers)
    ...styles?.modalOverlay, // Merge custom styles with default styles
  };
  const modalContentStyles = {
    minWidth: "30%",
    minHeight: "35%",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    position: "relative",
    zIndex: 1,
    ...styles?.modalContent, // Merge custom styles with default styles
  };

  const modalCloseStyles = {
    position: "absolute",
    top: "-14px",
    right: "0px",
    fontSize: "32px",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    ...styles?.modalClose, // Merge custom styles with default styles
  };

  return (
    <div className="modal-overlay1 " style={modalOverlayStyles}>
      <div className="modal-content1" style={modalContentStyles}>
        <button
          className="modal-close1"
          onClick={() => onClose()}
          style={modalCloseStyles}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
