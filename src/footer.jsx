import * as React from "react";
import {Container, Box, Typography }from '@mui/material';

export default function Footer() {
  return (
    <>
      <Container disableGutters maxWidth={false}>
      <Box  sx={{ bgcolor: '#E6EFD1', height: '25px', width:'100%'}} />
      <Typography sx={{textAlign: "center"}}> this is a footer</Typography>
      </Container>
    </>
  );
}
