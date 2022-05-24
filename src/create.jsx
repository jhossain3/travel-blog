import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

export default function Create() {
  return (
    <Grid container spacing={2} sx={{ pt: "50px" }} justifyContent="center">
      <Grid item xs={10} >
        <Box
          sx={{
            width: 1000,
            maxWidth: "100%",
          }}
        >
          <TextField
            sx={{ background: "#FFFFFF", p:'0'}}
            fullWidth
            label="fullWidth"
            id="fullWidth"
          />
        </Box>
      </Grid>
    </Grid>
  );
}
