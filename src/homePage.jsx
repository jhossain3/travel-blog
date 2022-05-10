import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";

const backgroundImage =
  "https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
const backgroundImage1 =
  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e";
const backgroundImage2 =
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d";
const backgroundImage3 =
  "https://images.unsplash.com/photo-1522770179533-24471fcdba45";

export default function About() {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "800px",
        }}
      >
        <Container
          sx={{
            width: "900px",
            height: "150px",
            backgroundColor: "rgba(51, 47, 47, .8)",
            boxShadow: "2px 4px 8px rgba(68,67,67)",
            borderRadius: 1.5,
            textAlign: "center",
            padding: "50 0",
            margin: "0 auto",
            position: "relative",
            top: "250px",
          }}
        >
          <Typography
            variant="h4"
            color="#FFFFFF"
            sx={{
              paddingTop: "15px",
            }}
          >
            Welcome to our Travel Blog
          </Typography>
          <Typography variant="subtitle1" color="#FFFFFF">
            Lets explore our past travels
          </Typography>
          <Button variant="contained" href="https://www.google.com/">
            Discover places
          </Button>
        </Container>
      </Container>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: "15px",
          mt: "10px",
        }}
      >
        Highlights
      </Typography>

      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={9}>
          <Grid key={0} item>
            <Paper
              sx={{
                height: 220,
                width: 400,
                backgroundImage: `url(${backgroundImage1})`,
                backgroundSize: "cover",
              }}
            />
          </Grid>
          <Grid key={1} item>
            <Paper
              sx={{
                height: 220,
                width: 400,
                backgroundImage: `url(${backgroundImage2})`,
                backgroundSize: "cover",
              }}
            />
          </Grid>
          <Grid key={2} item>
            <Paper
              sx={{
                height: 220,
                width: 400,
                backgroundImage: `url(${backgroundImage3})`,
                backgroundSize: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
