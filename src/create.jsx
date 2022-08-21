import * as React from "react";
import { useState, useEffect, useCallback } from "react";

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";
import ImageUploadCard from "./ImageUpload";


export default function Create() {
  const [personName, setPersonName] = React.useState([]);

  const [names, setNames] = React.useState([]);

  useEffect(() => {
    const getAuthors = async () => {
      let res = await fetch("http://localhost:3003/getAuthors");

      let resData = await res.json();
      setNames(resData.map((e) => e.name));
    };

    getAuthors().catch(console.error);
  }, []);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  // function handleClick() {
    
  //   // Send data to the backend via POST
  //   fetch('http://localhost:3003/posts', {  // Enter your IP address here

  //     method: 'POST', 
  //     mode: 'cors', 
  //     body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

  //   })
    
  // }

  var jsonData = {
    "users": [
        {
            "name": "alan", 
            "age": 23,
            "username": "aturing"
        },
        {
            "name": "john", 
            "age": 29,
            "username": "__john__"
        }
    ]
  };


  return (
    <Grid
      container
      sx={{ pt: "50px" }}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid item xs={10}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            width: 650,
            height: 600,
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
              sx={{
                pb: "30px",
              }}
              id="destination"
              label="Destination"
            />
            <TextField
              sx={{
                pb: "30px",
              }}
              id="whoCame"
              label="who came"
            />
            <TextField
              sx={{
                pb: "30px",
              }}
              id="dates"
              label="Dates"
            />
            <ImageUploadCard />
            <Typography sx={{ pb: "25px" }}> Pictures </Typography>
            <Box sx={{ minWidth: 120 }}>
              <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="name-label">Name</InputLabel>

                  <Select
                    labelId="name-label"
                    id="name"
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                  >
                    {names?.map((i) => (
                      <MenuItem value={i} key={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Box>
            <Button>Submit</Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
