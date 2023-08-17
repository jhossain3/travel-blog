import * as React from "react";
import { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    confirmemail: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log("form", form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');
    await fetch("http://localhost:3003/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        confirmemail: form.confirmemail,
        password: form.password,
      }),
    })
      .then((response) => {
        console.log('rspnse', response);
        response.redirect("http://localhost:3000/discover");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
      })
      .catch(console.error);
  };

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
            label="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => {
              handleChange(e);
            }}
          ></TextField>

          <TextField
            sx={{ pb: 5 }}
            label="confirm email"
            name="confirmemail"
            type="email"
            value={form.confirmemail}
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
            create User
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}
