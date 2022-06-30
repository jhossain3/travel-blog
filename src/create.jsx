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

const names = [];

async function getAuthors() {

  const res = await fetch("http://localhost:3003/getAuthors");
  const resData = await res.json();
  console.log(resData);
  for (let i = 0; i < resData.length; i++) {
    names[i] = resData[i].name;
  }
  console.log(names);

  return names;
}

getAuthors();

export default function Create() {

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}

        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
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
