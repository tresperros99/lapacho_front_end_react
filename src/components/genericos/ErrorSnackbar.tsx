import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { clearError } from "../../features/ui/ui.slice";
import { RootState } from "../../app/store";

const ErrorSnackbar = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.ui);

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <Snackbar
      open={error.length > 0}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
