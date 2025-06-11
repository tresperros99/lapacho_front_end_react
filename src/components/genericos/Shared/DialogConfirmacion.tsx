import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";

interface DialogConfirmacionProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo?: string;
  descripcion?: string;
  textoCancelar?: string;
  textoConfirmar?: string;
}

const DialogConfirmacion = ({
  open,
  onClose,
  onConfirm,
  titulo = "¿Estás seguro?",
  descripcion = "Esta acción no se puede deshacer.",
  textoCancelar = "Cancelar",
  textoConfirmar = "Confirmar"
}: DialogConfirmacionProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText>{descripcion}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {textoCancelar}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {textoConfirmar}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmacion;
