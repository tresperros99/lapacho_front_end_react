import React, { useState, ChangeEvent } from "react";
import { Button, Typography, Grid } from "@mui/material";

interface FileInputProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  onFileSelect,
  accept = ".jpg,.png,.pdf",
  label = "Seleccionar archivo",
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <input
          style={{ display: "none" }}
          id="upload-file"
          type="file"
          accept={accept}
          onChange={handleChange}
        />
        <label htmlFor="upload-file">
          <Button variant="outlined" component="span">
            {label}
          </Button>
        </label>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="textSecondary">
          {fileName || "Ningún archivo seleccionado"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FileInput;
