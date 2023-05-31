import * as React from "react";
import { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {

const handleChange = (e) => {

}

  return (
    <Grid
      container
      sx={{ pt: "20px" }}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          width: 650,
          height: 800,
          borderRadius: 1,
          background: "#ffffff",
        }}
      >
        <Grid
          container
          sx={{ pt: "50px" }}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <TextField
            sx={{ pb: 5 }}
            label="name"
            name="username"
            value={form.username}
            onChange={(e) => {
              handleChange(e);
            }}
          ></TextField>
          <TextField
            sx={{ pb: 5 }}
            label="password"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => {
              handleChange(e);
            }}
          ></TextField>
          <Button
            sx={{ mt: "10px" }}
            variant="contained"
            onClick={handleSubmit}
            component={Link}
            to="/discover"
          >
            Login
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}
