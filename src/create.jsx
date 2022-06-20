import * as React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import ImageUploadCard from "./ImageUpload";

export default function Create() {
  const [author, setAuthor] = React.useState("");

// const getAuthors = ()=>{
//   axios.get("localhost:3003/getAuthors")
//   .then((res)=>{
//     console.log(res);
//   })
// }

  const handleChange = (event) => {
    setAuthor(event.target.value);
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
              id="names"
              label="Names"
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Author</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={author}
                  label="Author"
                  onChange={handleChange}
                >
                  <MenuItem value={"Sadiyah"}>Sadiyah</MenuItem>
                  <MenuItem value={"Jannah"}>Jannah</MenuItem>
                  <MenuItem value={"Yasmin"}>Yasmin</MenuItem>
                  <MenuItem value={"Jessica"}>Jessica</MenuItem>
                  <MenuItem value={"Adina"}>Adina</MenuItem>
                  <MenuItem value={"Aysha"}>Aysha</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
