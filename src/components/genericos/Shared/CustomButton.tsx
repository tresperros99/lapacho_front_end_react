import { Button, CircularProgress, Typography } from "@mui/material";

interface Props {
  text: string;
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  variant?: "text" | "outlined" | "contained";
}

export const CustomButton = ({
  text,
  onClick,
  loading,
  fullWidth = true,
  type = "button",
  variant = "contained",
}: Props) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      variant={variant}
      color="primary"
    >
      {loading ? (
        <CircularProgress disableShrink size={24} color="warning" />
      ) : (
        <Typography>{text}</Typography>
      )}
    </Button>
  );
};
