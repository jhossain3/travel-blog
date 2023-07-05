import * as React from "react";
import { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useSignIn } from 'react-auth-kit';

export default function Login() {
const signIn = useSignIn();

const [form, setForm] = useState({
  username: "",
  password: "",
});

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  console.log("form", form);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('submit');
  await fetch("http://localhost:3003/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      username: form.username,
      password: form.password,
    }),
  })
    .then(response => response.json()) 
    .then(data => {
      const userToken = data.token;
      signIn({
        token: userToken,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { username: form.username }
      })
      console.log('token', userToken);
      // window.location.href = 'http://localhost:3000/discover'
    })
    .catch(error => {
      console.log(error);
    })
      // signIn({
      //   token: response.data.token,
      //   expiresIn: 3600,
      //   tokenType: "Bearer",
      //   authState: { username: form.username }

      // window.location.href = 'http://localhost:3000/discover'

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok.");
    //   }
    // })

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
