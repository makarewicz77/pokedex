import { Alert, Button, Snackbar } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

interface ErrorSnackbarProps {
  open: boolean;
  message: string;
  onClose?: () => void;
}

const ErrorSnackbar: FC<ErrorSnackbarProps> = ({ open, message, onClose }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={() => {
        if (onClose != null) {
          onClose();
        }
        setIsOpen(false);
      }}
      style={{ width: "100%", justifyContent: "center" }}
    >
      <Alert severity="error" style={{ alignItems: "center" }}>
        {message}
        <Button
          onClick={() => {
            if (onClose != null) {
              onClose();
            }
            setIsOpen(false);
          }}
        >
          Close
        </Button>
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
