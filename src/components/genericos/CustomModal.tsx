
import { Button, Modal, Typography } from "@mui/material";
import React from "react";
import es from "../../locales/es";
import { CheckCircleOutline, ErrorOutline } from "../icons";
interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
  isError: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  message,
  isError,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ backgroundColor: "white", padding: 20, borderRadius: 8 }}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          {isError ? (
            <ErrorOutline style={{ color: "red", marginRight: 10 }} />
          ) : (
            <CheckCircleOutline style={{ color: "green", marginRight: 10 }} />
          )}
          <Typography variant="h5" id="modal-title" gutterBottom>
            {isError
              ? es.components.customModal.errorTitle
              : es.components.customModal.successTitle}
          </Typography>
        </div>
        <Typography variant="body1" id="modal-description">
          {message}
        </Typography>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Button variant="contained" onClick={onClose}>
            {es.components.customModal.closeButton}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
