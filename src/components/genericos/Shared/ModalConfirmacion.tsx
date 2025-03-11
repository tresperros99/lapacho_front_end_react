import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
  handlePagar: () => void;
}

export const ModalConfirmacion = ({
  handleClose,
  handlePagar,
  open,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Confirmacion"}</DialogTitle>
      <DialogContent>
        <DialogContentText>¿Desea confirmar esta operacion?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          color="secondary"
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button
          onClick={handlePagar}
          autoFocus
          color="primary"
          variant="contained"
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmacion;
