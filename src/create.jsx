import * as React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  MenuList,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";
import ImageUploadCard from "./ImageUpload";

export default function Create() {
  const [personName, setPersonName] = React.useState([]);

  const [names, setNames]= React.useState([]);

  async function getAuthors() {
    try{
      const res = await fetch("http://localhost:3003/getAuthors");
      const resData = await res.json();
  
      console.log(resData)
      console.log(names)
      setNames(resData.map(e=> e.name))
  
    }
    catch(e){
      console.log(e)
    }
    return names;
  }


    getAuthors().then(function(data) {
      console.log(data) // {body: [object Object]}
      });

  

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const people = ["izzy", "jannah", "yasmin"];

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

                    {/* {people?.map((i) => (
                      <MenuItem>{i}</MenuItem>
                    ))} */}
                    {names?.map((i) => (
                      <MenuItem key={i} value={i}>{i}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Box>
            <Button>Hello</Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
