import * as React from "react";
import { Box, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

export default function Footer() {
  return (
    <Box
      item
      container
      sx={{
        mt: "20px",
        pt: "10px",
        width: "100%",
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bottom: 0,
      }}
    >
      <Typography sx={{ textAlign: "center" }}> travelblog</Typography>
      <CopyrightIcon
        sx={{ display: { xs: "none", md: "flex", height: 10 }, pb: 2 }}
      />
    </Box>
  );
}
