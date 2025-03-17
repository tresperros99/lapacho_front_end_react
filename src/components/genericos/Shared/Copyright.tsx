import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" mt={5}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Proyecto Lapacho
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
