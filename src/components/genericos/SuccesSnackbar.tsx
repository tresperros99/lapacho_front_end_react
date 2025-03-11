import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { clearSuccess } from "../../features/ui/ui.slice";

const SuccesSnackbar = () => {
  const dispatch = useDispatch();
  const { successMessage } = useSelector((state: RootState) => state.ui);

  const handleClose = () => {
    console.log("aqui");
    console.log(successMessage);

    dispatch(clearSuccess());
  };

  return (
    <Snackbar
      open={successMessage.length > 0}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {successMessage}
      </Alert>
    </Snackbar>
  );
};

export default SuccesSnackbar;
