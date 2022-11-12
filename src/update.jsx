import * as React from "react";
import { useState, useEffect } from "react";
//usereducer
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import { Link,   useParams } from "react-router-dom";
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
// import ImageUploadCard from "./ImageUpload";
// import DropboxChooser from 'react-dropbox-chooser';
// import { Dropbox } from 'dropbox';


export default function Update() {


  const [post, setPost] = useState({author: {id:'', name:'', email:''}, 
  pictures: '', dateNow:'', checkIn: '',flightHours: '', groupSize: '', 
  checkOut: '', destination:'', _id:'', summary: ''});

  const { id } = useParams();
  console.log(id);

  //get req
  useEffect(() => {
    const getPostById = async () => {
      let res = await fetch(`http://localhost:3003/posts/${id}`);
      const postObj = await res.json();
      setPost({...post, ...postObj});
    
    };
    getPostById().catch(console.error);
  },[]);
  console.log(post);

const [authorObj, setAuthorObj] = useState([]);
// const [url, setUrl] = useState([]);
  useEffect(() => {
    const getAuthors = async () => {
      let res = await fetch("http://localhost:3003/getAuthors");
      const authorObj = await res.json();
      setAuthorObj(authorObj.map((e) => e));
    };
    
    getAuthors().catch(console.error);
  }, []);
  

  const groupNumberOptions = ["solo", "2", "3", "4", "5", "6", "7", "8+"];
  const flightHourOptions = ["1","2","3","4","5","6","7","8","9","10+"];

  const handleInputChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalendarChange = (v, key) => {
    setPost({
      ...post,
      [key]: v,
    });
  };

  // const handleSuccess = (files) => {
  //   console.log('hi');

  //   console.log(files[0].thumbnailLink);
  //   setUrl(files[0].thumbnailLink)
  // }

  console.log("post", post);

//post req
  const handleSubmit = async (event) => {
    await fetch(`http://localhost:3003/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination: post.destination,
        summary: post.summary,
        author: post.author,
        groupSize: post.groupSize ,
        flightHours: post.flightHours,
        checkIn: post.checkIn,
        checkOut: post.checkOut,
        // pictures: post.pictures,
    

      }),
    })
      .then((response) => {
        response.redirect("http://localhost:3000/discover");
        console.log("response", response);
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
      <Grid item xs={12}>
   
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
              sx={{
                pb: "10px",
              }}
              id="destination"
              label="Destination"
              name="destination"
              value={post.destination}
              onChange={handleInputChange}
            />
            <FormControl sx={{ width: 205, pb: "10px" }}>
              <InputLabel id="name-label">Group size</InputLabel>

              <Select
                name="groupSize"
                labelId="groupSize"
                id="groupSize"
                value={post.groupSize}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                input={<OutlinedInput label="groupSize" />}
              >
                {groupNumberOptions?.map((i) => (
                  <MenuItem value={i} key={i}>
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 205, pb: "40px" }}>
              <InputLabel id="name-label">Flight hours</InputLabel>

              <Select
                name="flightHours"
                labelId="flightHours"
                id="flightHours"
                value={post.flightHours}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                input={<OutlinedInput label="flightHours" />}
              >
                {flightHourOptions?.map((i) => (
                  <MenuItem value={i} key={i}>
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DatePicker
                  name="checkIn"
                  id="checkIn"
                  label="checkIn"
                  value={post.checkIn}
                  onChange={(e) => {
                    handleCalendarChange(e.$d, "checkIn");
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  id="checkOut"
                  label="check Out"
                  name="checkOut"
                  value={post.checkOut}
                  onChange={(e) => {
                    handleCalendarChange(e.$d, "checkOut")
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            {/* <DropboxChooser appKey = {accessToken}
            success = {handleSuccess}
            cancel = {() => console.log('closed')}
            multiselect={true}
            /> */}

            {/* <ImageUploadCard link ={'https://www.dropbox.com/oauth2/authorize?client_id=ih9zbd5twk6to31&response_type=cors'}/> */}
            <Typography sx={{ pb: "15px" }}> Pictures </Typography>
            <TextField
              sx={{
                pb: "30px",
                width: "70%",
              }}
              id="summary"
              label="Summary"
              name="summary"
              multiline
              rows={5}
              value={post.summary}
              onChange={handleInputChange}
            />
            <Box sx={{ minWidth: 120 }}>
              <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="name-label">Author</InputLabel>

                  <Select
                    name="author"
                    labelId="author"
                    id="author"
                    value={post.author.id}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    input={<OutlinedInput label="Author" />}
                  >
                    {authorObj?.map((i) => (
                      <MenuItem value={i._id} key={i._id}>
                        {i.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Box>
            {/* <img src={url} alt=""/> */}
            <Button
              sx={{ mt: "10px" }}
              onClick={handleSubmit}
              variant="contained"
              component={Link}
              to="/discover"
             
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
